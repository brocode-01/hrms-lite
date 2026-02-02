import API from "../api/api";

export default function EmployeeList({ employees, refresh }) {
  const remove = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    await API.delete(`/employees/${id}`);
    refresh();
  };

  if (employees.length === 0) {
    return <p>No employees added yet.</p>;
  }

  return (
    <>
      {employees.map(emp => (
        <div key={emp.id} className="card">
          <strong>{emp.full_name}</strong>
          <p>{emp.employee_id} • {emp.department}</p>
          <p>{emp.email}</p>
          <button onClick={() => remove(emp.employee_id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
