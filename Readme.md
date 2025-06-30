# Vidyut Bhandar Monorepo

A full-stack project management and bidding platform for students and teachers, built with **React**, **Node.js/Express**, **MongoDB**, **Redis**, **BullMQ**, and **Docker**.  
This monorepo contains three main applications: **Client** (student portal), **Admin** (teacher/admin portal), and **Server** (backend API).

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Docker Usage](#docker-usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Student Portal:** Project upload, bidding, dashboard, notifications, and profile management.
- **Admin Portal:** Project verification, bidding management, results, and user management.
- **Real-Time Bidding:** Powered by Socket.io and BullMQ.
- **Authentication:** JWT-based secure login for students and teachers.
- **File Uploads:** Integrated with Cloudinary.
- **Robust API:** RESTful endpoints for all core features.
- **Production-Ready:** Dockerized with Nginx reverse proxy and environment-based configuration.

---

## Project Structure

```
apps/
  ├── admin/    # React app for teachers/admins
  ├── client/   # React app for students
  └── server/   # Node.js/Express backend API
docker-compose.yml
```

---

## Tech Stack

- **Frontend:** React 19, Vite, Zustand, React Router, TailwindCSS
- **Backend:** Node.js, Express, Mongoose, Socket.io, BullMQ, Multer, Cloudinary
- **Database:** MongoDB Atlas
- **Queue/Cache:** Redis
- **Containerization:** Docker, Docker Compose
- **Web Server:** Nginx (for SPA routing and API proxy)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Cloudinary](https://cloudinary.com/) account

### Local Development

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies for all apps:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**  
   Copy `.env.example` files in each app to `.env` and fill in your secrets.

4. **Start Redis (if not using Docker):**

   ```sh
   docker run --name dev-redis -p 6379:6379 redis:7
   ```

5. **Run all apps in development mode:**

   ```sh
   npm run dev
   ```

   _(Requires Turborepo or npm workspaces setup)_

6. **Access the apps:**
   - Client: [http://localhost:5173](http://localhost:5173)
   - Admin: [http://localhost:5174](http://localhost:5174)
   - Server API: [http://localhost:5000](http://localhost:5000)

---

## Environment Variables

Each app requires its own `.env` file.  
**Example for `apps/server/.env`:**

```
PORT=8000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net
DBNAME=...
REDIS_HOST=localhost
REDIS_PORT=6379
CLOUDINARY_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
ACCESS_TOKEN_SECRET=...
```

**Example for `apps/client/.env`:**

```
VITE_SERVER_URL=http://localhost:5000/api/v1/user
```

**Example for `apps/admin/.env`:**

```
VITE_SERVER_URL=http://localhost:5000/api/v1/admin
```

---

## Docker Usage

### Build and Run All Services

```sh
docker-compose up --build -d
```

- Client: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3001](http://localhost:3001)
- Server and Redis are internal-only (not exposed).

### Stop All Services

```sh
docker-compose down
```

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

---

**Made with ❤️ by Devanshu Pandey.**
