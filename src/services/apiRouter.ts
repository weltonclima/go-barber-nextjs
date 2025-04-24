import axios from "axios";


export function setupApi() {
  const api = axios.create({
    baseURL: process.env.BASE_URL_GOOGLE
  });

  return api
}

export const router = setupApi();