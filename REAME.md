# 📝 TaskSpace — Minimal Task Management Web App

**Modern Minimalist (Eggshell White Theme) User ➔ Project ➔ Task** 

---

## ✨ Features

- **Authentication System:** สมัครสมาชิก / เข้าสู่ระบบด้วย JWT และเข้ารหัสรหัสผ่านด้วย `bcryptjs`
- **Project Management:** สร้าง ดู และลบโปรเจกต์ (พร้อมระบบ **Cascade Delete** ลบงานทั้งหมดในโปรเจกต์ให้อัตโนมัติ)
- **Task Management:** เพิ่มงาน สลับสถานะทำเสร็จแล้ว (Toggle Done) และลบงานแยกตามโปรเจกต์
- **Modern Minimal UI:** ดีไซน์โทนสีขาวไข่คลีนๆ (`#FAF9F6`) ด้วย Tailwind CSS
- **Responsive Layout:** ปรับเปลี่ยนรูปแบบ Sidebar / Main Workspace ตามขนาดหน้าจอมือถือและเดสก์ท็อป

---

## 🛠️ Tech Stack

| Component | Technology Used |
| :--- | :--- |
| **Frontend** | React (Vite), React Router v6, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Security** | JSON Web Token (JWT), Bcryptjs, CORS Middleware |

---

## 📁 Folder Structure

```text
taskspace/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Auth, Project, and Task controllers
│   ├── middleware/      # Auth protection middleware
│   ├── models/          # User, Project, and Task mongoose schemas
│   ├── routes/          # API endpoints definition
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── api.js       # Centralized Axios instance with Bearer Token interceptor
    │   ├── pages/       # Login, Register, and Dashboard pages
    │   ├── App.jsx      # Router configuration
    │   └── main.jsx     # App entry point
    └── tailwind.config.js
```

# 🚀 Getting Started

# Backend Setup
# 1. เข้าสู่โฟลเดอร์ backend
cd backend

# 2. ติดตั้ง Dependencies
npm install

# 3. ตั้งค่าไฟล์ .env
# สร้างไฟล์ .env ใน Root ของ backend แล้วระบุค่าดังนี้:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/taskspace
# JWT_SECRET=your_jwt_secret_key

# 4. เริ่มต้นทำงาน Server
npm run dev

# Frontend Setup
# 1. เข้าสู่โฟลเดอร์ frontend
cd frontend

# 2. ติดตั้ง Dependencies
npm install

# 3. สั่งรัน React (Vite)
npm run dev