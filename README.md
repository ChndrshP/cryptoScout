# cryptoScout - Cryptocurrency Price Alert App

**cryptoScout** is a cryptocurrency price alert application built using the MERN stack. Users can set alerts for their desired cryptocurrencies, and the application will notify them via email when the target price or halfway threshold is reached.

## Features

- **User Authentication**: Register, login, and secure your account with email verification and JWT-based authentication.
- **Set Alerts**: Users can create alerts for specific cryptocurrencies with target prices.
- **Email Notifications**: Email notifications are sent when the halfway price or target price is reached.
- **Search Cryptocurrencies**: Users can search for cryptocurrencies using the CoinGecko API.
- **Dark/Light Mode**: Aesthetically pleasing frontend with both dark and light modes.
- **Responsive Design**: Frontend UI is fully responsive and works on different device sizes.

## Pages (Frontend)

1. **Landing Page**: The main entry point to the application.
2. **Login Page**: Allows users to log in.
3. **Sign Up Page**: Enables users to create a new account.
4. **Forgot Password Page**: Reset password functionality.
5. **Enter OTP Page**: For verifying the OTP sent via email.
6. **Home Page**: Displays user-specific alerts and cryptocurrency data.
7. **Alert Page**: Allows users to create, view, update, and delete price alerts.

## Tech Stack

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT (JSON Web Token)** for authentication
- **CoinGecko API** for fetching cryptocurrency data
- **Nodemailer** for sending emails

### Frontend:
- **React** (using **Vite** for development)
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Dark/Light Mode** with CSS and Tailwind

## Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v16 or later)
- **MongoDB** (local or cloud instance)
- **npm** (comes with Node.js)

## Installation & Setup

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ChndrshP/cryptoScout.git
    cd cryptoScout/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` folder and add the following environment variables:

    ```
    MONGODB_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT secret>
    EMAIL_USER=<Your email address for sending alerts>
    EMAIL_PASS=<Your email password or app-specific password>
    ```

4. Start the backend server:

    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `frontend` folder:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```

4. The application will be running at `http://localhost:3000`.

## API Endpoints

### Authentication Endpoints

- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Log in an existing user.
- **POST /api/auth/forgot-password** - Send a password reset email.
- **POST /api/auth/verify** - Verify the user's OTP for account registration.

### Alert Endpoints

- **POST /api/alerts/create** - Create a new alert.
- **GET /api/alerts** - Fetch all alerts for the user.
- **PUT /api/alerts/update/:id** - Update an alert.
- **DELETE /api/alerts/delete/:id** - Delete an alert.

### Coin Search Endpoints

- **GET /api/coins/search?query=:query** - Search for cryptocurrencies by name or symbol using the CoinGecko API.


## Running Tests

There are no automated tests included in this project. However, you can manually test the app by registering a user, creating alerts, and verifying email notifications.

## Future Enhancements

- Implement OAuth login (Google, GitHub).
- Add more detailed cryptocurrency data like historical price charts.
- Optimize price-checking intervals for large numbers of users.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new pull request.


