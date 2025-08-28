import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'hotmail', 'yahoo', or use SMTP config
  auth: {
    user: 'hannorayousef@gmail.com',
    pass: 'rsma rdpq kdbt yxsm'
  }
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: 'hannorayousef@gmail.com',
    to: "bahgatsaber60@gmail.com",
    subject:"test",
    html,
  });
};

sendEmail()