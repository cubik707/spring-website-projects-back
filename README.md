# Projects Page Backend
This repository contains the backend implementation for the Projects Page clone, inspired by the official Spring website. The backend was developed to provide API endpoints and authentication features for the project.

## 🌟 Features
Node.js: The backend is built using Node.js, providing a lightweight and efficient server-side environment.
PostgreSQL: A relational database is used to store and manage project data securely.
Sequelize: An ORM (Object-Relational Mapping) tool is used for database interaction, simplifying complex queries and migrations.
JWT Authentication: Secure user authentication is implemented using JSON Web Tokens:
Access tokens for short-term authentication.
Refresh tokens for secure and seamless token renewal.
## 🎯 Why This Project?
The goal of this backend was to create a robust and scalable API to:

Provide a data layer for the React frontend.
Practice working with Node.js and PostgreSQL.
Implement secure and efficient authentication using JWT.
Explore Sequelize for database modeling and query optimization.


## 📸 API Endpoints
Here are some of the key endpoints provided by the API:

### Authentication
- POST /login:
Logs in a user by verifying credentials. Returns access and refresh tokens.
- POST /signup:
Registers a new user. Returns access and refresh tokens.
- GET /me:
Retrieves the details of the currently authenticated user.
- POST /refresh-token:
Refreshes the access token using a valid refresh token.

### Projects
- GET /projects:
Retrieves a list of all projects.
