const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.login = async (req, res) => {
    try {
        const { user, token } = await authService.loginUser(req.body);
        res.status(200).json({ message: 'User logged in successfully', user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}