const db = require("../config/db");

// Create bill
exports.createBill = (req, res) => {
  const { patient_id, appointment_id, amount } = req.body;

  if (!patient_id || !appointment_id || !amount) {
    return res.status(400).json({ message: "All fields required ❌" });
  }

  const sql = `
    INSERT INTO billing (patient_id, appointment_id, amount, status)
    VALUES (?, ?, ?, 'pending')
  `;

  db.query(sql, [patient_id, appointment_id, amount], (err) => {
    if (err) {
      console.error("CREATE BILL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Bill created ✅" });
  });
};

// Get all bills
exports.getBills = (req, res) => {
  const sql = `
    SELECT b.*, u.name AS patient_name
    FROM billing b
    JOIN users u ON b.patient_id = u.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("GET BILL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
};

// Pay bill
exports.payBill = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE billing SET status = 'paid' WHERE bill_id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("PAY BILL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Bill paid ✅" });
  });
};