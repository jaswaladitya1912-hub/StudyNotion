// import axios from "axios";

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//   return axiosInstance({
//     method: `${method}`,
//     url: `${url}`,
//     data: bodyData ? bodyData : null,
//     headers: headers ? headers : null,
//     params: params ? params : null,
//   });
// };



import axios from "axios";

// Create a base Axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // must match .env
  withCredentials: true, // needed if backend uses cookies
});

// Wrapper function for making requests
export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,           // GET, POST, etc.
    url: url,                 // full endpoint path (e.g., /auth/login)
    data: bodyData || null,   // request body
    headers: headers || null, // custom headers if needed
    params: params || null,   // query params
  });
};
