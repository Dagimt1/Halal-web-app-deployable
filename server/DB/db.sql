-- for help \?

-- list database \l

-- Create database CREATE DATABASE database_name;

-- list all tables \d

CREATE TABLE products (
    id INT,
    name VARCHAR(255),
    price INT,
    on_sale boolean
);

ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL CHECK (price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) VALUES 
(123, 'MCDONALDS', 'NEW YORK', 3);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
);
