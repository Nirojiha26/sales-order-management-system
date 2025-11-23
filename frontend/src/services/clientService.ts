// src/services/clientService.ts
import axios from "axios";

const API_URL = "http://localhost:5167/api/clients";

export const getClients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
