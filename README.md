# Node.js Express JWT Authentication Project

This project demonstrates a simple user authentication system using Node.js, Express.js, and JSON Web Tokens (JWT). It includes routes for user signup, login, and logout functionalities.

## Features

- User signup with validation
- User login with JWT authentication
- JWT-based session management
- Secure logout functionality

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- npm (comes with Node.js)
- A MongoDB instance (local or cloud-based)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MrLearner47/JWT.git
   cd JWT
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your_database_name
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_database_name` and `your_jwt_secret` with your MongoDB database name and a secure secret key for JWT, respectively.

4. Start the development server:

   ```bash
   npm start
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### User Authentication Routes

1. **Signup**

   - **GET** `/signup`
     - Renders the signup page.
   - **POST** `/signup`
     - Registers a new user.
     - Request Body:
       ```json
       {
         "username": "example_user",
         "password": "example_password"
       }
       ```

2. **Login**

   - **GET** `/login`
     - Renders the login page.
   - **POST** `/login`
     - Authenticates the user and returns a JWT.
     - Request Body:
       ```json
       {
         "username": "example_user",
         "password": "example_password"
       }
       ```
     - Response:
       ```json
       {
         "token": "your_jwt_token"
       }
       ```

3. **Logout**

   - **GET** `/logout`
     - Logs the user out by invalidating the session (if implemented).

## Project Structure

```
project-directory/
├── controllers/
│   └── userAuthController.js
├── routes/
│   └── authRoutes.js
├── models/
│   └── User.js
├── middlewares/
│   └── authMiddleware.js
├── .env
├── server.js
└── package.json
```

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)

## Usage

1. Navigate to `/signup` to create a new user account.
2. Log in at `/login` to receive a JWT token.
3. Use the JWT token to access protected routes (if implemented).
4. Log out at `/logout` to invalidate the session.

## Security Best Practices

- Store the `JWT_SECRET` securely and avoid exposing it in your source code.
- Use HTTPS in production environments to secure data in transit.
- Implement rate-limiting and input validation to protect against brute force attacks.
- Consider implementing token expiration and refresh mechanisms.

## License

This project is licensed under the MIT License. Feel free to use and modify the code for your projects.

## Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/)

