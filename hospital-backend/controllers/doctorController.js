const db = require("../config/db");

// Add doctor
exports.addDoctor = (req, res) => {
  const { emp_id, department, qualification } = req.body;

  const sql = `
    INSERT INTO doctor (emp_id, department, qualification)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [emp_id, department, qualification], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Doctor added ✅" });
  });
};

// Get all doctors
exports.getDoctors = (req, res) => {
  const sql = `
    SELECT d.doctor_id, e.name, d.department, d.qualification
    FROM doctor d
    JOIN employee e ON d.emp_id = e.emp_id
  `;

  
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// Delete doctor
exports.deleteDoctor = (req, res) => {
  const { id } = req.params;

  // Step 1: delete appointments
  const deleteAppointments = "DELETE FROM appointment WHERE doctor_id = ?";

  db.query(deleteAppointments, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    // Step 2: delete doctor
    const deleteDoctorSql = "DELETE FROM doctor WHERE doctor_id = ?";

    db.query(deleteDoctorSql, [id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "Doctor and related appointments deleted ✅" });
    });
  });
};