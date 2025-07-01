const { query } = require('../database/connection');

class Student {
  static async create(studentData) {
    const {
      userId,
      studentId,
      course,
      yearOfStudy,
      gpa,
      schoolSupervisorId
    } = studentData;
    
    const result = await query(`
      INSERT INTO students (user_id, student_id, course, year_of_study, gpa, school_supervisor_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [userId, studentId, course, yearOfStudy, gpa, schoolSupervisorId]);
    
    return result.rows[0];
  }
  
  static async findById(id) {
    const result = await query(`
      SELECT s.*, u.first_name, u.last_name, u.email, u.phone,
             sup.first_name as supervisor_first_name, sup.last_name as supervisor_last_name
      FROM students s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN users sup ON s.school_supervisor_id = sup.id
      WHERE s.id = $1
    `, [id]);
    
    return result.rows[0];
  }
  
  static async findByUserId(userId) {
    const result = await query(`
      SELECT s.*, u.first_name, u.last_name, u.email, u.phone,
             sup.first_name as supervisor_first_name, sup.last_name as supervisor_last_name
      FROM students s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN users sup ON s.school_supervisor_id = sup.id
      WHERE s.user_id = $1
    `, [userId]);
    
    return result.rows[0];
  }
  
  static async findByStudentId(studentId) {
    const result = await query(`
      SELECT s.*, u.first_name, u.last_name, u.email, u.phone,
             sup.first_name as supervisor_first_name, sup.last_name as supervisor_last_name
      FROM students s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN users sup ON s.school_supervisor_id = sup.id
      WHERE s.student_id = $1
    `, [studentId]);
    
    return result.rows[0];
  }
  
  static async findAll(filters = {}) {
    let whereClause = 'WHERE 1=1';
    const values = [];
    let paramCount = 1;
    
    if (filters.supervisorId) {
      whereClause += ` AND s.school_supervisor_id = $${paramCount}`;
      values.push(filters.supervisorId);
      paramCount++;
    }
    
    if (filters.course) {
      whereClause += ` AND s.course ILIKE $${paramCount}`;
      values.push(`%${filters.course}%`);
      paramCount++;
    }
    
    if (filters.yearOfStudy) {
      whereClause += ` AND s.year_of_study = $${paramCount}`;
      values.push(filters.yearOfStudy);
      paramCount++;
    }
    
    if (filters.search) {
      whereClause += ` AND (u.first_name ILIKE $${paramCount} OR u.last_name ILIKE $${paramCount} OR s.student_id ILIKE $${paramCount})`;
      values.push(`%${filters.search}%`);
      paramCount++;
    }
    
    const result = await query(`
      SELECT s.*, u.first_name, u.last_name, u.email, u.phone,
             sup.first_name as supervisor_first_name, sup.last_name as supervisor_last_name
      FROM students s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN users sup ON s.school_supervisor_id = sup.id
      ${whereClause}
      ORDER BY s.created_at DESC
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
      UPDATE students 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `, values);
    
    return result.rows[0];
  }
  
  static async getStudentStats(studentId) {
    const result = await query(`
      SELECT 
        (SELECT COUNT(*) FROM applications a JOIN students s ON a.student_id = s.id WHERE s.id = $1) as total_applications,
        (SELECT COUNT(*) FROM applications a JOIN students s ON a.student_id = s.id WHERE s.id = $1 AND a.status = 'approved') as approved_applications,
        (SELECT COUNT(*) FROM reports r JOIN attachments att ON r.attachment_id = att.id JOIN students s ON att.student_id = s.id WHERE s.id = $1) as total_reports,
        (SELECT COUNT(*) FROM reports r JOIN attachments att ON r.attachment_id = att.id JOIN students s ON att.student_id = s.id WHERE s.id = $1 AND r.status = 'reviewed') as reviewed_reports
    `, [studentId]);
    
    return result.rows[0];
  }
}

module.exports = Student;