const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
     addExpense,
     getExpenses, 
     getExpenseBySource, 
     updateExpense, deleteExpense, downloadExpenseExcel } = require("../controller/expenseController");

router.post("/add-expense", protect, addExpense);
router.get("/get-expenses", protect, getExpenses);
router.put("/update-expense/:id", protect, updateExpense);
router.delete("/delete-expense/:id", protect, deleteExpense);
router.get("/download-expense-excel", protect, downloadExpenseExcel);
router.get("/search-expense", protect, getExpenseBySource);

module.exports = router;