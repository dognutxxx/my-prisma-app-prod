const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text, html) => {
  try {
    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Check if run directly
if (require.main === module) {
  const to = process.argv[2] || 'test@example.com';
  const subject = process.argv[3] || 'Test Email';
  const text = process.argv[4] || 'This is a test email from Node.js';
  
  console.log(`Sending email to: ${to}...`);
  
  sendEmail(to, subject, text)
    .then(() => console.log('Email sending test complete.'))
    .catch((err) => console.error('Email sending test failed:', err));
}

module.exports = sendEmail;
