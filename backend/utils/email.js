import nodemailer from 'nodemailer';

async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOption = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOption);
        console.log("Email Send Successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

async function sendOTP(email, otp) {
    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email verification OTP",
        text: `Your OTP for email verification is ${otp}`,
    };
    try {
        await transporter.sendMail(mailOption);
        console.log("Email Send Successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export { sendEmail, sendOTP };