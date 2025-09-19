# Upright Insight 🪑✨  
*A Computer Vision–Powered Sitting Posture Correction System*

---

## 📖 Overview
Upright Insight is a **real-time sitting posture correction application** built with **React (frontend)** and **Node.js (backend)**.  
The system uses **computer vision and AI posture detection** to help users develop healthier sitting habits by providing **instant feedback** when poor posture is detected.  

This project was developed as part of a **B.Sc. Computer Science Capstone** at the **Accra Institute of Technology (AIT)**.

---

## 🚀 Features
- **Live Video Capture**: Uses the webcam to monitor sitting posture.  
- **Real-Time Feedback**: Alerts users with on-screen indicators (and optional sound) when posture is incorrect.  
- **Dashboard & Analytics**: View posture history, improvement trends, and posture scores over time.  
- **Settings Panel**:  
  - Adjust posture detection sensitivity.  
  - Configure alert preferences (visual, audio).  
  - Enable dark/light mode.  
- **Authentication**: Secure login & user-specific data (via JWT).  
- **Responsive UI**: Works seamlessly across desktop and mobile devices.  

---

## 🛠️ Tech Stack

### Frontend
- **React + Vite**
- **TailwindCSS** (styling)
- **Chart.js / Recharts** (data visualization)
- **Axios** (API integration)

### Backend
- **Node.js + Express**
- **JWT Authentication**
- **PostgreSQL / SQLite** (user & posture logs)

### AI / Computer Vision
- **MediaPipe / TensorFlow.js** (browser-based pose estimation)  
- *(Optional)* Python service with TensorFlow / OpenCV for advanced posture analysis  

---

## 📂 Project Structure
```bash
upright-insight/
├── frontend/         # React + Vite app
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Video, Dashboard, Settings
│   │   ├── services/     # API calls
│   │   └── App.jsx
│   └── package.json
│
├── backend/          # Node.js + Express API
│   ├── routes/       # API endpoints
│   ├── models/       # Database models
│   ├── server.js
│   └── package.json
│
└── README.md
