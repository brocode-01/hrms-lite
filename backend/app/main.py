from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from app.database import employee_collection, attendance_collection
from app.schemas import EmployeeCreate, AttendanceCreate
from app.models import employee_serializer, attendance_serializer
from datetime import datetime

app = FastAPI(title="HRMS Lite API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/employees")
async def add_employee(emp: EmployeeCreate):
    if await employee_collection.find_one({
        "$or": [
            {"employee_id": emp.employee_id},
            {"email": emp.email}
        ]
    }):
        raise HTTPException(status_code=409, detail="Employee already exists")

    await employee_collection.insert_one(emp.dict())
    return {"message": "Employee added successfully"}

@app.get("/employees")
async def get_employees():
    employees = []
    async for emp in employee_collection.find():
        employees.append(employee_serializer(emp))
    return employees

@app.delete("/employees/{emp_id}")
async def delete_employee(emp_id: str):
    result = await employee_collection.delete_one({"employee_id": emp_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted"}

@app.post("/attendance")
async def mark_attendance(att: AttendanceCreate):
    if not await employee_collection.find_one({"employee_id": att.employee_id}):
        raise HTTPException(status_code=404, detail="Employee not found")
    if await attendance_collection.find_one({
        "employee_id": att.employee_id,
        "date": att.date.isoformat()  
    }):
        raise HTTPException(status_code=409, detail="Attendance already marked")

    attendance_data = {
        "employee_id": att.employee_id,
        "date": att.date.isoformat(),  
        "status": att.status
    }

    await attendance_collection.insert_one(attendance_data)
    return {"message": "Attendance marked"}
@app.get("/attendance/{employee_id}")
async def get_attendance(employee_id: str):
    records = []
    async for att in attendance_collection.find({"employee_id": employee_id}):
        records.append(attendance_serializer(att))
    return records
@app.put("/attendance")
async def update_attendance(att: AttendanceCreate):
    result = await attendance_collection.update_one(
        {
            "employee_id": att.employee_id,
            "date": att.date.isoformat()
        },
        {
            "$set": {
                "status": att.status
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Attendance record not found"
        )

    return {"message": "Attendance updated successfully"}

