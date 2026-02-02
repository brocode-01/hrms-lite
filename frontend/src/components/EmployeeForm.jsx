import { useState } from "react";
import API from "../api/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  const showError = (err, fallback) => {
    if (err.response?.data?.detail) {
      alert(err.response.data.detail);
    } else {
      alert(fallback);
    }
  };

  const submit = async () => {
    if (
      !form.employee_id.trim() ||
      !form.full_name.trim() ||
      !form.email.trim() ||
      !form.department.trim()
    ) {
      alert("All fields are mandatory");
      return;
    }
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await API.post("/employees", form);
      onSuccess();
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      alert("Employee added successfully");
    } catch (err) {
      showError(err, "Error adding employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add Employee</h2>

      <input
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={(e) =>
          setForm({ ...form, employee_id: e.target.value })
        }
      />

      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) =>
          setForm({ ...form, full_name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) =>
          setForm({ ...form, department: e.target.value })
        }
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Saving..." : "Add Employee"}
      </button>
    </div>
  );
}
