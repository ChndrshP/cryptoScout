import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, subject, text) => {
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


export const sendOTP = async (email, otp) => {
    let mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email verification OTP",
        text: `Your OTP for email verification is ${otp}`,
    };
    try {
        await transporter.sendMail(mailOption);
        console.log("OTP Sent Successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export const sendResetPasswordEmail = async (email, resetLink) => {
    let mailOption = {
        from: 'no-reply@CryptoScout.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click on this link to reset your password: ${resetLink}`
    };
    try {
        await transporter.sendMail(mailOption);
        console.log("Reset Link Send Successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
}