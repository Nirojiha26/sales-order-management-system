// src/services/itemService.ts
import axios from "axios";

const API_URL = "http://localhost:5167/api/item";

const itemService = {
  getAllItems: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
};

export default itemService;
