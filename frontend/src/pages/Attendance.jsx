import { useState } from "react";
import API from "../api/api";
import AttendanceForm from "../components/AttendanceForm";

export default function Attendance({ employees }) {
  const [records, setRecords] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchAttendance = async (empId) => {
    if (!empId) return;
    const res = await API.get(`/attendance/${empId}`);
    setRecords(res.data);
  };

  const totalPresentDays = records.filter(
    (r) => r.status === "Present"
  ).length;

  const updateAttendance = async (record) => {
    try {
      await API.put("/attendance", {
        employee_id: record.employee_id,
        date: record.date,
        status: record.status,
      });
      alert("Attendance updated successfully");
      setEditingId(null);
      fetchAttendance(record.employee_id);
    } catch (err) {
      alert(err.response?.data?.detail || "Error updating attendance");
    }
  };

  return (
    <div className="container">
      <h1>Attendance</h1>
      <AttendanceForm
        employees={employees}
        onSuccess={fetchAttendance}
      />
      <h2>View Attendance Records</h2>
      <select
        value={selectedEmployee}
        onChange={(e) => {
          setSelectedEmployee(e.target.value);
          fetchAttendance(e.target.value);
        }}
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.employee_id} value={emp.employee_id}>
            {emp.full_name} ({emp.employee_id})
          </option>
        ))}
      </select>
      {selectedEmployee && (
        <div className="card">
          <strong>Employee ID:</strong> {selectedEmployee} <br />
          <strong>Total Present Days:</strong> {totalPresentDays}
        </div>
      )}
      {records.length === 0 && selectedEmployee && (
        <p>No attendance records found.</p>
      )}

      {records.map((r) => (
        <div key={r.id} className="card">
          <p><strong>Date:</strong> {r.date}</p>

          {editingId === r.id ? (
            <>
              <select
                value={r.status}
                onChange={(e) =>
                  setRecords((prev) =>
                    prev.map((rec) =>
                      rec.id === r.id
                        ? { ...rec, status: e.target.value }
                        : rec
                    )
                  )
                }
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>

              <button onClick={() => updateAttendance(r)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Status:</strong> {r.status}</p>
              <button onClick={() => setEditingId(r.id)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
