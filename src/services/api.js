import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async config => {
  const userData = localStorage.getItem("devburger:userData");
  const token = userData && JSON.parse(userData).token;

    console.log("Token enviado na requisição:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
