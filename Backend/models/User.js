const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    profileImageUrl: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// Hashing password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare user password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);