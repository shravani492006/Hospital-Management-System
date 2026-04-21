const db = require("../config/db");

// Add room
exports.addRoom = (req, res) => {
  const { room_number, room_type, capacity } = req.body;

  const sql = `
    INSERT INTO room (room_number, room_type, capacity, availability)
    VALUES (?, ?, ?, 'available')
  `;

  db.query(sql, [room_number, room_type, capacity], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Room added ✅" });
  });
};

// Get rooms
exports.getRooms = (req, res) => {
  const sql = `SELECT * FROM room`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
};

// Allocate room
exports.allocateRoom = (req, res) => {
  const { patient_id, room_id } = req.body;

  if (!patient_id || !room_id) {
    return res.status(400).json({ message: "All fields required ❌" });
  }

  // Check if room is available
  const checkRoom = "SELECT * FROM room WHERE room_id = ? AND availability = 'available'";

  db.query(checkRoom, [room_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(400).json({ message: "Room not available ❌" });
    }

    // Allocate room
    const sql = `
      INSERT INTO room_allocation (patient_id, room_id, admission_date)
      VALUES (?, ?, CURDATE())
    `;

    db.query(sql, [patient_id, room_id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Update room status
      db.query(
        "UPDATE room SET availability = 'occupied' WHERE room_id = ?",
        [room_id]
      );

      res.json({ message: "Room allocated ✅" });
    });
  });
};