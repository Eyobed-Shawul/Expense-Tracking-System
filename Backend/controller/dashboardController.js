const Expense = require('../models/Expense');
const Income = require('../models/income');
const { isValidObjectId, Types } = require('mongoose')

exports.getDashboardData = async (req, res) =>{
    try {
        const UserId = req.user._id;
        const userObjectId = new Types.ObjectId(String(UserId));

        // Get total income
        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, totalIncome: {$sum: "$amount"}}}
        ]);

        console.log("totalIncome",{ totalIncome, userId: isValidObjectId(UserId)} );

        // Get total expense
        const totalExpense = await Expense.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, totalExpense: {$sum: "$amount"}}}
        ]);

        // Get Income transactions for the last 30 days
        const last30DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: {$gte: new Date(new Date().setDate(new Date().getDate()-30))}
        }).sort({date: -1});

        // Get Total Income for the last 30 days
        const last30DaysTotalIncome = last30DaysIncomeTransactions.reduce((sum, transaction) => {
            sum + transaction.amount, 
            0
        });

        // Get Expense transactions for the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: {$gte: new Date(new Date().setDate(new Date().getDate()-30))}
        }).sort({date: -1});

        // Get Total Expense for the last 30 days
        const last30DaysTotalExpense = last30DaysExpenseTransactions.reduce((sum, transaction) => {
            sum + transaction.amount, 
            0
        });

        // Fetch the latest 5 transactions
        const latestTransactions = [
            ...(await Income.find({userId: userObjectId}).sort({date: -1}).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type: "income"
                })
            ),
            ...(await Expense.find({userId: userObjectId}).sort({date: -1}).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type: "expense"
                })
            )
        ].sort((a, b) => b.date - a.date); // Sort the transactions in descending order of date

        // Send the response
        return res.status(200).json({
            totalBalance: (totalIncome[0]?.totalIncome || 0 ) - (totalExpense[0]?.totalExpense || 0),
            totalIncome: totalIncome.length > 0 ? totalIncome[0].totalIncome : 0,
            totalExpense: totalExpense.length > 0 ? totalExpense[0].totalExpense : 0,
            last30DaysTotalIncome : {
                total: last30DaysTotalIncome,
                transactions: last30DaysIncomeTransactions
            },
            last30DaysTotalExpense: {
                total: last30DaysTotalExpense,
                transactions: last30DaysExpenseTransactions
            },
            latestTransactions
        });

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};