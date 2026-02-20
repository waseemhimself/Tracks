# Tracks – Full Stack Expense Tracker

## Overview

Tracks is a full-stack expense tracking application built with **React** and **Spring Boot**.

It supports:

- **JWT-based authentication**
- **Per-user data isolation**
- **Expense management (Create, Read, Update, Delete)**
- **Monthly insights with category breakdown**
- **Secure REST API design**
- **Frontend–backend integration**

This project demonstrates backend security practices, REST API design, and full-stack integration using modern tools.

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Recharts
- Fetch API

### Backend
- Spring Boot
- Spring Security
- JWT (io.jsonwebtoken)
- Spring Data JPA
- PostgreSQL
- Lombok

---

## How To Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/waseemhimself/Tracks.git
cd Tracks
```

---

### 2. Backend Setup

#### Requirements
- Java 17+
- PostgreSQL

#### Create Database

```sql
CREATE DATABASE tracks;
```

#### Configure `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tracks
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

#### Run Backend

Using Maven Wrapper:

```bash
./mvnw spring-boot:run
```

Or if Maven is installed:

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 3. Frontend Setup

```bash
cd tracks-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Documentation

Base URL:

```
http://localhost:8080/api
```

Example Endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/expenses`
- `POST /api/expenses`
- `PUT /api/expenses/{id}`
- `DELETE /api/expenses/{id}`

A Postman collection is included in the repository for testing all endpoints.

---

## Project Structure

```
Tracks
│
├── tracks-frontend/    # React frontend
├── src/                # Spring Boot backend source
├── pom.xml
└── README.md
```

---

## Key Concepts Demonstrated

- Stateless authentication using JWT
- Role-based security configuration
- Secure REST API development
- Entity–DTO separation
- Frontend–backend integration
- Data visualization using charts
