// src/services/itemService.ts
import axios from "axios";

const API_URL = "http://localhost:5167/api/items";

export const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
