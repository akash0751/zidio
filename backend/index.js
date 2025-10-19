const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const registerRoute = require('./routes/register');
const skillRoute = require('./routes/skill');
const achievementRoute = require('./routes/achievement');
const educationRoute = require('./routes/education');
const projectRoute = require('./routes/project');
const infoRoute = require('./routes/info');
const path = require('path');
dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: ["https://zidio-cyan.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());
app.use('/api', registerRoute);
app.use('/api/skills', skillRoute);
app.use('/api/achievement', achievementRoute);
app.use('/api/educations', educationRoute);
app.use('/api/projects', projectRoute);
app.use('/api/info', infoRoute);
// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// MongoDB Connection
mongoose.connect(process.env.URL).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.error("Database connection error:", err);
});
