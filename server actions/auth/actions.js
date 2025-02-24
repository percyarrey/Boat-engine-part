'use server';

import { redirect } from "next/navigation";
import User from "../../models/user";
import connectDB from "../../utils/connectDB";
import { sendEmail } from "../../utils/sendgrid";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react"; // Import signIn to create new session

const websiteName = 'CreativeParts';

function generateCode(length = 4) {
    const charset = '0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset.charAt(randomIndex);
    }

    return code;
}

export async function sendForgotPassEmail(email) {
    await connectDB();

    // Use findOne to get a single user
    const user = await User.findOne({ email: email });

    if (user) {
        // Generate reset password code
        const code = generateCode();
        const msg = {
            to: user.email,
            from: process.env.EMAIL, // Adjusted for environment variable
            template_id: 'd-fb77e191354941ca996b79e586a196d0',
            dynamic_template_data: {
                websitename: websiteName,
                email: user.email,
                code: code,
            },
        };
        try {
            await sendEmail(msg);
        } catch (error) {
            console.error(error)
        }
        user.resetPasswordCode = code;
        user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000; // 1 day in milliseconds

        // Save the updated user object
        await user.save();
        return {
            id: user._id.toString()
        };
    } else {
        throw new Error('Email not found in our database');
    }
}

export async function resetPassword(id, code, password) {
    await connectDB();
    const user = await User.findOne({ _id: id });

    // Check if the user exists
    if (!user) {
        return { success: false, message: 'User not found', };
    }

    // Check if the reset password code matches
    if (user.resetPasswordCode !== code) {
        return { success: false, message: 'Invalid reset password code', };
    }

    // Check if the reset password code has expired
    if (Date.now() > user.resetPasswordExpires) {
        return { success: false, message: 'Reset password code has expired', };
    }
    const passwordMatch = await user.comparePassword(password)
    if (passwordMatch) return { success: false, message: 'Password must not be thesame as the old password', }
    user.password = password
    user.save()
    // If everything is valid, return a success message
    return { success: true, message: 'Password Resetted successfully', status: 200 };
}
export async function verifyResetPasswordCode(id, code) {
    await connectDB();
    const user = await User.findOne({ _id: id });

    // Check if the user exists
    if (!user) {
        return { success: false, message: 'User not found', };
    }

    // Check if the reset password code matches
    if (user.resetPasswordCode !== code) {
        return { success: false, message: 'Invalid reset password code', };
    }

    // Check if the reset password code has expired
    if (Date.now() > user.resetPasswordExpires) {
        return { success: false, message: 'Reset password code has expired', };
    }

    // If everything is valid, return a success message
    return { success: true, message: 'Code verified successfully', status: 200 };
}


export async function verifyEmail(email) {
    await connectDB();

    // Use findOne to get a single user
    const user = await User.findOne({ email: email });

    if (user) {
        // Generate reset password code
        const code = generateCode();
        const msg = {
            to: user.email,
            from: process.env.EMAIL, // Adjusted for environment variable
            template_id: 'd-d64b08e9c5bb451ea5c739b98b7cde05',
            dynamic_template_data: {
                websitename: websiteName,
                email: user.email,
                code: code,
            },
        };
        try {
            await sendEmail(msg);
        } catch (error) {
            console.error(error)
        }
        user.verificationCode = code;
        user.verificationCodeExpires = Date.now() + 24 * 60 * 60 * 1000; // 1 day in milliseconds

        // Save the updated user object
        await user.save();
        return {
            id: user._id.toString()
        };
    } else {
        throw new Error('Email not found in our database');
    }
}
export async function verifyEmailCode(email, code) {
    await connectDB();
    const user = await User.findOne({ email: email });

    // Check if the user exists
    if (!user) {
        return { success: false, message: 'Email not found' };
    }

    // Check if the verification code matches
    if (user.verificationCode !== code) {
        return { success: false, message: 'Invalid verification code' };
    }

    // Check if the verification code has expired
    if (Date.now() > user.verificationCodeExpires) {
        return { success: false, message: 'Verification code has expired' };
    }

    // If everything is valid, update the user and create a new session
    user.isVerified = true;
    await user.save();
    return { success: true, message: 'Code verified successfully', status: 200 };
}