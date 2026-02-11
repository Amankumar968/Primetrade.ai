# TaskFlow - Task Management System

A modern, full-stack task management application built with Next.js and Node.js. Organize your work, track progress, and boost productivity with an intuitive interface and powerful features.

## 🚀 Features

- **User Authentication** - Secure registration and login
- **Task Management** - Create, read, update, and delete tasks
- **Task Filtering** - Filter by status, priority, and search keywords
- **Task Statistics** - Real-time task completion tracking
- **User Profiles** - Update profile information and settings
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates** - Instantly reflect changes across the application

## 📋 Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Context** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## 📦 Project Structure

```
PrimeTrade/
├── assignment-frontend/          # Next.js frontend application
│   ├── app/                      # Next.js app directory
│   ├── components/               # React components
│   ├── context/                  # React context (auth)
│   ├── lib/                      # Utility functions
│   ├── public/                   # Static assets
│   └── package.json
├── assignment-backend/           # Node.js backend API
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   ├── models/               # Database models
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Custom middleware
│   │   └── server.js             # Express server
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd assignment-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `assignment-backend/` directory:
```
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd assignment-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in `assignment-frontend/` directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Application will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "Aman Kumar",
  "email": "aman@example.com",
  "password": "password123"
}

Response: 201
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Aman Kumar",
      "email": "aman@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "aman@example.com",
  "password": "password123"
}

Response: 200
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Aman Kumar",
      "email": "aman@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "Aman Kumar",
      "email": "aman@example.com"
    }
  }
}
```

### Task Endpoints

#### Get All Tasks
```
GET /tasks?status=pending&priority=high&search=query&sortBy=createdAt&order=desc
Authorization: Bearer jwt_token_here

Query Parameters:
- status: pending | in-progress | completed
- priority: low | medium | high
- search: string
- sortBy: createdAt | updatedAt | dueDate | priority | status
- order: asc | desc

Response: 200
{
  "success": true,
  "count": 5,
  "data": {
    "tasks": [
      {
        "_id": "task_id",
        "title": "Task Title",
        "description": "Task Description",
        "status": "pending",
        "priority": "high",
        "dueDate": "2024-12-31",
        "userId": "user_id",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

#### Get Single Task
```
GET /tasks/:id
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "data": {
    "task": {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-12-31",
      "userId": "user_id",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

#### Create Task
```
POST /tasks
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task Description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-12-31"
}

Response: 201
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "task_id",
      "title": "New Task",
      "description": "Task Description",
      "status": "pending",
      "priority": "medium",
      "dueDate": "2024-12-31",
      "userId": "user_id",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

#### Update Task
```
PUT /tasks/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31"
}

Response: 200
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "_id": "task_id",
      "title": "Updated Title",
      "description": "Updated Description",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-12-31",
      "userId": "user_id",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-02-01T00:00:00Z"
    }
  }
}
```

#### Delete Task
```
DELETE /tasks/:id
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### Get Task Statistics
```
GET /tasks/stats
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "data": {
    "stats": {
      "total": 10,
      "pending": 3,
      "in-progress": 2,
      "completed": 5
    }
  }
}
```

### User Profile Endpoints

#### Get User Profile
```
GET /users/profile
Authorization: Bearer jwt_token_here

Response: 200
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "name": "Aman Kumar",
      "email": "aman@example.com",
      "phone": "1234567890",
      "bio": "User bio",
      "avatar": "avatar_url"
    }
  }
}
```

#### Update User Profile
```
PUT /users/profile
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Priya Singh",
  "phone": "0987654321",
  "bio": "Updated bio",
  "avatar": "new_avatar_url"
}

Response: 200
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "Priya Singh",
      "email": "aman@example.com",
      "phone": "0987654321",
      "bio": "Updated bio",
      "avatar": "new_avatar_url"
    }
  }
}
```

## 🚀 Postman Collection

### Import Collection

1. Open Postman
2. Click **Import**
3. Select **Folder** or **Link** option
4. Use this collection details to manually create requests, or save the following as `TaskFlow.postman_collection.json`

### Quick Setup in Postman

1. Create a new Environment variable:
   - Variable: `base_url` → Value: `http://localhost:5000/api`
   - Variable: `token` → Value: (will auto-populate after login)

2. Use `{{base_url}}` in all request URLs
3. Add `Authorization: Bearer {{token}}` header to protected endpoints

### Sample Requests Order

1. **POST** Register → Get token
2. **POST** Login → Get token  
3. **POST** Create Task → Create new task
4. **GET** Get All Tasks → Retrieve tasks
5. **PUT** Update Task → Update task
6. **GET** Task Stats → View statistics
7. **DELETE** Delete Task → Delete task

## 🔐 Authentication

All endpoints except `/auth/register` and `/auth/login` require authentication.

Include JWT token in Authorization header:
```
Authorization: Bearer your_jwt_token_here
```

## 📱 Running on Different Devices

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
```

### Access from Mobile Device (same network)
```
Frontend: http://YOUR_COMPUTER_IP:3000
Backend: http://YOUR_COMPUTER_IP:5000
```

Update `.env.local` in frontend to use the backend IP instead of localhost

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update `MONGODB_URI` with cloud MongoDB connection string
- For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/taskflow`

### CORS Error
- Backend CORS is configured for `http://localhost:3000`
- Update CORS in `assignment-backend/src/server.js` if running on different port

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -i :5000              # macOS/Linux
netstat -ano | find ":5000" # Windows

# Use different port
PORT=5001 npm start
```

### Frontend Can't Connect to Backend
- Update `NEXT_PUBLIC_API_URL` in `.env.local` to match backend URL
- Ensure backend server is running before starting frontend

## 📄 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_secret_key_for_jwt_tokens
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

---

**For support or issues, please create an issue in the repository.**
