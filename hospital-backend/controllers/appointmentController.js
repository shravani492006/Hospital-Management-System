const db = require("../config/db");

// Book appointment
exports.bookAppointment = (req, res) => {
  const { patient_id, doctor_id, date, appointment_time } = req.body;

  if (!patient_id || !doctor_id || !date || !appointment_time) {
    return res.status(400).json({
      message: "All fields are required ❌"
    });
  }

  const checkSql = `
    SELECT * FROM appointment 
    WHERE doctor_id = ? AND date = ? AND appointment_time = ?
  `;

  db.query(checkSql, [doctor_id, date, appointment_time], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length > 0) {
      return res.status(400).json({
        message: "Slot already booked ❌"
      });
    }

    const insertSql = `
      INSERT INTO appointment (patient_id, doctor_id, date, appointment_time)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertSql, [patient_id, doctor_id, date, appointment_time], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Appointment booked ✅" });
    });
  });
};

// Get all appointments (WITH DOCTOR NAME)
exports.getAppointments = (req, res) => {
  const sql = `
    SELECT 
      a.*, 
      d.name AS doctor_name,
      u.name AS patient_name
    FROM appointment a
    JOIN doctor d ON a.doctor_id = d.doctor_id
    JOIN users u ON a.patient_id = u.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(result);
  });
};

// Cancel appointment
exports.cancelAppointment = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM appointment WHERE appointment_id = ?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Appointment cancelled ✅" });
  });
};