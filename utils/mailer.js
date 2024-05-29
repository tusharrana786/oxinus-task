const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
  host: "smtp-mail.outlook.com",
  secureConnection: false, // use SSL
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  }
});

exports.sendMail = async ( email ) => {
  try {
    const mailOptions = {
      from: {
        name: 'tushar rana',
        address: process.env.MAIL_USERNAME
      },
      // from: process.env.MAIL_USERNAME, // Sender address
      to: email, // List of recipients
      subject: 'Account Creation', // Subject line
      text: 'Hello, Welcome to the club, Hope you have a great day!' // Plain text body
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error)
  }
  
}

