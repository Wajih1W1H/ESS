# 🛒 Electronic Shop Management System (ESS)

##  Overview

Electronic Shop Management System (ESS) is a multi-tenant backend API developed in **Go** for managing multiple electronic stores.

The system supports:

- Multi-store data isolation
- Role-based access control (SuperAdmin, Admin, Guest)
- Product management
- Transaction management
- JWT authentication
- Secure password hashing (bcrypt)
- Public and private API routes

This project was developed for academic purposes.

---

##  Tech Stack

- **Backend:** Go (Golang)
- **Database:** PostgreSQL (Local installation)
- **Authentication:** JWT
- **Password Security:** bcrypt
- **API Testing:** Postman
- **Version Control:** Git

---

## Project Structure

```
ESS/
│
├── electronic-shop-api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── main.go
│
├── electronic-shop-frontend/   (if applicable)
│
└── README.md
```

---

##  Prerequisites

Before running the project, make sure you have installed:

- Go 1.21 or higher
- PostgreSQL (running locally)
- Git

Check installations:

```bash
go version
psql --version
git --version
```

---

## 🗄 Database Setup (Local PostgreSQL)

### 1️ Start PostgreSQL

Make sure PostgreSQL service is running.

### 2️ Create Database

Open terminal and run:

```bash
psql -U postgres
```

Then create database:

```sql
CREATE DATABASE ess_db;
```

Exit:

```sql
\q
```

##  Installation & Running the Project

### 1 Clone the Repository

```bash
git clone https://github.com/Wajih1W1H/ESS.git
cd ESS
```

---

### 2 Run Backend

```bash
cd electronic-shop-api
go mod tidy
go run main.go
```

If successful, server should start at:

```
http://localhost:8081
```
### 3 Run Frontend

```bash
cd electronic-shop-frontend
npm install
npm start
```
---

##  Main Features

- User registration & login
- Role-based authorization
- Store management
- Product CRUD operations
- Transaction handling
- Secure password hashing
- JWT-based session management

---

##  Security Implementation

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Role-based access restrictions
- Database isolation per store

---

## Academic Context

This project demonstrates:

- Backend API development using Go
- RESTful architecture
- Database integration with PostgreSQL
- Authentication & authorization mechanisms
- Multi-tenant application design

---

##  Author

Developed by: Wajih HAOUECH  
Academic Project – 2026

---

##  License

This project is intended for educational use only.
