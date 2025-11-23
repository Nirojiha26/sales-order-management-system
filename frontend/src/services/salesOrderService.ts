// src/services/salesOrderService.ts
import axios from "axios";

const API_URL = "http://localhost:5167/api/salesorder";

const salesOrderService = {
  getSalesOrders: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getSalesOrderById: async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createSalesOrder: async (order: any) => {
    const response = await axios.post(API_URL, order);
    return response.data;
  },

  updateSalesOrder: async (id: number, order: any) => {
    const response = await axios.put(`${API_URL}/${id}`, order);
    return response.data;
  }
};

export default salesOrderService;
