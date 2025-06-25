# Strathmore Attachment System - Backend API

A comprehensive backend system for managing university student attachments, built with Node.js, Express, and PostgreSQL.

## Features

- **User Management**: Multi-role authentication (Students, Supervisors, Administrators)
- **Application System**: Complete application workflow with status tracking
- **Attachment Management**: Track student placements and progress
- **Reporting System**: Weekly/monthly progress reports with feedback
- **Evaluation System**: Performance evaluations by supervisors
- **Attendance Tracking**: Daily attendance monitoring
- **Analytics**: Comprehensive reporting and analytics
- **Notifications**: Email notifications for important events
- **File Upload**: Support for document uploads
- **Audit Logging**: Complete audit trail of system activities

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Logging**: Winston
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

## Project Structure

```
backend/
├── src/
│   ├── database/
│   │   ├── connection.js      # Database connection and query utilities
│   │   ├── schema.sql         # Database schema definition
│   │   ├── migrate.js         # Migration runner
│   │   └── seed.js           # Database seeding
│   ├── models/
│   │   ├── User.js           # User model
│   │   ├── Student.js        # Student model
│   │   ├── Organization.js   # Organization model
│   │   └── Application.js    # Application model
│   ├── routes/
│   │   ├── index.js          # Route aggregator
│   │   ├── auth.js           # Authentication routes
│   │   ├── users.js          # User management routes
│   │   ├── students.js       # Student routes
│   │   ├── organizations.js  # Organization routes
│   │   ├── applications.js   # Application routes
│   │   ├── attachments.js    # Attachment routes
│   │   ├── reports.js        # Report routes
│   │   ├── evaluations.js    # Evaluation routes
│   │   ├── attendance.js     # Attendance routes
│   │   ├── notifications.js  # Notification routes
│   │   └── analytics.js      # Analytics routes
│   ├── middleware/
│   │   ├── auth.js           # Authentication middleware
│   │   ├── validation.js     # Input validation middleware
│   │   └── errorHandler.js   # Global error handler
│   ├── utils/
│   │   ├── logger.js         # Logging utility
│   │   └── email.js          # Email utility
│   └── server.js             # Main server file
├── logs/                     # Log files
├── uploads/                  # File uploads
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb strathmore_attachment
   
   # Run migrations
   npm run migrate
   
   # Seed initial data
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=strathmore_attachment
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=false

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@strathmore.edu
FROM_NAME=Strathmore Attachment System

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/change-password` - Change password

### Users
- `GET /api/v1/users` - Get all users (admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (admin only)

### Students
- `GET /api/v1/students` - Get all students
- `GET /api/v1/students/:id` - Get student by ID
- `PUT /api/v1/students/:id` - Update student
- `GET /api/v1/students/:id/stats` - Get student statistics

### Organizations
- `GET /api/v1/organizations` - Get all organizations
- `POST /api/v1/organizations` - Create organization (admin only)
- `GET /api/v1/organizations/:id` - Get organization by ID
- `PUT /api/v1/organizations/:id` - Update organization
- `DELETE /api/v1/organizations/:id` - Delete organization (admin only)

### Applications
- `GET /api/v1/applications` - Get applications
- `POST /api/v1/applications` - Create application (students only)
- `GET /api/v1/applications/:id` - Get application by ID
- `PUT /api/v1/applications/:id/status` - Update application status
- `PUT /api/v1/applications/:id/withdraw` - Withdraw application

### Reports
- `GET /api/v1/reports` - Get reports
- `POST /api/v1/reports` - Create report (students only)
- `GET /api/v1/reports/:id` - Get report by ID
- `PUT /api/v1/reports/:id` - Update report
- `PUT /api/v1/reports/:id/review` - Review report (supervisors only)

### Evaluations
- `GET /api/v1/evaluations` - Get evaluations
- `POST /api/v1/evaluations` - Create evaluation (supervisors only)
- `GET /api/v1/evaluations/:id` - Get evaluation by ID
- `PUT /api/v1/evaluations/:id` - Update evaluation

### Attendance
- `GET /api/v1/attendance` - Get attendance records
- `POST /api/v1/attendance` - Record attendance
- `GET /api/v1/attendance/:id` - Get attendance by ID
- `PUT /api/v1/attendance/:id` - Update attendance

### Analytics
- `GET /api/v1/analytics/dashboard` - Get dashboard analytics
- `GET /api/v1/analytics/reports` - Get report analytics
- `GET /api/v1/analytics/performance` - Get performance analytics

## Database Schema

The system uses PostgreSQL with the following main entities:

- **Users**: System users with different roles
- **Students**: Student-specific information
- **Organizations**: Partner organizations
- **Host Supervisors**: Organization supervisors
- **Attachment Positions**: Available positions
- **Applications**: Student applications
- **Attachments**: Active placements
- **Reports**: Progress reports
- **Evaluations**: Performance evaluations
- **Attendance**: Daily attendance records
- **Notifications**: System notifications
- **Audit Logs**: System activity logs

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for different user roles
- **Password Hashing**: Bcrypt for secure password storage
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Cross-origin request security
- **Helmet**: Security headers
- **Input Validation**: Comprehensive input validation
- **SQL Injection Prevention**: Parameterized queries

## Logging

The system uses Winston for comprehensive logging:

- **Error Logs**: `logs/error.log`
- **Combined Logs**: `logs/combined.log`
- **Console Output**: Development environment only

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Deployment

1. **Set environment to production**
   ```bash
   export NODE_ENV=production
   ```

2. **Set up production database**
   ```bash
   npm run migrate
   ```

3. **Start with PM2 (recommended)**
   ```bash
   pm2 start src/server.js --name "strathmore-api"
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.