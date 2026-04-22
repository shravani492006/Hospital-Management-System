import { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch doctors
  useEffect(() => {
    fetch("https://hospital-management-system-1-jrj5.onrender.com/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err));
  }, []);

  // Filter doctors by department OR name
  const filteredDoctors = doctors.filter(doc =>
    doc.department.toLowerCase().includes(search.toLowerCase()) ||
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Doctors</h2>

      {/* 🔍 Search */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by name or department..."
          className="border p-2 rounded w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Qualification</th>
            </tr>
          </thead>

          <tbody>
            {filteredDoctors.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No doctors found
                </td>
              </tr>
            ) : (
              filteredDoctors.map((doc) => (
                <tr key={doc.doctor_id} className="text-center border-b">
                  <td className="p-3">{doc.doctor_id}</td>
                  <td className="p-3">{doc.name}</td>
                  <td className="p-3">{doc.department}</td>
                  <td className="p-3">{doc.qualification}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;