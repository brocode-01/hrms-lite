import { useEffect, useState } from "react";
import API from "./api/api";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Employees
        employees={employees}
        refreshEmployees={fetchEmployees}
      />
      <Attendance employees={employees} />
    </>
  );
}
