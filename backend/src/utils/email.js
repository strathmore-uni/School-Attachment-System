const nodemailer = require('nodemailer');
const logger = require('./logger');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };
    
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    logger.error('Email sending failed:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to Strathmore Attachment System',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Your account has been created successfully.</p>
      <p>You can now log in to the Strathmore Attachment System and start managing your attachment process.</p>
      <p>Best regards,<br>Strathmore University</p>
    `
  }),
  
  applicationSubmitted: (studentName, positionTitle, organizationName) => ({
    subject: 'Application Submitted Successfully',
    html: `
      <h1>Application Submitted</h1>
      <p>Dear ${studentName},</p>
      <p>Your application for the position of <strong>${positionTitle}</strong> at <strong>${organizationName}</strong> has been submitted successfully.</p>
      <p>You will be notified once your application is reviewed.</p>
      <p>Best regards,<br>Strathmore University</p>
    `
  }),
  
  applicationStatusUpdate: (studentName, positionTitle, status) => ({
    subject: `Application ${status}`,
    html: `
      <h1>Application Status Update</h1>
      <p>Dear ${studentName},</p>
      <p>Your application for the position of <strong>${positionTitle}</strong> has been <strong>${status}</strong>.</p>
      ${status === 'approved' ? '<p>Congratulations! Please check your dashboard for next steps.</p>' : ''}
      <p>Best regards,<br>Strathmore University</p>
    `
  }),
  
  reportSubmitted: (studentName, reportTitle) => ({
    subject: 'Report Submitted Successfully',
    html: `
      <h1>Report Submitted</h1>
      <p>Dear ${studentName},</p>
      <p>Your report "<strong>${reportTitle}</strong>" has been submitted successfully.</p>
      <p>Your supervisor will review it and provide feedback.</p>
      <p>Best regards,<br>Strathmore University</p>
    `
  }),
  
  evaluationCompleted: (studentName, evaluationType, rating) => ({
    subject: 'New Evaluation Completed',
    html: `
      <h1>Evaluation Completed</h1>
      <p>Dear ${studentName},</p>
      <p>Your <strong>${evaluationType}</strong> evaluation has been completed.</p>
      <p>Overall Rating: <strong>${rating}/5</strong></p>
      <p>Please check your dashboard for detailed feedback.</p>
      <p>Best regards,<br>Strathmore University</p>
    `
  })
};

module.exports = {
  sendEmail,
  emailTemplates
};