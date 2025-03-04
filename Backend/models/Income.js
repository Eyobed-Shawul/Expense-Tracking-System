const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    icon:{
        type: String,
    },
    source: {
        type: String,
        required: [true, "source is required"]
    },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {    
    timestamps: true    
});


module.exports = mongoose.model("Income", incomeSchema);