const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(request, response) {
    try {
        const { password, userId } = request.body;

        // Check if user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true
            });
        }

        // Verify password
        const verifyPassword = await bcryptjs.compare(password, user.password);
        if (!verifyPassword) {
            return response.status(400).json({
                message: "Please check password",
                error: true
            });
        }

        // Token data
        const tokenData = {
            id: user._id,
            email: user.email
        };

        // Generate JWT token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Cookie options
        res.cookie('token', token, {
            httpOnly: true, // Makes the cookie inaccessible via JavaScript
            secure: process.env.NODE_ENV === 'production',  // Secure only in production (HTTPS)
            sameSite: 'lax',  // Prevents CSRF attacks
            maxAge: 3600000,  // 1 hour expiration
        });


        // Send cookie and response
        return response.cookie("mani", token, cookieOptions).status(200).json({
            message: "Login successfully",
            token: token,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = checkPassword;
