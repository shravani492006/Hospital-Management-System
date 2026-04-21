const db = require("../config/db");

exports.getStats = (req, res) => {
  const stats = {};

  const q1 = "SELECT COUNT(*) AS totalAppointments FROM appointment";
  const q2 = "SELECT COUNT(*) AS totalDoctors FROM doctor";
  const q3 = "SELECT COUNT(*) AS totalBills FROM billing";

  db.query(q1, (err, r1) => {
    if (err) return res.status(500).json(err);

    stats.totalAppointments = r1[0].totalAppointments;

    db.query(q2, (err, r2) => {
      if (err) return res.status(500).json(err);

      stats.totalDoctors = r2[0].totalDoctors;

      db.query(q3, (err, r3) => {
        if (err) return res.status(500).json(err);

        stats.totalBills = r3[0].totalBills;

        res.json(stats);
      });
    });
  });
};