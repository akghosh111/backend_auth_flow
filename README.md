# Express Auth Flow

A robust and scalable authentication system built with Node.js, Express, and MongoDB. This project provides a complete authentication flow including registration, login, email verification, and password recovery.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT.
- **Refresh Token Mechanism**: Seamless token renewal for better security and UX.
- **Email Verification**: Ensure user authenticity via email confirmation.
- **Password Recovery**: Forgot and Reset password functionality with secure tokens.
- **Secure Storage**: Password hashing using `bcryptjs`.
- **Input Validation**: Request body validation using `Joi`.
- **Modular Architecture**: Clean and organized codebase following a modular pattern.
- **Docker Support**: Easy database setup using Docker Compose.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (v5+)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Email Service**: Nodemailer
- **Environment Management**: Dotenv
- **Containerization**: Docker

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker](https://www.docker.com/) (optional, for local MongoDB setup)
- [MongoDB](https://www.mongodb.com/) (if not using Docker)

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/express-auth-flow.git
   cd express-auth-flow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and copy the contents from `env.example`:
   ```bash
   cp env.example .env
   ```
   Fill in your specific configurations (Database URI, JWT secrets, SMTP details).

4. **Start the database (using Docker)**:
   ```bash
   npm run db:up
   ```

5. **Run the application**:
   - For production: `npm start`
   - For development: `npm run dev`

## 🔑 Environment Variables

The application requires the following environment variables:

| Variable | Description |
|----------|-------------|
| `PORT` | Port number for the server (default: 4000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Secret key for access tokens |
| `JWT_ACCESS_EXPIRES_IN` | Expiration time for access tokens |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens |
| `JWT_REFRESH_EXPIRES_IN`| Expiration time for refresh tokens |
| `SMTP_HOST` | SMTP server host for emails |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `CLIENT_URL` | Frontend client URL (for email links) |

## 📡 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login and get tokens | No |
| POST | `/logout` | Invalidate tokens and logout | Yes |
| GET | `/me` | Get current user profile | Yes |
| POST | `/refresh-token` | Get new access token | No |
| GET | `/verify-email/:token` | Verify user email | No |
| POST | `/forgot-password` | Send password reset link | No |
| PUT | `/reset-password/:token`| Reset password using token | No |

## 📂 Project Structure

```text
src/
├── common/             # Shared utilities, middleware, and config
│   ├── config/         # Database and email configurations
│   ├── middleware/     # Global middlewares (validation, error handling)
│   └── utils/          # Helper functions (JWT, API responses)
├── modules/            # Domain-specific modules
│   └── auth/           # Authentication logic
│       ├── dto/        # Data Transfer Objects for validation
│       ├── auth.controller.js
│       ├── auth.service.js
│       ├── auth.model.js
│       └── auth.routes.js
├── app.js              # Express application setup
└── server.js           # Entry point
```

## 📜 License

This project is licensed under the [ISC License](LICENSE).
