import { useState } from "react";
import API from "../api/api";

export default function AttendanceForm({ employees, onSuccess }) {
  const [data, setData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const today = new Date().toISOString().split("T")[0];

  const showError = (err, fallback) => {
    if (err.response?.data?.detail) {
      alert(err.response.data.detail);
    } else {
      alert(fallback);
    }
  };

  const submit = async () => {
    if (!data.employee_id) {
      alert("Please select an employee");
      return;
    }

    if (!data.date) {
      alert("Please select a date");
      return;
    }
    if (data.date > today) {
      alert("Future dates are not allowed for attendance");
      return;
    }

    try {
      await API.post("/attendance", data);
      alert("Attendance marked successfully");
      onSuccess(data.employee_id);

      setData({
        employee_id: "",
        date: "",
        status: "Present",
      });
    } catch (err) {
      showError(err, "Error marking attendance");
    }
  };

  return (
    <div className="card">
      <h2>Mark Attendance</h2>

      <label>
        Employee
        <select
          value={data.employee_id}
          onChange={(e) =>
            setData({ ...data, employee_id: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.employee_id} value={emp.employee_id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input
          type="date"
          value={data.date}
          max={today}
          onChange={(e) =>
            setData({ ...data, date: e.target.value })
          }
        />
      </label>

      <label>
        Status
        <select
          value={data.status}
          onChange={(e) =>
            setData({ ...data, status: e.target.value })
          }
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </label>

      <button onClick={submit}>Submit</button>
    </div>
  );
}
