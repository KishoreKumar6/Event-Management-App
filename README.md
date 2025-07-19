# 🎉 Event Management Platform

A full-featured Event Management Platform built with the **MERN stack** (MongoDB, Express, React, Node.js), **TailwindCSS**, **Redux**, and **Cloudinary** for image uploads.

## 🚀 Live Demo

🌐 [Live App Link] : https://event-management-platform1.netlify.app/ 

---

## 📌 Features

### 👤 Authentication & Roles
- User/Admin login and registration
- JWT-based secure authentication
- Role-based dashboards

### 🛠 Admin Features
- Create, edit, delete events
- Upload event banners via Cloudinary
- View list of all created events
- Dashboard with event statistics

### 🎟 User Features
- Browse upcoming events
- Book tickets (with payment gateway)
- View past bookings
- Profile update

### 💻 Tech Stack

- **Frontend**: React.js, TailwindCSS, Redux Toolkit
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB (Mongoose)
- **Image Upload**: Cloudinary
- **Payment**: Stripe
- **Deployment**: Netlify (frontend), Render (backend)

---


## 🛠 Setup Instructions

cd client
npm install

cd ../server
npm install

Client: 
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CLOUDINARY_URL=your_cloudinary_upload_url

Server:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start

