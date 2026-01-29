# Vaxify - Vaccine Management System (VMS)

## Project Overview

Vaxify is a comprehensive full-stack Vaccine Management System built as a monorepo application. It provides a complete solution for managing vaccination centers, appointments, inventory, and administrative workflows.

**Repository**: `/home/abhishek/Files/cdac/project/vms/vms-mono`

---

## Tech Stack

### Backend

- **Framework**: Spring Boot 3.x (Java)
- **Database**: MySQL
- **Authentication**: JWT-based authentication with Spring Security
- **Architecture**: RESTful API with layered architecture (Controller → Service → Repository)
- **Key Dependencies**:
  - Spring Data JPA
  - Spring Security
  - Lombok
  - MySQL Connector

### Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **UI Library**: Custom components with shadcn/ui
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React hooks (useState, useEffect)
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Notifications**: Sonner (toast notifications)

---

## Project Structure

```
vms-mono/
├── backend/                          # Spring Boot backend
│   └── src/main/java/com/vaxify/app/
│       ├── controller/              # REST API endpoints
│       ├── service/                 # Business logic layer
│       │   └── impl/               # Service implementations
│       ├── repository/              # JPA repositories
│       ├── entities/                # JPA entities
│       │   └── enums/              # Enum types
│       ├── dtos/                    # Data Transfer Objects
│       │   ├── appointment/
│       │   ├── auth/
│       │   ├── hospital/
│       │   ├── slot/
│       │   └── vaccine/
│       ├── security/                # JWT & Security config
│       ├── exception/               # Custom exceptions
│       └── config/                  # Application configuration
│
└── frontend/                        # React frontend
    └── src/
        ├── api/                     # API client layer
        ├── components/              # Reusable components
        │   ├── ui/                 # shadcn/ui components
        │   ├── auth/               # Authentication components
        │   ├── appointment/        # Appointment components
        │   ├── admin/              # Admin-specific components
        │   └── dashboards/         # Dashboard components
        │       ├── staff/
        │       ├── admin/
        │       └── user/
        ├── pages/                   # Page components
        │   ├── staff/
        │   ├── admin/
        │   └── user/
        ├── router/                  # React Router configuration
        ├── types/                   # TypeScript type definitions
        ├── constants/               # Constants and mock data
        ├── lib/                     # Utility functions
        └── hooks/                   # Custom React hooks
```

---

## User Roles & Features

### 1. **User (Public/Patient)**

- **Landing Page**: Modern, animated landing page with features showcase
- **Authentication**: Register/Login with email and password
- **Search & Browse**:
  - Search vaccination centers by location
  - Filter by vaccine type
  - View center details and available vaccines
- **Appointment Booking**:
  - Select center, vaccine, date, and time slot
  - View booking confirmation
  - Manage appointments (view, cancel)
- **Dashboard**: View all appointments with status tracking

### 2. **Staff (Hospital/Center Staff)**

- **Authentication**: Login with staff credentials
- **Dashboard**:
  - Real-time statistics (total appointments, upcoming, today's bookings, low stock alerts)
  - Recent appointments overview
  - Charts and analytics
  - Staggered animation on page load
- **Vaccine Inventory Management**:
  - View all vaccines with stock levels
  - Add new vaccines
  - Update stock quantities
  - Delete vaccines
  - Low stock alerts (< 20% capacity)
- **Slot Management**:
  - Create individual time slots
  - Bulk create slots (multiple dates, days of week)
  - View all slots with booking status
  - Delete slots
  - Capacity limited to max 10 per slot
- **Appointment Management**:
  - View all appointments in table format
  - Filter by status (UPCOMING, COMPLETED, CANCELLED)
  - Mark appointments as completed
  - Cancel appointments
  - Real-time data from backend
- **Hospital Profile**:
  - View hospital details
  - Edit hospital information
  - Upload/view documents
  - View verification status
- **Profile Management**: View and manage staff profile

### 3. **Admin**

- **Authentication**: Login with admin credentials
- **Dashboard**: System-wide statistics and overview
- **Hospital Management**:
  - View all registered hospitals
  - Filter by verification status (PENDING, APPROVED, REJECTED)
  - View detailed hospital information
  - Approve/Reject hospital registrations
  - Staggered page load animations
- **System Monitoring**: Track overall system health and activity

---

## Key Backend Entities

### User

```java
- id (Long)
- name (String)
- email (String, unique)
- password (String, encrypted)
- phone (String)
- role (UserRole: USER, STAFF, ADMIN)
```

### Hospital/Center

```java
- id (Long)
- name (String)
- address (String)
- city (String)
- state (String)
- pincode (String)
- documentUrl (String)
- status (HospitalStatus: PENDING, APPROVED, REJECTED)
- user (User, OneToOne)
```

### Vaccine

```java
- id (Long)
- name (String)
- type (String)
- manufacturer (String)
- stock (Integer)
- capacity (Integer)
- center (Center, ManyToOne)
- lastUpdated (LocalDateTime)
```

### Slot

```java
- id (Long)
- center (Center, ManyToOne)
- date (LocalDate)
- startTime (LocalTime)
- endTime (LocalTime)
- capacity (Integer, max 10)
- bookedCount (Integer)
- status (SlotStatus: AVAILABLE, FULL)
```

### Appointment

```java
- id (Long)
- user (User, ManyToOne)
- slot (Slot, ManyToOne)
- vaccine (Vaccine, ManyToOne)
- status (AppointmentStatus: BOOKED, COMPLETED, CANCELLED)
- createdAt (LocalDateTime)
```

---

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - User registration
- `POST /login` - User login (returns JWT token)

### Users (`/api/users`)

- `GET /me` - Get current user profile

### Hospitals (`/api/hospitals`)

- `GET /` - Get all hospitals
- `GET /{id}` - Get hospital by ID
- `POST /register` - Register new hospital
- `GET /my` - Get logged-in staff's hospital
- `PUT /my` - Update hospital details
- `GET /admin/hospitals` - Admin: Get all hospitals
- `PUT /admin/hospitals/approve/{id}` - Admin: Approve hospital
- `PUT /admin/hospitals/reject/{id}` - Admin: Reject hospital

### Vaccines (`/api/vaccines`)

- `GET /` - Get all vaccines
- `GET /staff` - Get vaccines for staff's hospital
- `POST /staff` - Add new vaccine
- `PUT /staff/{id}` - Update vaccine stock
- `DELETE /staff/{id}` - Delete vaccine

### Slots (`/api/slots`)

- `GET /hospital/{hospitalId}` - Get slots by hospital
- `GET /available` - Get available slots (with filters)
- `POST /` - Create slot
- `POST /bulk` - Bulk create slots
- `DELETE /{id}` - Delete slot

### Appointments (`/api/appointments`)

- `POST /book` - Book appointment
- `GET /my` - Get user's appointments
- `GET /hospital/{hospitalId}` - Get hospital's appointments
- `PATCH /{id}/cancel` - Cancel appointment
- `PATCH /{id}/complete` - Mark appointment as complete

---

## Frontend Architecture

### API Configuration

- **Location**: `/frontend/src/api/api.config.ts`
- **Mock Mode**: `USE_MOCKS` flag for development without backend
- **Base URL**: Configurable API base URL

### API Clients

Each domain has its own API client:

- `auth.api.ts` - Authentication
- `hospital.api.ts` - Hospital operations
- `vaccine.api.ts` - Vaccine management
- `slots.api.ts` - Slot management
- `appointment.api.ts` - Appointment booking

### Routing Structure

```
/ - Landing page
/login - Login page
/register - Registration page

/user/* - User dashboard (protected)
  /dashboard - User dashboard
  /appointments - My appointments
  /search - Search centers
  /centers/:id - Center details
  /book/:centerId - Booking flow

/staff/* - Staff dashboard (protected)
  /dashboard - Staff dashboard
  /vaccines - Vaccine inventory
  /slots - Slot management
  /appointments - Appointment management
  /hospital - Hospital profile
  /alerts - Low stock alerts
  /profile - Staff profile

/admin/* - Admin dashboard (protected)
  /dashboard - Admin dashboard
  /hospitals - Hospital management
  /hospitals/:id - Hospital details
```

### Authentication Flow

1. User logs in via `/login`
2. Backend returns JWT token
3. Token stored in localStorage
4. Axios interceptor adds token to all requests
5. Protected routes check for token
6. Role-based redirects to appropriate dashboard

### Design System

- **Colors**: Custom color palette with HSL values
- **Typography**: Inter font family
- **Spacing**: Tailwind spacing scale
- **Components**: shadcn/ui components (Button, Card, Table, Dialog, etc.)
- **Animations**:
  - Page transitions: `animate-in fade-in slide-in-from-bottom-4 duration-500`
  - Staggered children: Framer Motion variants
  - Hover effects and micro-interactions

---

## Key Features & Implementation Details

### 1. **Slot Capacity Limitation**

- Maximum 10 doses per slot (enforced in both frontend and backend)
- Input validation with max attribute
- Visual feedback when limit reached

### 2. **Bulk Slot Creation**

- Create slots for multiple dates
- Select specific days of week
- Single time range and capacity for all slots
- Validation to prevent past dates

### 3. **Appointment Status Flow**

```
BOOKED → COMPLETED (staff action)
BOOKED → CANCELLED (user or staff action)
```

- Backend status normalized to frontend (BOOKED → UPCOMING)

### 4. **Low Stock Alerts**

- Critical: < 20% capacity (red badge)
- Warning: 20-40% capacity (orange badge)
- Dedicated alerts page for staff

### 5. **Real-time Dashboard Statistics**

- Total appointments count
- Upcoming appointments (status-based filter)
- Today's bookings (date-based filter)
- Low stock count (< 20% threshold)
- Parallel API calls for performance

### 6. **Toast Notifications**

- Success: Green background (#e7f9ed, #0f7a28)
- Error: Red background (#ffe5e5, #b00000)
- Consistent styling across all pages

### 7. **Animations**

- **Page Load**: All staff pages use identical animation
- **Dashboard**: Staggered children with Framer Motion
- **Stats Grid**: Cards animate in sequence
- **Lists**: Smooth transitions on data changes

---

## Database Schema Notes

### Relationships

- User ↔ Hospital: OneToOne (staff user owns hospital)
- Hospital ↔ Vaccine: OneToMany
- Hospital ↔ Slot: OneToMany
- User ↔ Appointment: OneToMany
- Slot ↔ Appointment: OneToMany
- Vaccine ↔ Appointment: OneToMany

### Constraints

- Email: Unique
- Slot capacity: Max 10
- Appointment: Cannot exceed slot capacity
- Dates: No past dates for slots/appointments

---

## Environment Configuration

### Backend (`application.properties`)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vaxify_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
jwt.secret=${JWT_SECRET}
```

### Frontend (`.env`)

```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_MOCKS=false
```

---

## Development Workflow

### Backend

```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Current Status

### ✅ Completed Features

- Full authentication system (JWT)
- User registration and login
- Landing page with animations
- User dashboard and appointment booking
- Staff dashboard with real-time stats
- Vaccine inventory management (CRUD)
- Slot management (create, bulk create, delete)
- Appointment management (view, complete, cancel)
- Hospital profile management
- Admin hospital verification workflow
- Low stock alerts
- Responsive design
- Consistent animations across all pages
- Toast notifications with custom styling

### 🎯 Ready for Deployment

All core features are implemented and tested. The application is ready for:

- Docker containerization
- AWS EC2 deployment
- Production database setup
- Environment variable configuration

---

## Important Notes

1. **Status Mapping**: Backend uses "BOOKED" status, frontend normalizes to "UPCOMING" for consistency
2. **ID Types**: Backend uses Long, frontend converts to String for consistency
3. **Date Format**: Backend uses LocalDate/LocalTime, frontend uses ISO strings
4. **Capacity Limit**: Hardcoded to 10 per slot (business requirement)
5. **Mock Data**: Frontend has mock data fallback when `USE_MOCKS=true`
6. **Animation Consistency**: All staff pages use `animate-in fade-in slide-in-from-bottom-4 duration-500`

---

## Common Commands

### Backend

```bash
# Build
./mvnw clean install

# Run
./mvnw spring-boot:run

# Run tests
./mvnw test
```

### Frontend

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

---

## Future Enhancements (Optional)

- Email notifications (JavaMail integration)
- PDF certificate generation
- SMS notifications
- Advanced analytics and reporting
- Multi-language support
- Mobile app (React Native)
- QR code for appointment verification

---

**Last Updated**: January 30, 2026
**Version**: 1.0.0
**Status**: Production Ready
