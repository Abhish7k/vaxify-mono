# Vaxify - Vaccine Management System

Vaxify is a comprehensive web-based platform designed to streamline the vaccine management and appointment booking process. It serves as a centralized hub for hospitals to manage their vaccine stock and for users to book vaccination slots seamlessly.

## 🚀 Features

### User Features (Public)

- **User Registration & Authentication**: Secure sign-up and login functionality.
- **Center Search**: Browse and search for vaccination centers by location.
- **Slot Booking**: View available time slots and book appointments.
- **Appointment Management**: View booking status/history and cancel appointments.

### Hospital Staff Features

- **Registration**: Request hospital registration for admin approval.
- **Dashboard**: Overview of daily appointments and stock.
- **Hospital Profile**: Manage and update hospital details.
- **Vaccine Management**: Add, update, and delete vaccine stocks.
- **Low Stock Alerts**: Automated email alerts to notify staff when vaccine inventory is running low (below 40% and 20%).
- **Appointment Operations**: View hospital appointments and mark them as completed.

### Admin Features

- **Dashboard**: View system-wide statistics.
- **Hospital Management**:
  - View all registered and pending hospitals.
  - Approve or reject hospital registration requests.
  - Delete hospital records.
- **User Management**:
  - View list of all registered users.
  - Delete users if necessary.

### Technical Features

- **Role-Based Access Control**: Secure endpoints for Admins, Users, and specialized roles.
- **Email Notifications**: Automated confirmations for bookings.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠 Tech Stack

### Frontend

- **Framework**: React.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **Deployment**: Vercel

### Backend

- **Framework**: Java Spring Boot
- **Build Tool**: Maven
- **Database**: MySQL (AWS RDS)
- **File Storage**: AWS S3
- **Security**: Spring Security + JWT

### DevOps & Infrastructure

- **Containerization**: Docker
- **Reverse Proxy**: Traefik
- **Cloud Provider**: AWS EC2
- **DNS & CDN**: Cloudflare

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18+)
- Java JDK 17+
- Maven
- Docker & Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/Abhish7k/vaxify-mono.git
cd vaxify-mono
```

### 2. Environment Variables

Create a `.env` file in the root directory and configure the following variables (refer to `.env.example`):

```env
DB_HOST=your_db_host
DB_PORT=3306
DB_NAME=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
...
```

### 3. Running with Docker (Recommended)

This will start the backend and Traefik proxy.

```bash
docker-compose up --build -d
```

### 4. Running Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

### 5. Running Backend Locally

```bash
cd backend
./mvnw spring-boot:run
```

## 👥 Meet the Team

| Name         | Role / Contribution | GitHub                                        |
| ------------ | ------------------- | --------------------------------------------- |
| **Abhishek** | Frontend & DevOps   | [@username](https://github.com/Abhish7k)      |
| **Indu**     | Backend & Database  | [@username](https://github.com/indu61)        |
| **Rahul**    | Frontend & UI       | [@username](https://github.com/rahulkhadeeng) |
