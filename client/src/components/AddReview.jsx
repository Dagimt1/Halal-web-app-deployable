import React, { useState, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams, useNavigate } from "react-router-dom";

const RestaurantDetailsWithReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for restaurant details
  const [restaurant, setRestaurant] = useState(null);

  // State for adding a review
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  // Fetch restaurant details
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setRestaurant({
          ...response.data.data.restaurant,
          reviews: response.data.data.restaurant.reviews || [], // Ensure reviews is an array
        });
      } catch (err) {
        console.error("Failed to fetch restaurant details:", err);
        navigate("/"); // Redirect if fetching fails
      }
    };
    fetchRestaurant();
  }, [id, navigate]);

  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });

      if (response.data && response.data.review) {
        // Add new review to the current state
        setRestaurant((prevState) => ({
          ...prevState,
          reviews: [...(prevState?.reviews || []), response.data.review],
        }));
      }

      // Clear form fields
      setName("");
      setReviewText("");
      setRating("Rating");
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Restaurant Details */}
        <div className="col-md-6">
          <h1>{restaurant.name}</h1>
          <p>
            <strong>Address:</strong> {restaurant.address || "Not available"}
          </p>
          <p>
            <strong>Phone:</strong> {restaurant.phone_number || "Not available"}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            {restaurant.website ? (
              <a
                href={restaurant.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {restaurant.website}
              </a>
            ) : (
              "Not available"
            )}
          </p>
          <p>
            <strong>Open Hours:</strong>
            {restaurant.operating_hours ? (
              <ul>
                {Object.entries(restaurant.operating_hours).map(
                  ([day, hours]) => (
                    <li key={day}>
                      <strong>{day}:</strong> {hours}
                    </li>
                  )
                )}
              </ul>
            ) : (
              "Not available"
            )}
          </p>
        </div>

        {/* Add Review Form */}
        <div className="col-md-6">
          <h3>Add a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Your Name"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                id="rating"
                className="form-control"
                required
              >
                <option disabled value="Rating">
                  Rating
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Review">Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                id="Review"
                className="form-control"
                placeholder="Write your review here"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Display Reviews */}
      <div className="mt-4">
        <h3>Reviews</h3>
        {restaurant.reviews && restaurant.reviews.length > 0 ? (
          restaurant.reviews.map((review, index) => (
            <div key={index} className="mb-3">
              <h5>{review.name}</h5>
              <p>
                <strong>Rating:</strong> {review.rating}/5
              </p>
              <p>{review.review}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsWithReview;
