
# Halal Restaurant Finder

Welcome to the Halal Restaurant Finder! This is a full-stack web application for discovering, reviewing, and rating halal restaurants.

---

## Project Structure

The project is divided into two main folders:

1. **Client**: Contains the frontend of the application, built with React.
2. **Server**: Contains the backend, built with Express and Node.js, connected to a PostgreSQL database.

---

## Installation

### Prerequisites

Ensure you have **Node.js** and **PostgreSQL** installed on your machine.

### Setting Up the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/halal-restaurant-finder.git
   cd halal-restaurant-finder
   ```

2. **Install Dependencies**:

   For both the client and server, you need to install the dependencies.

   - **Navigate to the client folder**:

     ```bash
     cd client
     npm install
     ```

   - **Navigate to the server folder**:

     ```bash
     cd ../server
     npm install
     ```

3. **Database Setup**:

   Open your PostgreSQL terminal and set up the necessary databases and tables.

   - **Create the Database**:

     ```sql
     CREATE DATABASE halal_restaurant_finder;
     ```

   - **Connect to the Database**:

     ```sql
     \c halal_restaurant_finder;
     ```

   - **Create Tables**:

     ```sql
     CREATE TABLE restaurants (
         id BIGSERIAL NOT NULL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         location VARCHAR(255) NOT NULL,
         price_range INT NOT NULL CHECK (price_range >= 1 and price_range <= 5)
     );

     CREATE TABLE reviews (
         id BIGSERIAL NOT NULL PRIMARY KEY,
         restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
         name VARCHAR(50) NOT NULL,
         review TEXT NOT NULL,
         rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
     );
     ```

   - **Sample Data Insertion** (optional):

     ```sql
     INSERT INTO restaurants (name, location, price_range) VALUES 
     ('MCDONALDS', 'NEW YORK', 3);
     ```

4. **Environment Variables**:

   In the server folder, create a `.env` file to store your environment variables.

   ```plaintext
   PORT=3001
   DATABASE_URL=your_database_url
   ```

   Replace `your_database_url` with your actual PostgreSQL connection string.

---

## Running the Application

1. **Start the Server**:

   In the `server` directory, start the backend server.

   ```bash
   npm start
   ```

2. **Start the Client**:

   In the `client` directory, start the frontend development server.

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Others**: Axios, dotenv, morgan, cors

---

## Features

- List halal restaurants with name, location, and price range.
- Rate and review restaurants.
- Full CRUD operations on restaurant data.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Happy coding! Enjoy discovering halal restaurants near you!
