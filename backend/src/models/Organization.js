const { query } = require('../database/connection');

class Organization {
  static async create(orgData) {
    const {
      name,
      industry,
      description,
      address,
      city,
      country = 'Kenya',
      website,
      contactPerson,
      contactEmail,
      contactPhone,
      capacity
    } = orgData;
    
    const result = await query(`
      INSERT INTO organizations (name, industry, description, address, city, country, 
                               website, contact_person, contact_email, contact_phone, capacity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [name, industry, description, address, city, country, website, 
        contactPerson, contactEmail, contactPhone, capacity]);
    
    return result.rows[0];
  }
  
  static async findById(id) {
    const result = await query(`
      SELECT o.*, 
             COUNT(DISTINCT ap.id) as total_positions,
             COUNT(DISTINCT att.id) as active_attachments
      FROM organizations o
      LEFT JOIN attachment_positions ap ON o.id = ap.organization_id AND ap.is_active = true
      LEFT JOIN attachments att ON o.id = att.organization_id AND att.status = 'active'
      WHERE o.id = $1 AND o.is_active = true
      GROUP BY o.id
    `, [id]);
    
    return result.rows[0];
  }
  
  static async findAll(filters = {}) {
    let whereClause = 'WHERE o.is_active = true';
    const values = [];
    let paramCount = 1;
    
    if (filters.industry) {
      whereClause += ` AND o.industry = $${paramCount}`;
      values.push(filters.industry);
      paramCount++;
    }
    
    if (filters.city) {
      whereClause += ` AND o.city = $${paramCount}`;
      values.push(filters.city);
      paramCount++;
    }
    
    if (filters.search) {
      whereClause += ` AND (o.name ILIKE $${paramCount} OR o.description ILIKE $${paramCount})`;
      values.push(`%${filters.search}%`);
      paramCount++;
    }
    
    const result = await query(`
      SELECT o.*, 
             COUNT(DISTINCT ap.id) as total_positions,
             COUNT(DISTINCT att.id) as active_attachments
      FROM organizations o
      LEFT JOIN attachment_positions ap ON o.id = ap.organization_id AND ap.is_active = true
      LEFT JOIN attachments att ON o.id = att.organization_id AND att.status = 'active'
      ${whereClause}
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...values, filters.limit || 50, filters.offset || 0]);
    
    return result.rows;
  }
  
  static async update(id, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 1;
    
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updateData[key]);
        paramCount++;
      }
    });
    
    if (fields.length === 0) {
      throw new Error('No fields to update');
    }
    
    values.push(id);
    
    const result = await query(`
      UPDATE organizations 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `, values);
    
    return result.rows[0];
  }
  
  static async delete(id) {
    const result = await query(`
      UPDATE organizations 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [id]);
    
    return result.rows[0];
  }
  
  static async getOrganizationStats(orgId) {
    const result = await query(`
      SELECT 
        o.capacity,
        COUNT(DISTINCT att.id) as current_attachments,
        COUNT(DISTINCT ap.id) as total_positions,
        AVG(e.overall_rating) as average_rating
      FROM organizations o
      LEFT JOIN attachments att ON o.id = att.organization_id AND att.status = 'active'
      LEFT JOIN attachment_positions ap ON o.id = ap.organization_id AND ap.is_active = true
      LEFT JOIN evaluations e ON att.id = e.attachment_id
      WHERE o.id = $1
      GROUP BY o.id, o.capacity
    `, [orgId]);
    
    return result.rows[0];
  }
  
  static async getAvailablePositions(orgId) {
    const result = await query(`
      SELECT ap.*, 
             (ap.available_slots - COALESCE(active_apps.count, 0)) as remaining_slots
      FROM attachment_positions ap
      LEFT JOIN (
        SELECT position_id, COUNT(*) as count
        FROM applications 
        WHERE status IN ('approved', 'under_review')
        GROUP BY position_id
      ) active_apps ON ap.id = active_apps.position_id
      WHERE ap.organization_id = $1 AND ap.is_active = true
      ORDER BY ap.created_at DESC
    `, [orgId]);
    
    return result.rows;
  }
}

module.exports = Organization;