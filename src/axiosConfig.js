import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:44329", // Replace with your API base URL
});

export default instance;
