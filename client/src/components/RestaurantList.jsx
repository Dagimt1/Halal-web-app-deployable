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
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
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
      return <span className="text-success">0 reviews</span>; // Green color
    }
    return (
      <>
        <StarRating rating={restaurant.id} color="#02733E" /> {/* Green star color */}
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
              <div className="card-body">
                <h5 className="card-title font-weight-bold">{restaurant.name}</h5>
                <p className="card-text text-muted">{restaurant.location}</p>
                <p className="card-text">{'$'.repeat(restaurant.price_range)}</p>
                <div className="d-flex align-items-center">
                  {renderRating(restaurant)}
                </div>
                <div className="mt-2">
                  <button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    className="btn btn-success mr-2" // Green Edit button
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
