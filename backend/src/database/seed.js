const bcrypt = require('bcryptjs');
const { query } = require('./connection');
const logger = require('../utils/logger');

const seedData = async () => {
  try {
    logger.info('Starting database seeding...');
    
    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    // Insert admin user
    await query(`
      INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active, email_verified)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (email) DO NOTHING
    `, ['admin', 'admin@strathmore.edu', hashedPassword, 'administrator', 'System', 'Administrator', true, true]);
    
    // Insert school supervisor
    await query(`
      INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active, email_verified)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (email) DO NOTHING
    `, ['supervisor1', 'supervisor@strathmore.edu', hashedPassword, 'school_supervisor', 'Dr. Jane', 'Wanjiku', true, true]);
    
    // Insert sample organizations
    const orgResult = await query(`
      INSERT INTO organizations (name, industry, description, city, contact_person, contact_email, contact_phone, capacity)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8),
        ($9, $10, $11, $12, $13, $14, $15, $16),
        ($17, $18, $19, $20, $21, $22, $23, $24)
      ON CONFLICT DO NOTHING
      RETURNING id
    `, [
      'Safaricom PLC', 'Telecommunications', 'Leading telecommunications company in Kenya', 'Nairobi', 
      'John Kamau', 'hr@safaricom.co.ke', '+254700123456', 10,
      'Kenya Commercial Bank', 'Banking', 'One of the largest commercial banks in East Africa', 'Nairobi',
      'Mary Akinyi', 'hr@kcbgroup.com', '+254700234567', 8,
      'Equity Bank', 'Banking', 'Pan-African financial services group', 'Nairobi',
      'Peter Ochieng', 'hr@equitybank.co.ke', '+254700345678', 6
    ]);
    
    // Insert host supervisors
    if (orgResult.rows.length > 0) {
      const orgId = orgResult.rows[0].id;
      
      await query(`
        INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active, email_verified)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (email) DO NOTHING
      `, ['hostsup1', 'host@safaricom.co.ke', hashedPassword, 'host_supervisor', 'John', 'Kamau', true, true]);
      
      const hostUserResult = await query('SELECT id FROM users WHERE email = $1', ['host@safaricom.co.ke']);
      if (hostUserResult.rows.length > 0) {
        await query(`
          INSERT INTO host_supervisors (user_id, organization_id, position, department)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT DO NOTHING
        `, [hostUserResult.rows[0].id, orgId, 'Senior Developer', 'IT Department']);
      }
    }
    
    // Insert sample students
    await query(`
      INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active, email_verified)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8),
        ($9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (email) DO NOTHING
    `, [
      'alice.wanjiku', 'alice.wanjiku@student.strathmore.edu', hashedPassword, 'student', 'Alice', 'Wanjiku', true, true,
      'john.kamau', 'john.kamau@student.strathmore.edu', hashedPassword, 'student', 'John', 'Kamau', true, true
    ]);
    
    // Insert student records
    const aliceResult = await query('SELECT id FROM users WHERE email = $1', ['alice.wanjiku@student.strathmore.edu']);
    const johnResult = await query('SELECT id FROM users WHERE email = $1', ['john.kamau@student.strathmore.edu']);
    const supervisorResult = await query('SELECT id FROM users WHERE email = $1', ['supervisor@strathmore.edu']);
    
    if (aliceResult.rows.length > 0 && supervisorResult.rows.length > 0) {
      await query(`
        INSERT INTO students (user_id, student_id, course, year_of_study, gpa, school_supervisor_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (student_id) DO NOTHING
      `, [aliceResult.rows[0].id, '154789', 'Bachelor of Business Information Technology', 3, 3.8, supervisorResult.rows[0].id]);
    }
    
    if (johnResult.rows.length > 0 && supervisorResult.rows.length > 0) {
      await query(`
        INSERT INTO students (user_id, student_id, course, year_of_study, gpa, school_supervisor_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (student_id) DO NOTHING
      `, [johnResult.rows[0].id, '154790', 'Bachelor of Commerce', 3, 3.6, supervisorResult.rows[0].id]);
    }
    
    // Insert system settings
    await query(`
      INSERT INTO system_settings (key, value, description)
      VALUES 
        ($1, $2, $3),
        ($4, $5, $6),
        ($7, $8, $9)
      ON CONFLICT (key) DO NOTHING
    `, [
      'academic_year', '2024/2025', 'Current academic year',
      'attachment_duration_weeks', '12', 'Default attachment duration in weeks',
      'max_applications_per_student', '3', 'Maximum number of applications a student can submit'
    ]);
    
    logger.info('Database seeding completed successfully');
  } catch (error) {
    logger.error('Seeding failed:', error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  const { connectDB } = require('./connection');
  
  connectDB()
    .then(() => seedData())
    .then(() => {
      logger.info('Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Seeding process failed:', error);
      process.exit(1);
    });
}

module.exports = { seedData };