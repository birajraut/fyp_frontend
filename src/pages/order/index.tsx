import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRootReducer } from '../../types/redux';
import { listOrder, updateDeliveryStatus } from '../../services/sale';

const OrderPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((root: IRootReducer) => root.auth);
  const { restaurant } = useSelector((root: IRootReducer) => root.auth);
  const { pathname } = useLocation();
const queryClient= useQueryClient()
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders', user?.user?._id, restaurant?.id],
    queryFn: async () => {
      const isNormalUser = pathname !== '/restaurant/orders';
      const params = isNormalUser
        ? { user_id: user?.user?._id }
        : { restaurant_id: restaurant?.id };

      const response = await listOrder(params);
      return response?.data?.result || [];
    },
  });

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (!user && pathname !== '/restaurant/orders') {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Please log in to view your orders
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        {pathname === '/restaurant/orders' ? 'Restaurant Orders' : 'Your Orders'}
      </h1>

      {isLoading ? (
        <p className="text-center text-lg text-gray-500">Loading orders...</p>
      ) : isError ? (
        <p className="text-center text-lg text-red-500">Failed to load orders. Please try again later.</p>
      ) : orders?.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg p-4">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-800">{order._id}</h2>
                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    order.payment_status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>

              {/* Order Date */}
              <p className="text-gray-600 mb-2">Order Date: {formatDate(order.sale_date)}</p>

              {/* Products */}
              <div className="space-y-4">
                {order.products?.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <img
                      src={item?.product?.image || 'https://via.placeholder.com/100'}
                      alt={item?.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item?.product?.name}</h3>
                      <p className="text-sm text-gray-600">{item?.product?.description}</p>
                      {item?.product?.restaurant && (
                        <>
                          <p className="text-sm text-gray-600">
                            Restaurant: {item?.product?.restaurant?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Address: {item?.product?.restaurant?.address}
                          </p>
                        </>
                      )}
                      <p className="text-sm text-gray-600">
                        Quantity: {item?.quantity} | Price: ${item?.price * item?.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Cost */}
              <div className="mt-4 text-gray-800 font-semibold">
                Total: ${order.total_cost}
              </div>

              {/* Delivery Status */}
              <div className="mt-4 flex items-center justify-between">
                {pathname === '/restaurant/orders' ? (
                  <div>
                    <label htmlFor={`status-${order._id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Update Delivery Status:
                    </label>
                    <select
                      id={`status-${order._id}`}
                      className="block w-full p-2 border border-gray-300 rounded-lg"
                      value={order.delivery_status || ''}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        try {
                          await updateDeliveryStatus({ saleId: order._id, status: newStatus });
                          queryClient.invalidateQueries({queryKey: ['orders']})
                          alert('Delivery status updated successfully!');
                        } catch (err) {
                          console.error('Error updating delivery status', err);
                          alert('Failed to update status.');
                        }
                      }}
                    >
                      <option value="">Select status</option>
                      <option value="Cooking">Cooking</option>
                      <option value="On the way">On the way</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Delivery Status: </span>
                    {order.delivery_status || 'Not Available'}
                  </div>
                )}
                {pathname !== '/restaurant/orders' && order.delivery_status!=='Delivered'&&(
                  <button
                    onClick={() => navigate(`/track/${order._id}`, { state: { order } })}
                    className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
                  >
                    Track
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;

