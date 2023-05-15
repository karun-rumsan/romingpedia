import axios from "axios";

// const devEnv = process.env.NODE_ENV !== "prod";
// const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: process.env.REACT_APP_PROD_API,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//post
export const signUp = (formData) => API.post("/users/signup", formData);
export const signIn = (formData) => API.post("/users/signin", formData);
export const googleSignIn = (result) => API.post("/users/googlesignin", result);
export const createTour = (tourData) => API.post("/tour", tourData);
export const getRelatedTour = (tags) => API.post(`/tour/relatedTour`, tags);

//get
export const getTours = (page) => API.get(`/tour?page=${page}`);
export const getTour = (id) => API.get(`/tour/${id}`);
export const getToursByUser = (id) => API.get(`/tour/userTours/${id}`);

export const searchTours = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);
export const searchByTag = (tag) => API.get(`/tour/tag/${tag}`);

//patch and delete
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (id, updatedTourData) =>
  API.patch(`/tour/${id}/`, updatedTourData);

export const likeTour = (id) => API.patch(`/tour/like/${id}`);
