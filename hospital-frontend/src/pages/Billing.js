import { useEffect, useState } from "react";

function Billing() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/billing")
      .then(res => res.json())
      .then(data => setBills(data))
      .catch(err => console.log(err));
  }, []);

  const handlePay = async (id) => {
    const res = await fetch(`http://localhost:5000/api/billing/pay/${id}`, {
      method: "PUT"
    });

    const data = await res.json();
    alert(data.message);

    setBills(prev =>
      prev.map(b =>
        b.bill_id === id ? { ...b, status: "paid" } : b
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Billing</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.map(bill => (
              <tr key={bill.bill_id} className="text-center border-b">
                <td className="p-3">{bill.bill_id}</td>
                <td className="p-3">{bill.patient_name}</td>
                <td className="p-3">{bill.amount}</td>
                <td className="p-3">{bill.status}</td>
                <td>
                  {bill.status === "pending" && (
                    <button
                      onClick={() => handlePay(bill.bill_id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Billing;