import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🕒 Time slots
  const timeSlots = ["10:00", "11:00", "12:00", "14:00", "15:00"];

  // Fetch doctors
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        patient_id: 1,
        doctor_id: doctorId,
        date,
        appointment_time: time
      })
    });

    const data = await res.json();

    if (data.message.includes("✅")) {
      alert(data.message);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleBook}
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Book Appointment
        </h2>

        {/* Doctor */}
        <select
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setDoctorId(e.target.value)}
        >
          <option>Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.doctor_id} value={doc.doctor_id}>
              {doc.name} ({doc.department})
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setDate(e.target.value)}
        />

        {/* 🕒 Time Slot Dropdown */}
        <select
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setTime(e.target.value)}
        >
          <option>Select Time Slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Book
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;