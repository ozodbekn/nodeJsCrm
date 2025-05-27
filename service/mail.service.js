const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async sendMail(toEmail, otp) {
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: "Crm akkauntini faollashtirish",
      text: "",
      html: `    
        <div>
            <h2>Akkauntni faollashtirish uchun otp yuborildi</h2>
            <h1>${otp}</h1>
        </div>`,
    });
  }
}

module.exports = new MailService();
