// src/services/productService.ts
import axios from 'axios';
import { authApi } from './axios';

// API endpoint for creating a new product
const API_URL = '/product'; // Adjust the API URL if needed

// Function to create a new product (menu item)

export const listProduct = async (id: string) => {
  try {
    const response = await authApi.get(API_URL + `/${id}`);

    return response; // Return the response data (you can adjust this based on your backend response)
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
};

export const createProduct = async (data: any) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);
    } else {
      formData.append(key, data[key]);
    }
  }

  return await authApi.post('product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

};
export const updateProduct = async (id:string,data: any) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);
    } else {
      formData.append(key, data[key]);
    }
  }
  return await authApi.put(`product/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};




export const restaurantOwnerProducts = async (restaurant_id:string)=>{
  return authApi.post('restaurant-owener/products', {restaurant_id});
}

export const getProductLocation = async (id: string) => {
  const response = await axios.get<{ latitude: number; longitude: number }>(`${API_URL}/${id}/location`);
  return response.data;
};
