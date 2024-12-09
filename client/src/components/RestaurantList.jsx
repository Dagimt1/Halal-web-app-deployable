import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import "../styles/RestaurantList.css"; // Link custom CSS for more styling control

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => restaurant.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-muted">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.id} color="#02733E" />
        <span className="text-success ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className="row">
      {restaurants &&
        restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="col-lg-4 col-md-6 mb-4"
            onClick={() => handleRestaurantSelect(restaurant.id)}
          >
            <div className="card shadow-sm">
              <img
                src={restaurant.thumbnail || "default-thumbnail.jpg"}
                alt={restaurant.name}
                className="card-img-top restaurant-thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title font-weight-bold">{restaurant.name}</h5>
                <p className="card-text text-muted">
                  <i className="fas fa-map-marker-alt"></i> {restaurant.location}
                </p>
                <p className="card-text text-muted">
                  <i className="fas fa-utensils"></i> {restaurant.cuisine_type}
                </p>
                <p className="card-text text-success font-weight-bold">
                  {'$'.repeat(restaurant.price_range)}
                </p>
                <div className="d-flex align-items-center">
                  {renderRating(restaurant)}
                </div>
                <p className="card-text text-muted">
                  <i className="fas fa-phone"></i> {restaurant.phone}
                </p>
                <p className="card-text">
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    Visit Website
                  </a>
                </p>
                <p className="card-text">
                  <strong>Hours:</strong> {restaurant.hours}
                </p>
                <p className="card-text">
                  <strong>Options:</strong>{" "}
                  {restaurant.dine_in && <span>Dine-In, </span>}
                  {restaurant.takeout && <span>Takeout, </span>}
                  {restaurant.delivery && <span>Delivery</span>}
                </p>
                <div className="mt-2">
                  <button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    className="btn btn-success mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RestaurantList;
