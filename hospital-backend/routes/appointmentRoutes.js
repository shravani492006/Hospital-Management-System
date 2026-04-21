const express = require("express");
const router = express.Router();

const { bookAppointment, getAppointments, cancelAppointment } = require("../controllers/appointmentController");
const verifyToken = require("../middleware/authMiddleware");

// 🔐 Protected routes
router.post("/", verifyToken, bookAppointment);
router.get("/", verifyToken, getAppointments);
router.delete("/:id", verifyToken, cancelAppointment);

module.exports = router;