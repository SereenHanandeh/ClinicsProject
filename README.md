
# 🏥 Medical Appointment System - Full Stack Web Application

---

## 📖 Table of Contents
- [✨ About](#-about)  
- [👥 Team Members](#-team-members)  
- [🚀 Features](#-features)  
- [🖼️ Screenshots](#-screenshots)  
- [🛠️ Technologies Used](#-technologies-used)  
- [⚙️ Installation](#-installation)  
- [📂 Project Structure](#-project-structure)  
- [🔐 Authentication & Guards](#-authentication--guards)  
- [🧑‍⚕️ User Roles](#-user-roles)  
- [💾 API (db.json)](#-api-dbjson)  
- [🚧 TODO & Improvements](#-todo--improvements)  

---

## 👥 Team Members
- **Sereen Hanandeh** – Admin & Doctor  
- **Raneem Albader** – Patient  

---

## ✨ About
Medical Appointment System is a simple full-stack web application designed to manage medical appointment booking and administration, including management of doctors, clinics, drugs, and diagnoses. It features a multi-role access system with Admin, Doctor, and Patient roles.

The project is built with:
- Angular (frontend)
- json-server (Mock Backend API)

---

## 🚀 Features

### 👩‍⚕️ Admin Dashboard
- Add new clinics  
- Add new doctors and assign them to clinics  
- Add new drugs and diagnoses  
- View all clinics, doctors, drugs, and diagnoses  
- Edit and delete doctors  

### 👨‍⚕️ Doctor Dashboard
- View personal appointments  
- Manage patient medical records  
- View and update doctor profile  

### 🧑‍💻 Patient Dashboard
- Browse doctors by clinics  
- Book appointments  
- View booked appointments  
- Update personal profile  

### General Features
- User authentication and registration  
- Route guards with role-based access control  
- Token storage in localStorage  
- Beautiful animated 404 page  
- Modern, responsive UI design  

---

## 🖼️ Screenshots

### 🏠 Home Page
![image](https://github.com/user-attachments/assets/aba32f71-02a7-417d-bf30-7eb4ed9794f9)

###Login Page
![image](https://github.com/user-attachments/assets/fd55b45a-64e9-4dd4-a732-5aec5ef31777)

###Register Page
![image](https://github.com/user-attachments/assets/07d1330c-4e96-43ac-951c-66fcdaa7ed32)


---

## 🛠️ Technologies Used
- Angular 17  
- TypeScript  
- RxJS  
- SCSS  
- json-server  

---

## ⚙️ Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/medical-appointment-system.git
   cd medical-appointment-system
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Start json-server  
   ```bash
   json-server --watch db.json --port 3000
   ```

4. Run Angular application  
   ```bash
   npm start
   ```

---

## 📂 Project Structure

```
src/
├── core/
│   ├── services/
│   ├── guards/
├── layouts/
│   ├── admin-layout/
│   ├── doctor-layout/
│   ├── patient-layout/
├── pages/
│   ├── admin/
│   ├── doctor/
│   ├── patient/
│   ├── auth/
│   ├── home/
│   ├── not-found/
├── assets/
│   ├── images/
│   ├── styles/
└── environments/
db.json (Mock API)
```

---

## 🔐 Authentication & Guards

- User authentication handled via `AuthService`
- Token and `userType` stored in `localStorage`
- Route guards (`authGuard`) verify token presence and enforce role-based access:
  - If `userType === 'admin'` → redirect to `/admin/dashboard`
  - If `userType === 'doctor'` → redirect to `/doctor/dashboard`
  - If `userType === 'patient'` → redirect to `/patient/dashboard`

---

## 🧑‍⚕️ User Roles

| Role    | Permissions                        |
|---------|----------------------------------|
| Admin   | Full system management            |
| Doctor  | Manage own profile & appointments |
| Patient | Book appointments & manage profile |

---

## 💾 API (db.json)

```json
{
  "users": [],
  "appointments": [],
  "clinics": [],
  "doctors": [],
  "drugs": [],
  "diagnoses": []
}
```

---

## 🚧 TODO & Improvements
- ✅ Add pagination for data lists  
- ✅ Improve mobile responsiveness  
- ✅ Enhance appointment booking user experience  
- ✅ Use Lottie animation for 404 page  
- ✅ Optimize performance with Lazy Loading  

---

✨ Developed with ❤️ by Sereen Hanandeh  
