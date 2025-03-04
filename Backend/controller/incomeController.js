const xlsx = require('xlsx');
const Income = require('../models/income');

//Add Income Source
exports.addIncome = async (req, res) => {
    const UserId = req.user._id;
   	
    try{
        const { icon, source, amount, date } = req.body;
        if(!source || !amount){
            return res.status(400).json({message: "Fill all required fields!!"});
        }

        const newIncome = new Income({
            userId: UserId,
            icon,
            source,
            amount,
            date: new Date()
        });

        result = await newIncome.save();
        res.status(201).json({message: "Income added successfully!!", result});
    } catch (err) {
        return res.status(500).json( {message: "Server Error", error: err.message });
    }
};

//Get all Incomes
exports.getIncomes = async (req, res) => {
    const UserId = req.user._id;
    try{
        const incomes = await Income.find({userId: UserId}).sort({date: -1});
        res.status(200).json(incomes);
    } catch (err) {
        return res.status(500).json( {message: "Server Error", error: err.message });
    }
};

//update Income
exports.updateIncome = async (req, res) => {
    const UserId = req.user._id;
    const incomeId = req.params.id;

    try{
        const { icon, source, amount} = req.body;
        if(!source || !amount){
            return res.status(400).json({message: "Fill all required fields!!"});
        }

        const income = await Income.findById(incomeId);
        if(!income){
            return res.status(404).json({message: "Income not found"});
        }

        if(income.userId.toString() !== UserId.toString()){
            return res.status(401).json({message: "You are not authorized to update this income!!"});
        }

        income.icon = icon;
        income.source = source;
        income.amount = amount;

        result = await income.save();
        res.status(200).json({message: "Income updated successfully!!", result});
    } catch (err) {
        return res.status(500).json( {message: "Server Error", error: err.message });
    }
};

//Delete Income
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        
        res.status(200).json({message: "Income deleted successfully!!"});
    } catch (err) {
        return res.status(500).json( {message: "Server Error", error: err.message });
    }
};

//Search Income by Source
exports.getIncomeBySource = async (req, res) => {
    const UserId = req.user._id;
    const source = req.query.source;
    try {
        const income = await Income.find({userId: UserId, source: source}).sort({date: -1});
        if(!income){
            return res.status(404).json({message: "Income not found"});
        }

        res.status(200).json(income);
    } catch (err) {
        return res.status(500).json( {message: "Server Error", error: err.message });
    }
};

//Download Income Excel
exports.downloadIncomeExcel = async (req, res) => {
    const UserId = req.user._id;
    try {
        const incomes = await Income.find({userId: UserId}).sort({date: -1});
        if(!incomes){
            return res.status(404).json({message: "Empty Income List"});
        }

        //Prepare data for excel (.xlsx) file
        const data = incomes.map((income) => {
            return {
                Source: income.source,
                Amount: income.amount,
                Date: income.date
            };
        });

        //Create excel file
        const wb= xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "Income.xlsx");

        res.download("Income.xlsx");

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};
