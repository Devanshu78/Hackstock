# HackStock Monorepo

A full-stack project management and bidding platform for students and teachers, built with **React**, **Next.js**, **Node.js/Express**, **MongoDB**, **Redis**, **BullMQ**, and **Docker**.

This monorepo contains four main applications:
- **Client** - Student portal (React + Vite)
- **Admin** - Teacher/Admin portal (React + Vite)
- **Server** - Backend API (Node.js + Express)
- **Landing** - Marketing website (Next.js)

---

## 📁 Project Structure

```
hackstock/
├── client/           # React app for students (Vite)
├── admin/            # React app for teachers/admins (Vite)
├── server/           # Node.js/Express backend API
├── landing/          # Next.js landing page
├── docker-compose.yml
└── eslint.config.js
```

---

## ✨ Features

- **Student Portal:** Project upload, bidding, dashboard, notifications, and profile management
- **Admin Portal:** Project verification, bidding management, results, and user management
- **Real-Time Bidding:** Powered by Socket.io and BullMQ
- **Authentication:** JWT-based secure login for students and teachers
- **File Uploads:** Integrated with Cloudinary
- **Caching:** Redis-powered caching for improved performance
- **Production-Ready:** Dockerized with Nginx reverse proxy

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, Vite, Zustand, React Router, TailwindCSS |
| **Landing** | Next.js 15, TypeScript, Shadcn UI |
| **Backend** | Node.js, Express, Mongoose, Socket.io, BullMQ |
| **Database** | MongoDB Atlas |
| **Cache/Queue** | Redis, BullMQ |
| **DevOps** | Docker, Docker Compose, Nginx |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Cloudinary](https://cloudinary.com/) account

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Devanshu78/Hackstock.git
   cd Hackstock
   ```

2. **Install dependencies for each app:**
   ```bash
   # Server
   cd server && npm install && cd ..
   
   # Client
   cd client && npm install && cd ..
   
   # Admin
   cd admin && npm install && cd ..
   
   # Landing
   cd landing && npm install && cd ..
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in each folder
   - Fill in your secrets (see [Environment Variables](#environment-variables))

4. **Start Redis (if not using Docker):**
   ```bash
   docker run --name dev-redis -p 6379:6379 redis:7
   ```

5. **Run apps in development mode:**
   ```bash
   # Terminal 1 - Server
   cd server && npm run dev
   
   # Terminal 2 - Client
   cd client && npm run dev
   
   # Terminal 3 - Admin
   cd admin && npm run dev
   
   # Terminal 4 - Landing
   cd landing && npm run dev
   ```

6. **Access the apps:**
   | App | URL |
   |-----|-----|
   | Client | http://localhost:5173 |
   | Admin | http://localhost:5174 |
   | Server API | http://localhost:8000 |
   | Landing | http://localhost:3000 |

---

## 🔐 Environment Variables

### `server/.env`
```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net
DBNAME=hackstock
REDIS_HOST=localhost
REDIS_PORT=6379
CLOUDINARY_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
ACCESS_TOKEN_SECRET=...
CORS_ORIGIN_1=http://localhost:5173
CORS_ORIGIN_2=http://localhost:5174
```

### `client/.env`
```env
VITE_SERVER_URL=http://localhost:8000/api/v1/user
```

### `admin/.env`
```env
VITE_SERVER_URL=http://localhost:8000/api/v1/admin
```

---

## 🐳 Docker Usage

### Build and Run All Services
```bash
docker-compose -p hackstock up --build -d
```

### Access Docker Apps
| App | URL |
|-----|-----|
| Client | http://localhost:3000 |
| Admin | http://localhost:3001 |
| Server API | http://localhost:8000 |

### Useful Commands
```bash
# View logs
docker-compose -p hackstock logs -f

# Stop all services
docker-compose -p hackstock down

# Rebuild fresh
docker-compose -p hackstock up --build -d
```

---

## 🌐 Deployment

| App | Platform |
|-----|----------|
| Client | Vercel |
| Admin | Vercel |
| Landing | Vercel |
| Server | AWS EC2 |

See [EC2 Deployment Guide](./docs/ec2-deployment.md) for backend deployment instructions.

---

## 📄 License

This project is licensed under the ISC License.

---

**Made with ❤️ by Devanshu Pandey**
