const { query } = require('../database/connection');

class Application {
  static async create(applicationData) {
    const {
      studentId,
      positionId,
      coverLetter,
      resumeUrl,
      additionalDocuments
    } = applicationData;
    
    const result = await query(`
      INSERT INTO applications (student_id, position_id, cover_letter, resume_url, additional_documents)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [studentId, positionId, coverLetter, resumeUrl, JSON.stringify(additionalDocuments)]);
    
    return result.rows[0];
  }
  
  static async findById(id) {
    const result = await query(`
      SELECT a.*, 
             s.student_id, u.first_name as student_first_name, u.last_name as student_last_name,
             ap.title as position_title, ap.description as position_description,
             o.name as organization_name, o.industry,
             reviewer.first_name as reviewer_first_name, reviewer.last_name as reviewer_last_name
      FROM applications a
      JOIN students s ON a.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN attachment_positions ap ON a.position_id = ap.id
      JOIN organizations o ON ap.organization_id = o.id
      LEFT JOIN users reviewer ON a.reviewed_by = reviewer.id
      WHERE a.id = $1
    `, [id]);
    
    return result.rows[0];
  }
  
  static async findByStudentId(studentId, filters = {}) {
    let whereClause = 'WHERE a.student_id = $1';
    const values = [studentId];
    let paramCount = 2;
    
    if (filters.status) {
      whereClause += ` AND a.status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }
    
    const result = await query(`
      SELECT a.*, 
             ap.title as position_title, ap.attachment_type,
             o.name as organization_name, o.industry
      FROM applications a
      JOIN attachment_positions ap ON a.position_id = ap.id
      JOIN organizations o ON ap.organization_id = o.id
      ${whereClause}
      ORDER BY a.applied_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...values, filters.limit || 50, filters.offset || 0]);
    
    return result.rows;
  }
  
  static async findAll(filters = {}) {
    let whereClause = 'WHERE 1=1';
    const values = [];
    let paramCount = 1;
    
    if (filters.status) {
      whereClause += ` AND a.status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }
    
    if (filters.organizationId) {
      whereClause += ` AND ap.organization_id = $${paramCount}`;
      values.push(filters.organizationId);
      paramCount++;
    }
    
    if (filters.reviewerId) {
      whereClause += ` AND a.reviewed_by = $${paramCount}`;
      values.push(filters.reviewerId);
      paramCount++;
    }
    
    const result = await query(`
      SELECT a.*, 
             s.student_id, u.first_name as student_first_name, u.last_name as student_last_name,
             ap.title as position_title, ap.attachment_type,
             o.name as organization_name, o.industry
      FROM applications a
      JOIN students s ON a.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN attachment_positions ap ON a.position_id = ap.id
      JOIN organizations o ON ap.organization_id = o.id
      ${whereClause}
      ORDER BY a.applied_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...values, filters.limit || 50, filters.offset || 0]);
    
    return result.rows;
  }
  
  static async updateStatus(id, status, reviewerId, reviewNotes) {
    const result = await query(`
      UPDATE applications 
      SET status = $1, reviewed_by = $2, review_notes = $3, 
          reviewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `, [status, reviewerId, reviewNotes, id]);
    
    return result.rows[0];
  }
  
  static async getApplicationStats(filters = {}) {
    let whereClause = 'WHERE 1=1';
    const values = [];
    let paramCount = 1;
    
    if (filters.studentId) {
      whereClause += ` AND a.student_id = $${paramCount}`;
      values.push(filters.studentId);
      paramCount++;
    }
    
    if (filters.organizationId) {
      whereClause += ` AND ap.organization_id = $${paramCount}`;
      values.push(filters.organizationId);
      paramCount++;
    }
    
    const result = await query(`
      SELECT 
        COUNT(*) as total_applications,
        COUNT(CASE WHEN a.status = 'pending' THEN 1 END) as pending_applications,
        COUNT(CASE WHEN a.status = 'under_review' THEN 1 END) as under_review_applications,
        COUNT(CASE WHEN a.status = 'approved' THEN 1 END) as approved_applications,
        COUNT(CASE WHEN a.status = 'rejected' THEN 1 END) as rejected_applications
      FROM applications a
      JOIN attachment_positions ap ON a.position_id = ap.id
      ${whereClause}
    `, values);
    
    return result.rows[0];
  }
  
  static async withdraw(id, studentId) {
    const result = await query(`
      UPDATE applications 
      SET status = 'withdrawn', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND student_id = $2 AND status IN ('pending', 'under_review')
      RETURNING *
    `, [id, studentId]);
    
    return result.rows[0];
  }
}

module.exports = Application;