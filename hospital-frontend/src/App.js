import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Billing from "./pages/Billing";
import { useEffect, useState } from "react";

// Dashboard
function Dashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalDoctors: 0,
    totalBills: 0
  });

  useEffect(() => {
    const API = "https://hospital-management-system-1-jrj5.onrender.com";

       fetch(`${API}/api/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded text-center">
          <h3>Appointments</h3>
          <p className="text-2xl font-bold">{stats.totalAppointments}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded text-center">
          <h3>Doctors</h3>
          <p className="text-2xl font-bold">{stats.totalDoctors}</p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded text-center">
          <h3>Bills</h3>
          <p className="text-2xl font-bold">{stats.totalBills}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4">
        <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/book">
          Book Appointment
        </Link>

        <Link className="bg-green-500 text-white px-4 py-2 rounded" to="/doctors">
          View Doctors
        </Link>

        <Link className="bg-purple-500 text-white px-4 py-2 rounded" to="/my-appointments">
          My Appointments
        </Link>

        <Link className="bg-yellow-500 text-white px-4 py-2 rounded" to="/billing">
          Billing
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Main App
function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route path="/doctors" element={isLoggedIn ? <Doctors /> : <Login />} />
        <Route path="/book" element={isLoggedIn ? <BookAppointment /> : <Login />} />
        <Route path="/my-appointments" element={isLoggedIn ? <MyAppointments /> : <Login />} />
        <Route path="/billing" element={isLoggedIn ? <Billing /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;