import axios from "axios";

const BASE_URL = "http://192.168.100.32:8080"; // Substituir pelo URL real da API

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;