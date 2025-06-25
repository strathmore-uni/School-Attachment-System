const { query } = require('../database/connection');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const {
      username,
      email,
      password,
      role,
      firstName,
      lastName,
      phone
    } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const result = await query(`
      INSERT INTO users (username, email, password_hash, role, first_name, last_name, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, username, email, role, first_name, last_name, phone, is_active, created_at
    `, [username, email, hashedPassword, role, firstName, lastName, phone]);
    
    return result.rows[0];
  }
  
  static async findById(id) {
    const result = await query(`
      SELECT id, username, email, role, first_name, last_name, phone, is_active, 
             email_verified, last_login, created_at, updated_at
      FROM users 
      WHERE id = $1 AND is_active = true
    `, [id]);
    
    return result.rows[0];
  }
  
  static async findByEmail(email) {
    const result = await query(`
      SELECT id, username, email, password_hash, role, first_name, last_name, 
             phone, is_active, email_verified, last_login, created_at, updated_at
      FROM users 
      WHERE email = $1 AND is_active = true
    `, [email]);
    
    return result.rows[0];
  }
  
  static async findByUsername(username) {
    const result = await query(`
      SELECT id, username, email, password_hash, role, first_name, last_name, 
             phone, is_active, email_verified, last_login, created_at, updated_at
      FROM users 
      WHERE username = $1 AND is_active = true
    `, [username]);
    
    return result.rows[0];
  }
  
  static async updateLastLogin(id) {
    await query(`
      UPDATE users 
      SET last_login = CURRENT_TIMESTAMP 
      WHERE id = $1
    `, [id]);
  }
  
  static async updateProfile(id, updateData) {
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
      UPDATE users 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING id, username, email, role, first_name, last_name, phone, is_active, updated_at
    `, values);
    
    return result.rows[0];
  }
  
  static async changePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await query(`
      UPDATE users 
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [hashedPassword, id]);
  }
  
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  
  static async findAll(filters = {}) {
    let whereClause = 'WHERE is_active = true';
    const values = [];
    let paramCount = 1;
    
    if (filters.role) {
      whereClause += ` AND role = $${paramCount}`;
      values.push(filters.role);
      paramCount++;
    }
    
    if (filters.search) {
      whereClause += ` AND (first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
      values.push(`%${filters.search}%`);
      paramCount++;
    }
    
    const result = await query(`
      SELECT id, username, email, role, first_name, last_name, phone, 
             is_active, email_verified, last_login, created_at
      FROM users 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...values, filters.limit || 50, filters.offset || 0]);
    
    return result.rows;
  }
  
  static async getCount(filters = {}) {
    let whereClause = 'WHERE is_active = true';
    const values = [];
    let paramCount = 1;
    
    if (filters.role) {
      whereClause += ` AND role = $${paramCount}`;
      values.push(filters.role);
      paramCount++;
    }
    
    if (filters.search) {
      whereClause += ` AND (first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
      values.push(`%${filters.search}%`);
    }
    
    const result = await query(`
      SELECT COUNT(*) as total
      FROM users 
      ${whereClause}
    `, values);
    
    return parseInt(result.rows[0].total);
  }
}

module.exports = User;