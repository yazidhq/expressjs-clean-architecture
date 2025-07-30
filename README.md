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
    ├── applications/           # Application layer
    │   └── usecases/           # Business logic use cases
    ├── compositions/       # Composition logic
    ├── domain/             # Domain layer (entities, repositories, usecases)
    │   ├── entities/       # Core business entities
    │   ├── repositories/   # Data access logic
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
- Health check monitoring

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

This endpoint supports various query parameters for filtering, sorting, pagination, and global search.

### Query Parameters

| Parameter        | Description                                                                              | Example                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| filter           | Flexible filter, supports operators and relations. Format: `filter=field,operator,value` | `filter=username,=,john`<br>`filter=profile.name,like,John`<br>`filter=createdAt,between,2024-01-01\|2024-12-31` |
| limit            | Number of items per page                                                                 | `limit=10`                                                                                                       |
| page             | Page number                                                                              | `page=2`                                                                                                         |
| sort             | Column name for sorting (can be relation)                                                | `sort=username`<br>`sort=profile.name`                                                                           |
| order            | Sort direction (`asc` or `desc`)                                                         | `order=desc`                                                                                                     |
| search           | Global search in fields defined in backend (`concatFields`)                              | `search=john`                                                                                                    |
| [field]          | Direct filter by column                                                                  | `username=john`<br>`email=abc@xyz.com`                                                                           |
| [relation.field] | Direct filter in relation (if relation is included)                                      | `profile.name=John`                                                                                              |

### Supported Operators in `filter`

- `=` : equal
- `!=` : not equal
- `>` : greater than
- `>=` : greater than or equal
- `<` : less than
- `<=` : less than or equal
- `like` : contains
- `notLike` : does not contain
- `in` : one of (separate values with `|`)
- `notIn` : not one of
- `between` : between two values (separate with `|`)
- `notBetween` : outside two values
- `is`, `not`, `regexp`, `notRegexp`, `iRegexp`, `notIRegexp`

### Usage Examples

#### Column Filter

```
GET /api/user?username=john&email=abc@xyz.com
```

#### Relation Filter

```
GET /api/user?filter=profile.name,=,John
```

#### Range Filter

```
GET /api/user?filter=createdAt,between,2024-01-01|2024-12-31
```

#### Sort and Order

```
GET /api/user?sort=username&order=desc
```

#### Pagination

```
GET /api/user?limit=5&page=2
```

#### Global Search

```
GET /api/user?search=john
```

### Notes

- For relation filters, make sure the relation is included in the controller.
- For global search, the fields to be searched are defined in the backend (`concatFields`).
- All parameters can be combined as needed.

---

## Usage

The "Usage" section provides instructions on how to utilize the features of the ExpressJS Boilerplate, including setting up routes, managing database models, implementing middleware, and others. Follow these guidelines to quickly start building and customizing your application.

### Application Layer Structure

- **Use Cases**: Business logic defined in `src/domain/usecases`.

### Domain Layer Structure

- **Entities**: Core business objects defined in `src/domain/entities`.
- **Repositories**: Data access logic defined in `src/domain/repositories`.

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
| **Jobs / Queue**           | Background processing for async tasks.                       |
| **Rate & Usage Analytics** | Track API usage and performance metrics.                     |
| **WebSocket/Realtime**     | Enable real-time data via WebSocket or services like Pusher. |
| **Testing**                | Unit and integration tests for code reliability.             |
| **Code Linting & Hooks**   | Enforce code standards via linting and git hooks.            |
| **CI/CD**                  | Automated build, test, and deployment pipelines.             |
| **API Versioning**         | Manage and maintain multiple API versions.                   |
