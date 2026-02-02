import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-backend-u5f9.onrender.com/",
});

export default API;
