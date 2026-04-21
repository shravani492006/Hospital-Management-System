const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctors", doctorRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const billingRoutes = require("./routes/billingRoutes");
app.use("/api/billing", billingRoutes);

const testReportRoutes = require("./routes/testReportRoutes");
app.use("/api/reports", testReportRoutes);

const roomRoutes = require("./routes/roomRoutes");
app.use("/api/rooms", roomRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});