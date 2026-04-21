const db = require("../config/db");

// Add test report
exports.addReport = (req, res) => {
  const { patient_id, appointment_id, test_type, result } = req.body;

  const sql = `
    INSERT INTO test_report (patient_id, appointment_id, test_type, result, status)
    VALUES (?, ?, ?, ?, 'completed')
  `;

  db.query(sql, [patient_id, appointment_id, test_type, result], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Report added ✅" });
  });
};

// Get reports
exports.getReports = (req, res) => {
  const sql = `
    SELECT tr.*, u.name AS patient_name
    FROM test_report tr
    JOIN users u ON tr.patient_id = u.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
};