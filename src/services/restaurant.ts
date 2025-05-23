import { authApi } from './axios';
import { IRestaurantPayload } from '../types/restaurant';
export const createRestaurant = async (data: IRestaurantPayload | any) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] instanceof File) {
      formData.append(key, data[key]);
    } else {
      formData.append(key, data[key]);
    }
  }
  return authApi.post('/restaurant', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const listRestaurant = async () => {
  return authApi.get('/restaurant');
};

export const resturantDetailsFn = async (id: string) => {
  return authApi.get(`/restaurant/${id}`);
};

export const resturantUpdateAdmin = async (data: any) => {
  return authApi.post(`/admin/restaurant-update`, { ...data });
};

export const updateRestaurantImage = async (id: string, imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  return authApi.put(`/restaurant/${id}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};