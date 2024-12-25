# E-commerce Application

### README for E-Commerce Application

---

## E-Commerce Application

This is a fully functional E-Commerce Application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application provides a seamless experience for both customers and administrators, integrating essential features and secure payment options to deliver an end-to-end e-commerce solution.

---

## Features

### Customer Features

- User Authentication: Login, logout, password change, and password recovery options.
- Product Browsing: Explore product categories, view detailed product descriptions, and search for items.
- Shopping Cart: Add, update, and remove items in the cart.
- Order Placement: Place orders seamlessly with integrated payment.
- Payment Integration: Secure payments using e-Sewa.

### Admin Dashboard

- User Management: Add, edit, and delete users.
- Product Management: Manage product inventory, add new products, and update existing ones.
- Order Management: View, update, and track orders.
- Analytics: Monitor sales, revenue, and customer activity through visual dashboards.

---

## Technologies Used

- Frontend: React.js with Redux for state management.
- Backend: Node.js with Express.js for server-side logic.
- Database: MongoDB for managing data storage.
- Authentication: JSON Web Tokens (JWT) for secure authentication and authorization.
- Payment Integration: e-Sewa API.

---

## JWT Token and Its Usage

JSON Web Tokens (JWT) are used to secure the authentication and authorization process in this project.

- How It Works:

  1. When a user logs in, a JWT is generated on the server containing the user’s information (like user email, name and role).
  2. This token is sent to the client and stored securely (e.g., in cookies or localStorage).
  3. For each subsequent request to protected routes, the client includes the token in the authorization header.
  4. The server validates the token to verify the user's identity and grant access.

- Usage in This Project:
  - Protect sensitive API routes (e.g., admin functionalities, order management).
  - Ensure only authenticated users can access their accounts.

---

## Project Architecture

This project follows a Modular Architecture to maintain separation of concerns and scalability.

1. Frontend:

   - Developed with React.js, utilizing reusable components for dynamic UI.
   - State management with Redux ensures efficient handling of application state.

2. Backend:

   - Built with Express.js, structured into modules like routes, controllers, and middlewares.
   - Implements RESTful APIs for communication between client and server.

3. Database:

   - MongoDB stores application data, including users, products, and orders.
   - Mongoose is used for schema modeling and database operations.

4. Authentication & Authorization:

   - JWT ensures secure login and role-based access control (admin vs customer).

5. Payment Gateway:
   - e-Sewa API integration provides a secure payment solution with smooth transaction flow.

---

## Installation

### Prerequisites

- Node.js
- MongoDB
- e-Sewa API keys

### Steps to Run Locally

1. Clone this repository.
   ```bash
   git clone git@github.com:suraz-101/E-commerce.git
   ```
2. Install dependencies for both client and server.
   ```bash
   cd server
   npm install
   cd client
   npm install
   ```
3. Configure the environment variables.

   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string, e-Sewa API keys, and JWT secret.

4. Start the development servers.

    <!-- To run server -->

   open terminal  
    cd server

   # In the root directory

   npm run dev

   ```
     <!-- for client  -->
     open another terminal
     cd client
     npm run dev
   ```

---

## Contributions

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with detailed changes.
