# Express.js Backend API with Authentication and Task Management

A robust backend API built with Express.js, MongoDB, and TypeScript that includes user authentication and task management features.

## Features

- User Authentication (Signup/Login) with JWT
- Task Management (CRUD operations)
- TypeScript Integration
- Rate Limiting (not implemented yet)
- Security Middleware (Helmet, CORS)
- MongoDB Integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a remote instance)
- TypeScript

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/yourdb
   JWT_SECRET=your_secret_key
   ```

## API Endpoints

### Authentication
- POST `/api/signup` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- POST `/api/login` - Login and receive JWT token
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Tasks (Protected Routes - Require JWT Token)
- POST `/api/tasks` - Create a new task
  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```
- GET `/api/tasks` - Get all tasks for the authenticated user
- PUT `/api/tasks/:id` - Update a task
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description"
  }
  ```
- DELETE `/api/tasks/:id` - Delete a task

## Security Features

- Password Hashing (bcryptjs)
- JWT Authentication
- Helmet Security Headers
- CORS Protection

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid credentials
- Duplicate email addresses
- Invalid JWT tokens
- Rate limiting exceeded
- Database connection errors

## Testing

You can test the API endpoints using tools like Postman or curl. Remember to:
1. First create a user using the signup endpoint
2. Login to get the JWT token
3. Use the token in the Authorization header for protected routes:
   ```
   Authorization: Bearer <your-jwt-token>
   ```


## tested all api actions in postman api