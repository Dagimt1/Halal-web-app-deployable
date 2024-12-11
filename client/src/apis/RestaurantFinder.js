import axios from "axios";

export default axios.create({
    baseURL: "https://halal-web-app-deployable.onrender.com/api/v1/restaurants",
});
