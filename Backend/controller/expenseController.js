const xlsx = require('xlsx');
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const UserId = req.user._id;

    try {
        const { icon, category, amount, remarks, date } = req.body;
        if (!category || !amount) {
            return res.status(400).json({ message: "Fill all required fields!!" });
        }

        const newExpense = new Expense({
            userId: UserId,
            icon,
            category,
            amount,
            remarks,
            date
        });

        result = await newExpense.save();
        res.status(201).json({ message: "Expense added successfully!!", result });
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.getExpenses = async (req, res) => {
    const UserId = req.user._id;
    try {
        const expenses = await Expense.find({ userId: UserId }).sort({ date: -1 });
        if (!expenses) {
            return res.status(404).json({ message: "No expenses found" });
        }
        res.status(200).json(expenses);
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.getExpenseBySource = async (req, res) => {
    const UserId = req.user._id;
    const category = req.query.category;

    try {
        const expenses = await Expense.find({ userId: UserId, category: category }).sort({ date: -1 });
        if(!expenses){
            return res.status(404).json({ message: "No expenses found" });  
        }
        res.status(200).json(expenses);
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }

};

exports.updateExpense = async (req, res) => {
    const UserId = req.user._id;
    const expenseId = req.params.id;

    try {
        const { icon, category, amount, remarks } = req.body;
        if (!category || !amount) {
            return res.status(400).json({ message: "Fill all required fields!!" });
        }

        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if(expense.userId.toString() !== UserId.toString()){
            return res.status(401).json({message: "You are not authorized to update this Expense!!"});
        }

        expense.icon = icon;
        expense.category = category;
        expense.amount = amount;
        expense.remarks = remarks;

        result = await expense.save();
        return res.status(201).json({ message: "Expense updated successfully!!", expense });

    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Expense deleted successfully!!" });

    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const UserId = req.user._id;

    try {
        const expenses = await Expense.find({ userId: UserId }).sort({ date: -1 });
        if (!expenses) {
            return res.status(404).json({ message: "No expenses found" });
        }

        const data = expenses.map((expense) => {
            return {
                Date: expense.date,
                Category: expense.category,
                Amount: expense.amount,
                Remarks: expense.remarks
            };
        });

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        const excelFileName = `expense_${Date.now()}.xlsx`;
        xlsx.writeFile(wb, excelFileName);
        res.download(excelFileName);
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};