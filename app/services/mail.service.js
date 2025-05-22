const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.config");

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: mailConfig.auth,
});

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: mailConfig.from,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
