const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    icon:{
        type: String,
    },
    category: {
        type: String,
        required: [true, "source is required"]
    },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    remarks: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {    
    timestamps: true    
});


module.exports = mongoose.model("Expense", expenseSchema);