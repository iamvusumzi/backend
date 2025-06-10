require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
authMiddleware = require("./middlewares/authMiddleware");

const app = express();
app.get('/', (req, res) => {
    res.json({message:"Welcome to the User Management API"});
});

app.get('/profile', authMiddleware, (req, res) => {
    res.json({message: "This is a protected route", user: req.user});
});


app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
})
mongoose.connect(process.env.DB_URI).then(() => app.listen(process.env.PORT, () => {console.log(`Server is running on port ${process.env.PORT}`);}))
.catch((err) => console.error("Database connection error:", err));