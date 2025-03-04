const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
     addIncome,
     getIncomes, 
     getIncomeBySource, 
     updateIncome, deleteIncome, downloadIncomeExcel } = require("../controller/incomeController");

router.post("/add-income", protect, addIncome);
router.get("/get-incomes", protect, getIncomes);
router.put("/update-income/:id", protect, updateIncome);
router.delete("/delete-income/:id", protect, deleteIncome);
router.get("/download-income-excel", protect, downloadIncomeExcel);
router.get("/search-income", protect, getIncomeBySource);

module.exports = router;