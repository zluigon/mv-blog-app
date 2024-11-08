# Quickthinx

Quickthinx is a blogging application built with Angular and Node.js.

It allows users to create, edit, and delete blog posts.

This application features authentication and authorization, ensuring that only the author of each post can modify it.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **User Authentication**: Users can register and log in, receiving a JWT for secure access.
- **Blog CURD**: Users can create, view, edit, and delete blog posts.
- **Authorization**: Only the post's author can edit or delete their posts.
- **Conditional Rendering**: Options such as edit and delete are only visible to the authorized user.

## Technologies

- **Frontend**: Angular, Angular Material
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.conm/<yourusername>/quickthinx.git
   cd quickthinx
   ```
2. **Backend Setup:**
   - Navigate to the backend directory
   ```bash
   cd server
   ```
   - Install dependencies
   ```bash
   npm install
   ```
   - Set up environment variables in a `.env` file:
   ```makefile
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongo_connection_string
   ```
3. **Frontend Setup:**
   - Navigate to the frontend directory
   ```bash
   cd client
   ```
   - Install Angular dependencies
   ```bash
   npm install
   ```
   - Start the Angular development server
   ```bash
   ng serve
   ```

## Usage

- **Running the Backend:**
  ```bash
  npm start
  ```
- **Running the Frontend:** In another terminal window:
  ```bash
  ng serve
  ```
- **Testing API Endpoints with Postman:**
  - Use the JWT from the login or registration response in the Authorization headers.
  - Make POST requests to `http://localhost:<backend-port>/api/blogs` with blog data to create posts, and use GET requests to retrieve posts.
