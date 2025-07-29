# ExpressJS Boilerplate

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen?logo=node.js)](https://nodejs.org/)
[![npm Version](https://img.shields.io/badge/npm-%3E%3D6-orange?logo=npm)](https://www.npmjs.com/)
[![Docker](https://img.shields.io/badge/docker-%3E%3D20.10-blue?logo=docker)](https://www.docker.com/)

## Introduction

Welcome to the ExpressJS Boilerplate project!  
This repository provides a starter template for building web applications using Express.js, a fast and minimalist web framework for Node.js.

This boilerplate is designed with a modular structure, environment configuration, Sequelize ORM integration, middleware support, centralized error handling, and integrated logging.

---

## Folder Structure Overview

```
expressjs-boilerplate/
│
├── public/                 # Static files
└── src/                    # Source files
    ├── compositions/       # Composition logic
    ├── domain/             # Domain layer (entities, repositories, usecases)
    │   ├── entities/       # Core business entities
    │   ├── repositories/   # Data access logic
    │   └── usecases/       # Business logic use cases
    ├── infrastructures/     # Infrastructure layer (config, database, repositories, services)
    │   ├── config/         # Configuration files
    │   ├── database/       # Database management
    │   │   ├── migrations/ # Database migrations
    │   │   ├── models/     # Sequelize models
    │   │   └── seeders/    # Database seeders
    │   ├── repositories/   # Repository implementations
    │   └── services/       # Service layer for business logic
    ├── interfaces/          # Interface layer (controllers, middleware, routes, validators)
    │   ├── controllers/    # Request handling logic
    │   ├── middleware/     # Custom middleware
    │   ├── routes/         # API route definitions
    │   └── validators/     # Request data validation
    ├── logs/               # Application logs
    └── shared/             # Shared utilities
        └── utils/          # Utility functions
```

---

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- MySQL or PostgreSQL database (depending on your configuration)

---

## Features

- Modular folder structure for maintainability
- Environment configuration for multiple environments (development, production)
- Sequelize ORM for MySQL/PostgreSQL support
- Middleware and centralized error handling
- Integrated logging system
- API documentation with Swagger
- Audit Logs for monitoring
- Dockerize for containerization
- Caching data with Redis

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yazidhq/expressjs-boilerplate.git
   ```

2. Navigate to the project folder:

   ```bash
   cd expressjs-boilerplate
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy and update your environment variables:

   ```bash
   cp .env.example .env
   ```

5. Similarly for development or production:

   ```bash
   cp .env.development.example .env.development
   cp .env.production.example .env.production
   ```

---

## Running the Application

- Start in development mode:

  ```bash
  npm run start:dev
  ```

- Start in production mode:

  ```bash
  npm start
  ```

## Running the Application with Docker

### Development Mode

- Build and start containers:

  ```bash
  npm run docker:build:dev
  npm run docker:up:dev
  ```

- Stop containers (with or without removing volumes):

  ```bash
  npm run docker:down:dev:clean
  npm run docker:down:dev
  ```

### Production Mode

- Build and start containers:

  ```bash
  npm run docker:build
  npm run docker:up
  ```

- Stop containers (with or without removing volumes):

  ```bash
  npm run docker:down:clean
  npm run docker:down
  ```

---

## API Documentation with Swagger

This project integrates **Swagger** via **apidocs** to provide interactive API documentation.

- After running the server, you can access the Swagger UI at:

  ```
  http://localhost:<PORT>/api-docs
  ```

- The Swagger JSON definition is automatically generated based on your route annotations and configurations.

- Use this interface to explore all available endpoints, request parameters, and response schemas.

---

## Redis Utility Usage

First, make sure to import the Redis utility: const cache = require("./path/to/cache.util");

- get(key): Retrieve value by key

  ```
  const data = await cache.get("user:999");
  ```

- set(key, value, ttl?): Store value with optional TTL (in seconds)

  ```
  await cache.set("user:999", { name: "John" }, 120);
  ```

- del(key): Delete one or multiple keys

  ```
  await cache.del("user:999"); // single key
  await cache.del(["user:999", "user:124"]); // multiple keys
  ```

- clearCachePrefix(prefix): Delete all keys starting with a given prefix

  ```
  await cache.clearCachePrefix("user:");
  ```

---

## Query Filter Parameters

This section provides guidance on how to use query filter parameters in your API requests to filter data based on specific criteria.

### Filter Parameter Conditions

| No  | Condition                 | Description                         | Example JSON                                                | Explanation                                                      |
| --- | ------------------------- | ----------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | **Not Equal**             | Excludes results that match         | `{ "role": { "ne": "user" } }`                              | Excludes data with role equal to 'user'.                         |
| 2   | **Greater Than**          | Includes values greater than        | `{ "age": { "gt": 25 } }`                                   | Includes data with age > 25.                                     |
| 3   | **Greater Than or Equal** | Includes values ≥                   | `{ "salary": { "gte": 5000 } }`                             | Includes data with salary ≥ 5000.                                |
| 4   | **Less Than**             | Includes values less than           | `{ "score": { "lt": 100 } }`                                | Includes data with score < 100.                                  |
| 5   | **Less Than or Equal**    | Includes values ≤                   | `{ "rating": { "lte": 80 } }`                               | Includes data with rating ≤ 80.                                  |
| 6   | **Like**                  | Matches a pattern (substring)       | `{ "username": { "like": "john" } }`                        | Includes data with usernames containing 'john'.                  |
| 7   | **In**                    | Matches any of the specified values | `{ "status": { "in": ["active", "pending"] } }`             | Includes data with status 'active' or 'pending'.                 |
| 8   | **Default String Match**  | Substring match                     | `{ "email": "example" }`                                    | Includes data with emails containing 'example'.                  |
| 9   | **OR Condition**          | Combines multiple conditions OR     | `{ "or": [{ "country": "USA" }, { "country": "Canada" }] }` | Includes data from either 'USA' or 'Canada'.                     |
| 10  | **Relation Filter**       | Filter based on nested fields       | `{ "profile.bio": { "like": "developer" } }`                | Includes data where the nested 'bio' field contains 'developer'. |

---

## Usage

The "Usage" section provides instructions on how to utilize the features of the ExpressJS Boilerplate, including setting up routes, managing database models, implementing middleware, and others. Follow these guidelines to quickly start building and customizing your application.

### Domain Layer Structure

- **Entities**: Core business objects defined in `src/domain/entities`.
- **Repositories**: Data access logic defined in `src/domain/repositories`.
- **Use Cases**: Business logic defined in `src/domain/usecases`.

### Infrastructure Layer Structure

- **Config**: Configuration files located in `src/infrastructures/config`.
- **Database**: Database management files located in `src/infrastructures/database`.
- **Repositories**: Implementations of data access logic located in `src/infrastructures/repositories`.
- **Services**: Business logic services located in `src/infrastructures/services`.

### Interface Layer Structure

- **Controllers**: Request handling logic located in `src/interfaces/controllers`.
- **Middleware**: Custom middleware located in `src/interfaces/middleware`.
- **Routes**: API route definitions located in `src/interfaces/routes`.
- **Validators**: Request data validation located in `src/interfaces/validators`.

### Logging

- Check the `src/logs` directory for application logs.

---

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

Yazidhq — [GitHub](https://github.com/yazidhq)  
Contact: [yazidhq00@gmail.com](mailto:yazidhq00@gmail.com)

---

### 🚧 Coming Soon

Features planned for future releases:

| Feature                    | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| **Session Management**     | Handle user sessions and authentication state.               |
| **Health Checks**          | Endpoint to monitor service status.                          |
| **Jobs / Queue**           | Background processing for async tasks.                       |
| **Rate & Usage Analytics** | Track API usage and performance metrics.                     |
| **WebSocket/Realtime**     | Enable real-time data via WebSocket or services like Pusher. |
| **Testing**                | Unit and integration tests for code reliability.             |
| **Code Linting & Hooks**   | Enforce code standards via linting and git hooks.            |
| **CI/CD**                  | Automated build, test, and deployment pipelines.             |
| **API Versioning**         | Manage and maintain multiple API versions.                   |
