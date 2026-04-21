const express = require("express");
const router = express.Router();

const { addDoctor, getDoctors, deleteDoctor } = require("../controllers/doctorController");

router.post("/", addDoctor);
router.get("/", getDoctors);
router.delete("/:id", deleteDoctor);

module.exports = router;
