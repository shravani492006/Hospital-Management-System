const express = require("express");
const router = express.Router();

const { createBill, getBills, payBill } = require("../controllers/billingController");

router.post("/", createBill);
router.get("/", getBills);
router.put("/pay/:id", payBill);

module.exports = router;