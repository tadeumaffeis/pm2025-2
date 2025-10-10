# Horários Lab Backend

Modern Node.js backend API for laboratory schedule management system.

## Architecture

- **MVC Pattern**: Clear separation between Models, Views, and Controllers
- **Repository Pattern**: Data access abstraction layer
- **Service Layer**: Business logic encapsulation
- **Dependency Injection**: Loose coupling between components

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Databases**: MySQL (relational) + MongoDB (logs/analytics)
- **Validation**: Joi
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI
- **Code Quality**: ESLint + Prettier

## Project Structure

```
src/
├── config/          # Database and app configuration
├── controllers/     # Request handlers
├── middleware/      # Custom middleware (auth, validation, etc.)
├── models/          # Data models
│   ├── mysql/       # MySQL entities
│   └── mongodb/     # MongoDB schemas
├── repositories/    # Data access layer
├── routes/          # API route definitions
├── services/        # Business logic layer
├── utils/           # Helper utilities
├── validators/      # Request validation schemas
├── app.js          # Express app configuration
└── server.js       # Application entry point
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **API Documentation**:
   Visit `http://localhost:3000/api-docs`

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## API Endpoints

- `GET /api/v1/` - API information
- `GET /api/v1/cursos` - List all courses
- `GET /api/v1/cursos/active` - List active courses
- `GET /api/v1/cursos/:id` - Get course by ID
- `POST /api/v1/cursos` - Create new course (auth required)
- `PUT /api/v1/cursos/:id` - Update course (auth required)
- `DELETE /api/v1/cursos/:id` - Delete course (auth required)

## Docker

Build and run with Docker:

```bash
docker build -t horarios-lab-backend .
docker run -p 3000:3000 --env-file .env horarios-lab-backend
```

## Features

- ✅ RESTful API with versioning
- ✅ MySQL + MongoDB integration
- ✅ JWT Authentication
- ✅ Request validation with Joi
- ✅ Centralized error handling
- ✅ API documentation with Swagger
- ✅ Audit logging to MongoDB
- ✅ Rate limiting
- ✅ Security headers with Helmet
- ✅ CORS support
- ✅ Code formatting with Prettier
- ✅ Linting with ESLint
- ✅ Docker ready