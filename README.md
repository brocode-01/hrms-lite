# HRMS Lite – Full Stack Application

## 📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System built as a full-stack web application.  
The system is designed for a single admin user to manage employee records and track daily attendance.

The application focuses on essential HR operations with a clean, professional UI and a stable backend.  
It supports employee management, attendance tracking, validations, and persistent storage using a database.

This project demonstrates end-to-end full-stack development including frontend, backend APIs, database integration, error handling, and deployment.

---

## 🛠 Tech Stack Used

### Frontend
- **React (Vite)**
- **JavaScript**
- **HTML5**
- **CSS**
- **Axios** (API communication)

### Backend
- **FastAPI (Python)**
- **Uvicorn** (ASGI server)

### Database
- **MongoDB Atlas**
- **Motor (Async MongoDB Driver)**

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas

---

## ⚙️ Steps to Run the Project Locally

### 🔹 Prerequisites
- Node.js (v18 or later)
- Python (v3.12 recommended)
- MongoDB Atlas account or local MongoDB
- Git

---

### 🔹 Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
2. Create and activate virtual environment:
    python -m venv venv
    source venv/bin/activate   # Mac/Linux
    venv\Scripts\activate      # Windows
3. Install dependencies:
    pip install -r requirements.txt
4. Create .env file:
    MONGO_URI=your_mongodb_connection_string
5. Run backend server:
   uvicorn app.main:app --reload
6. Backend will be available at:
    http://localhost:8000
    <br>
    Swagger Docs:http://localhost:8000/docs
### 🔹 Frontend Setup
1. Navigate to frontend directory:
   cd frontend
2. Install dependencies:
   npm install
3. Start development server:
   npm run dev
4. Frontend will be available at:
   http://localhost:5173
---

### 📋 Features Implemented
### Employee Management
Add new employee
View all employees
Delete employee
Duplicate employee prevention
Email format validation

### Attendance Management
Mark attendance (Present / Absent)
Prevent future date selection
Prevent duplicate attendance per day
View attendance records per employee
Edit attendance records
Display total present days per employee

### UI/UX
Clean and professional layout
Loading, empty, and error states
Reusable components
Responsive design
Accessibility 

### ⚠️ Assumptions & Limitations
Single admin user (no authentication implemented)
No role-based access control
   
