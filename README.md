# ExpressJS Boilerplate

[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Node Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen)]()

## Introduction

Welcome to the ExpressJS Boilerplate project!  
This repository provides a starter template for building web applications using Express.js, a fast and minimalist web framework for Node.js.  
This boilerplate is designed with a modular structure, environment configuration, Sequelize ORM integration, middleware support, centralized error handling, and integrated logging.

---

## Features

- Modular folder structure for maintainability
- Environment configuration for multiple environments (development, production)
- Sequelize ORM for MySQL/PostgreSQL support
- Middleware and centralized error handling
- Integrated logging system
- API documentation with Swagger

---

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- MySQL or PostgreSQL database (depending on your configuration)

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

- Start in development mode (with nodemon or similar):

   ```bash
   npm run start:dev
   ```

- Start in production mode:

   ```bash
   npm start
   ```

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
    ├── infrastructure/     # Infrastructure layer (config, database, repositories, services)
    │   ├── config/         # Configuration files
    │   ├── database/       # Database management
    │   │   ├── migrations/ # Database migrations
    │   │   ├── models/     # Sequelize models
    │   │   └── seeders/    # Database seeders
    │   ├── repositories/   # Repository implementations
    │   └── services/       # Service layer for business logic
    ├── interface/          # Interface layer (controllers, middleware, routes, validators)
    │   ├── controllers/    # Request handling logic
    │   ├── middleware/     # Custom middleware
    │   ├── routes/         # API route definitions
    │   └── validators/     # Request data validation
    ├── logs/               # Application logs
    └── shared/             # Shared utilities
        └── utils/          # Utility functions
```

---

## Environment Configuration

Place your database, app port, and other configurations inside `.env` files located in `src/infrastructure/config`.

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

## Query Filter Parameters

This section provides guidance on how to use query filter parameters in your API requests to filter data based on specific criteria.

### Filter Parameter Conditions

| No | Condition | Description                                     | Example JSON                                                | Explanation                                                      |
| -- | --------- | ----------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------- |
| 1  | **Not Equal**    | Excludes results that match         | `{ "role": { "ne": "user" } }`                              | Excludes data with role equal to 'user'.                         |
| 2  | **Greater Than** | Includes values greater than     | `{ "age": { "gt": 25 } }`                                   | Includes data with age > 25.                                     |
| 3  | **Greater Than or Equal** | Includes values ≥       | `{ "salary": { "gte": 5000 } }`                             | Includes data with salary ≥ 5000.                                |
| 4  | **Less Than** | Includes values less than           | `{ "score": { "lt": 100 } }`                                | Includes data with score < 100.                                  |
| 5  | **Less Than or Equal** | Includes values ≤          | `{ "rating": { "lte": 80 } }`                               | Includes data with rating ≤ 80.                                  |
| 6  | **Like**  | Matches a pattern (substring)            | `{ "username": { "like": "john" } }`                        | Includes data with usernames containing 'john'.                  |
| 7  | **In**    | Matches any of the specified values        | `{ "status": { "in": ["active", "pending"] } }`             | Includes data with status 'active' or 'pending'.                 |
| 8  | **Default String Match** | Substring match          | `{ "email": "example" }`                                    | Includes data with emails containing 'example'.                  |
| 9  | **OR Condition** | Combines multiple conditions OR  | `{ "or": [{ "country": "USA" }, { "country": "Canada" }] }` | Includes data from either 'USA' or 'Canada'.                     |
| 10 | **Relation Filter** | Filter based on nested fields | `{ "profile.bio": { "like": "developer" } }`                | Includes data where the nested 'bio' field contains 'developer'. |

---

## Usage

The "Usage" section provides instructions on how to utilize the features of the ExpressJS Boilerplate, including setting up routes, managing database models, implementing middleware, and using the authentication system. Follow these guidelines to quickly start building and customizing your web application.

### Creating Routes

- Define your API routes in the `src/interface/routes` directory.

### Database Models

- Create your database models in the `src/infrastructure/database/models` directory using Sequelize.

### Middleware

- Add custom middleware in the `src/interface/middleware` directory for request processing.

### Logging

- Check the `src/logs` directory for application logs.

### Domain Layer Structure

- **Entities**: Core business objects defined in `src/domain/entities`.
- **Repositories**: Data access logic defined in `src/domain/repositories`.
- **Use Cases**: Business logic defined in `src/domain/usecases`.

### Infrastructure Layer Structure

- **Config**: Configuration files located in `src/infrastructure/config`.
- **Database**: Database management files located in `src/infrastructure/database`.
- **Repositories**: Implementations of data access logic located in `src/infrastructure/repositories`.
- **Services**: Business logic services located in `src/infrastructure/services`.

### Interface Layer Structure

- **Controllers**: Request handling logic located in `src/interface/controllers`.
- **Middleware**: Custom middleware located in `src/interface/middleware`.
- **Routes**: API route definitions located in `src/interface/routes`.
- **Validators**: Request data validation located in `src/interface/validators`.

---

## Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

Yazid Dhiaulhaq Ismail — [GitHub](https://github.com/yazidhq)  
Contact: [yazidhq00@gmail.com](mailto:yazidhq00@gmail.com)

---