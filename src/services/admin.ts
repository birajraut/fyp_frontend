import { authApi } from './axios';

export const restaurantListAdmin = async (status: string) => {
  return authApi.get(`admin/restaurant-list?status=${status}`);
};

export const adminDashboard = async () => {
  return authApi.get('/admin/dashboard');
};

