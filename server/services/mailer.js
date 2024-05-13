require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const mailer = async (email, subject, message) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"E-commerce application 👻" ${process.env.USERNAME}`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
  });

  return info;

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

module.exports = { mailer };
