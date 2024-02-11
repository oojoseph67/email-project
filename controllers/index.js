const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: '"mcQu33n 👻" <foo@example.com>',
      to: "oojoseph67@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world? sending this with the help of nodejs</b>",
    });

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.error("Error sending email: ", error);
    //     } else {
    //       console.log("Email sent: ", info.response);
    //     }
    //   });

    console.log(info);

    res.json(info);
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "Failed to send email", reason: error.reason });
  }
};

module.exports = { sendEmail };
