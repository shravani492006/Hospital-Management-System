const express = require("express");
const router = express.Router();

const { addRoom, getRooms, allocateRoom } = require("../controllers/roomController");

router.post("/", addRoom);
router.get("/", getRooms);
router.post("/allocate", allocateRoom);

module.exports = router;