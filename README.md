# ProjectMan - Project Management API

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A full-stack project management application with authentication and CRUD operations for tracking projects.

## Table of Contents

- [Gallery](#gallery)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Contact](#contact)

**Live Demo**: [projectman.up.railway.app](https://projectman.up.railway.app)

## Gallery

| ![Login Interface](screenshots/login.png) | ![Project Dashboard](screenshots/dashboard.png) |
| ----------------------------------------- | ----------------------------------------------- |
| **Authentication Interface**              | **Project Management Dashboard**                |

| ![Light Theme](screenshots/light.png) | ![Mobile View](screenshots/mobile.png) |
| ------------------------------------- | -------------------------------------- |
| **Light Theme Interface**             | **Responsive Mobile Interface**        |

## Features

- **User Authentication**
  - JWT-based authentication with cookies
  - Login/Register functionality
  - Protected routes
- **Project Management**
  - Create projects with title, description, difficulty level
  - Track creation dates
  - Update/Delete projects
- **Technical Features**
  - REST API with Express.js
  - MongoDB database
  - React frontend with Vite
  - CORS security configuration
  - Rate limiting & security headers

## Technologies

**Frontend**:

- React
- Vite
- Tailwind CSS
- Axios

**Backend**:

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cookie-parser
- Security Middlewares (Helmet, xss-clean, express-rate-limit)

## Installation

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Git

### Backend Setup

1. Clone repository:
   ```bash
   git clone https://github.com/PreZko/Projects-API-Full-Stack.git
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=your_port
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```bash
   VITE_API_URL=http://localhost:5000/api/v1
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## API Reference

### Authentication

| Endpoint         | Method | Description       | Request Body                    |
| ---------------- | ------ | ----------------- | ------------------------------- |
| `/auth/register` | POST   | Register new user | `{ username, email, password }` |
| `/auth/login`    | POST   | User login        | `{ email, password }`           |
| `/auth/logout`   | POST   | User logout       | -                               |

### Projects

| Endpoint        | Method | Description           | Protected | Parameters                           |
| --------------- | ------ | --------------------- | --------- | ------------------------------------ |
| `/projects`     | GET    | Get all projects      | ✔️        | -                                    |
| `/projects`     | POST   | Create new project    | ✔️        | `{ title, description, difficulty }` |
| `/projects/:id` | GET    | Get a single projects | ✔️        | -                                    |
| `/projects/:id` | PATCH  | Update project        | ✔️        | `{ title, description, difficulty }` |
| `/projects/:id` | DELETE | Delete project        | ✔️        | -                                    |

**Example Request**:

```javascript
// Get all projects
fetch('/api/v1/projects', {
  method: 'GET',
  credentials: 'include',
})

// Create project
fetch('/api/v1/projects', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify({
    title: 'New Project',
    description: 'Project description',
    difficulty: 3,
  }),
})
```

## Deployment

Deployed on [Railway.app](https://railway.app) with production-grade configuration:

- **Frontend**: Static site deployment with automatic CI/CD
- **Backend**: Node.js service with MongoDB integration
- **Security**:
  - CORS restricted to production domain
  - Rate limiting (1000 requests/15 minutes)
  - Security headers via Helmet
  - XSS protection

**Environment Variables**:

```env
VITE_API_URL=https://prezkoprojects.up.railway.app/api/v1
MONGO_URI=mongodb+srv://[user]:[password]@cluster0.mongodb.net/projectman?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

## Contact

If you'd like to connect or have any questions, feel free to reach out:

- **Email**: presiyan_bankov@gmail.com
- **LinkedIn**: [Presiyan Bankov](https://linkedin.com/in/presiyan-bankov)
- **GitHub**: [PreZko](https://github.com/prezko)
