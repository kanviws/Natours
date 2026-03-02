const nodemailer = require('nodemailer');
<<<<<<< HEAD
const htmlToText = require('html-to-text');
const pug = require('pug');
// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Kanvi Doshi <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  // newTransport() {
  //   // if (process.env.NODE_ENV === 'production') {
  //   // sendgrid
  //   return nodemailer.createTransport({
  //     service: 'SendGrid',
  //     auth: {
  //       user: process.env.SENDGRID_USERNAME,
  //       pass: process.env.SENDGRID_PASSWORD,
  //     },
  //   });
  // };
  //   return nodemailer.createTransport({
  //     host: process.env.EMAIL_HOST,
  //     port: process.env.EMAIL_PORT,
  //     auth: {
  //       user: process.env.EMAIL_USERNAME,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  //   });

  async send(template, subject) {
    // 1]render html on pug
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2] email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };
    // 3] create a transport and send email
    // this.createTransport().sendMail(mailOptions, (err, info) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(info);
    //   }
    // });
    // console.log('THIS IS EMAIL');
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family!');
  }
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
=======

const sendEmail = async (options) => {
  // creating a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // define the email options
  const mailOptions = {
    from: 'Kanvi Doshi<honbun@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //actually send the mail
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
