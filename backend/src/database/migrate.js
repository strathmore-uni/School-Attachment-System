const fs = require('fs');
const path = require('path');
const { query } = require('./connection');
const logger = require('../utils/logger');

const runMigrations = async () => {
  try {
    logger.info('Starting database migration...');
    
    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await query(statement);
      }
    }
    
    logger.info('Database migration completed successfully');
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  const { connectDB } = require('./connection');
  
  connectDB()
    .then(() => runMigrations())
    .then(() => {
      logger.info('Migration process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Migration process failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations };