```markdown
# Halal Restaurant Finder

Halal Restaurant Finder is a web application that allows users to browse, review, and rate halal restaurants. It provides a simple, Yelp-like interface to view restaurant details, read reviews, and add new reviews.

This project is divided into two parts: **client** (frontend) and **server** (backend).

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **PostgreSQL**

## Project Setup

To get started with the project, follow these steps.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/halal-restaurant-finder.git
cd halal-restaurant-finder
```

### 2. Set Up the Client

The client directory contains the frontend of the application.

#### Navigate to the Client Directory

```bash
cd client
```

#### Install Dependencies

```bash
npm install
```

#### Available Scripts

In the **client** directory, you can run:

- **`npm start`** - Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- **`npm test`** - Launches the test runner in interactive watch mode.
- **`npm run build`** - Builds the app for production to the `build` folder.
- **`npm run eject`** - Ejects the configuration files for customization.

### 3. Set Up the Server

The server directory contains the backend of the application.

#### Navigate to the Server Directory

```bash
cd ../server
```

#### Install Dependencies

```bash
npm install
```

#### Create a `.env` File

Create a `.env` file in the **server** directory with the following environment variables:

```env
PORT=3001
DATABASE_URL=your_database_url
```

Replace `your_database_url` with your PostgreSQL database connection string.

#### Database Setup

Run the following SQL commands to set up the necessary tables in your PostgreSQL database:

```sql
CREATE DATABASE halal_restaurant_finder;

\c halal_restaurant_finder;

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL CHECK (price_range >= 1 AND price_range <= 5)
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
);
```

#### Available Scripts

In the **server** directory, you can run:

- **`npm start`** - Runs the server using **Nodemon** for live reloading at [http://localhost:3001](http://localhost:3001).

## Project Structure

```
halal-restaurant-finder/
├── client/                # Frontend React app
│   ├── public/            # Static files (including background video)
│   ├── src/               # Main source code for the client
│   └── package.json       # Client dependencies and scripts
├── server/                # Backend Express server
│   ├── db/                # Database connection and queries
│   └── package.json       # Server dependencies and scripts
└── README.md              # Project documentation
```

## Usage

1. **Start the Client**: Open a terminal, navigate to the `client` directory, and run:

    ```bash
    npm start
    ```

2. **Start the Server**: Open another terminal, navigate to the `server` directory, and run:

    ```bash
    npm start
    ```

The client will be available at [http://localhost:3000](http://localhost:3000) and the server at [http://localhost:3001](http://localhost:3001).

## Features

- Browse halal restaurants with a clean, card-based interface.
- Add new restaurants to the list.
- Review and rate restaurants.
- Edit or delete existing restaurant entries.

## Technologies Used

- **Frontend**: React, Axios, Bootstrap for styling
- **Backend**: Express, Node.js, PostgreSQL
- **Database**: PostgreSQL

## Learn More

- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## License

This project is licensed under the MIT License.

## Acknowledgements

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Inspired by the [Yelp](https://www.yelp.com/) interface.
```
