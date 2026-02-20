Tracks – Full Stack Expense Tracker
Overview

Tracks is a full-stack expense tracking application built with React and Spring Boot.
It supports secure JWT-based authentication, per-user data isolation, expense management, and monthly insights with category breakdowns.

The application demonstrates backend security practices, REST API design, and frontend-backend integration.


Tech Stack

Frontend:
React (Vite)
React Router
Recharts
Fetch API

Backend:
Spring Boot
Spring Security
JWT (io.jsonwebtoken)
Spring Data JPA
PostgreSQL
Lombok


How To Run Locally

1. Clone the repository
git clone <https://github.com/waseemhimself/Tracks.git>
cd Tracks

2. Backend Setup
Requirements:
Java 17+ (or your current version)
PostgreSQL

Create database:
CREATE DATABASE tracks;

Configure application.properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/tracks
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

Run backend 
(Runs on http://localhost:8080)

3.Frontend Setup
cd tracks-frontend
npm install
npm run dev
(Runs onhttp://localhost:5173)


API Documentation

Base URL: http://localhost:8080/api
Check Postman Collection included in the repository.
