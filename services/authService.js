const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async ({ email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
}

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { password: _, ...userWithoutPassword } = user.toObject();
    return { user: userWithoutPassword, token };
}

module.exports = {
    registerUser,
    loginUser
};