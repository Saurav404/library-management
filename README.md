# Library Management System Backend

This is a Library Management System Backend built using **Node.js, Express.js, and MongoDB** to manage books and users.

---

## 🚀 How to Set Up and Run This Project Locally

### ✅ Prerequisites
Before you start, make sure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **MongoDB** (Installed locally or using MongoDB Atlas)

---

### 🛠️ Step-by-Step Setup Guide

### 1️⃣ Clone the Repository

### 2️⃣ Install Dependencies
Inside the project folder, install all the required packages:
```sh
npm install
```

### 3️⃣ Create a `.env` File
You need an **environment file** to store important keys.
- Inside the **root folder**, create a new file named `.env`
- Add the following lines inside it:
  ```
  PORT=5000
  MONGO_URI=your_mongodb_connection_string/database
  JWT_SECRET=your_secret_key
  ```
  - Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `database` with your database name.
  - Replace `your_secret_key` with any secret string (used for authentication).

---

### 4️⃣ Start the Server
Now, start your server with:
```sh
npm run dev
```
You should see a message saying:
```
Server is running on port 5000
Connected to MongoDB
```
This means everything is working! 🎉

---

## 📝 How to Use the API (With Postman or Any API Client)

### 🔑 Authentication (Required for Borrowing and Returning Books)
Some routes require authentication. Follow these steps:
1. **Register a new user** using the `/api/users` endpoint.
2. **Login** using the `/api/users/login` endpoint.
3. You will receive a `token` in the response. Copy this token.
4. In Postman (or any API client), go to:
   - **Headers Section** → Add a key: `Authorization`
   - **Value** → Write: `Bearer YOUR_TOKEN_HERE`
5. Now, whenever you call protected endpoints, your token will be used for authentication.

## 🎉 Done!

