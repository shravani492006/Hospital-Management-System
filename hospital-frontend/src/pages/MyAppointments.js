import { useEffect, useState } from "react";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("all");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("https://hospital-management-system-1-jrj5.onrender.com/api/appointments", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.log(err));

  }, [token]);

  const handleCancel = async (id) => {
    const res = await fetch(
      `https://hospital-management-system-1-jrj5.onrender.com/api/appointments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const data = await res.json();
    alert(data.message);

    setAppointments(prev =>
      prev.filter(app => app.appointment_id !== id)
    );
  };

  // FILTER LOGIC
  const today = new Date();

  const filteredAppointments = appointments.filter(app => {
    const appDate = new Date(app.date);

    if (filterType === "upcoming" && appDate < today) return false;
    if (filterType === "past" && appDate >= today) return false;

    if (filterDate && app.date.slice(0, 10) !== filterDate) return false;

    return true;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Appointments</h2>

      {/* FILTER UI */}
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No appointments found
                </td>
              </tr>
            ) : (
              filteredAppointments.map(app => (
                <tr key={app.appointment_id} className="text-center border-b">
                  <td className="p-3">{app.appointment_id}</td>
                  <td className="p-3">{app.doctor_name}</td>
                  <td className="p-3">{app.date.slice(0, 10)}</td>
                  <td className="p-3">{app.appointment_time}</td>
                  <td>
                    <button
                      onClick={() => handleCancel(app.appointment_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAppointments;
