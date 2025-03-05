require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoute = require("./routes/incomeRoutes");
const expenseRoute = require("./routes/expenseRoutes");

const app = express();

// Middleware
app.use(cors(
    {
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoute);
app.use("/api/expense", expenseRoute);

// Serve uploads folder as static folder used to upload the profile picture
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const  PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
