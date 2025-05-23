import { authApi } from "./axios";

// Service to create a sale
export const createSale = async (data: any) => {
  return authApi.post('/sale', { ...data });
};

// Service to list orders for users or restaurants
export const listOrder = async ({ user_id, restaurant_id }: { user_id?: string; restaurant_id?: string }) => {
  if (restaurant_id) {
    // Fetch sales for a specific restaurant
    return authApi.post('/restaurant/sales', { restaurant_id });
  } else if (user_id) {
    // Fetch sales for a specific user
    return authApi.post('/sales', { user_id });
  } else {
    throw new Error("Either user_id or restaurant_id must be provided.");
  }
};

// Service to update the delivery status of a sale
export const updateDeliveryStatus = async (data: any) => {
  return authApi.post('/sale/update-delivery-status', { ...data });
};
