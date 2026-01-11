# Mutual Fund Investment Platform - Backend

This is the backend REST API for the Mutual Fund Investment Platform, built with Spring Boot 3, MongoDB, and Redis.

## Tech Stack
- **Java 17**
- **Spring Boot 3.2+** (Web, Security, Data MongoDB, Data Redis, Validation)
- **MongoDB** (Database)
- **Redis** (Caching, Rate Limiting)
- **JWT** (Authentication)
- **Docker Compose** (Containerization)

## Prerequisites
- Java 17+ installed.
- Maven installed (or use provided wrapper if generated).
- Docker and Docker Compose installed.

## Setup & Run

1. **Start Infrastructure**:
   Run the database and cache services using Docker Compose.
   ```bash
   cd backend
   docker-compose up -d
   ```

2. **Build the Application**:
   ```bash
   mvn clean install
   ```

3. **Run the Application**:
   ```bash
   mvn spring-boot:run
   ```
   The application will start on `http://localhost:8080`.

## API Documentation
Once the application is running, access the Swagger UI documentation at:
- **URL**: `http://localhost:8080/swagger-ui.html`

## Features
- **Authentication**: Register, Login (JWT protected).
- **Survey**: Submit investment profile, calculate risk (Mock logic).
- **Funds**: Browse mutual funds, view details, caching enabled.
- **Recommendations**: Get personalized fund recommendations (Heuristic based).
- **Favorites**: Save/Remove favorite funds.
- **Admin**: Manage funds, view analytics.
- **Security**: Rate limiting (100 req/min), CORS configured.

## Configuration
Update `src/main/resources/application.yml` for custom settings (MongoDB URI, Redis Host, JWT Secret).

## Testing
Run unit and integration tests:
```bash
mvn test
```
