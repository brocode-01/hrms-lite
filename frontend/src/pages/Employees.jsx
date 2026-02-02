import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function Employees({ employees, refreshEmployees }) {
  return (
    <div className="container">
      <h1>Employee Management</h1>

      <EmployeeForm onSuccess={refreshEmployees} />
      <EmployeeList
        employees={employees}
        refresh={refreshEmployees}
      />
    </div>
  );
}
