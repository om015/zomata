require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require('./models/user'); // Ensure this file exists

const app = express();

// ✅ Apply CORS Middleware
app.use(cors({ 
    origin: "*",  
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json()); // Middleware to parse JSON

// ✅ Debugging Logs for Environment Variables
console.log("🔍 MONGO_URI from env:", process.env.MONGO_URI || "❌ Not Found!");

// ✅ Ensure `MONGO_URI` Exists
if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is not set!");
    process.exit(1);
}

// ✅ Connect to MongoDB with Async/Await
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB connected successfully!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Stop server if DB connection fails
    }
}
connectDB();

// ✅ Debug Test Route (Move Above `module.exports`)
app.get('/api/test', (req, res) => {
    res.json({ message: "✅ API is working!" });
});

// ✅ User Registration Route
app.post('/api/register', async (req, res) => {
    console.log("Received Data:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.log("Missing fields:", req.body);
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        console.log("✅ User Registered Successfully");
        res.json({ message: "User Registered Successfully" });
    } catch (err) {
        console.error("❌ Error saving user:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ User Login Route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.json({ message: "Login Successful", username: user.username });
    } catch (err) {
        console.error("❌ Server Error:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ Export Express App for Vercel (Fix for Serverless)
module.exports = app;

// ✅ Ensure Local Development Works
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
