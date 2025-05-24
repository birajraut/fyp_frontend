// import React from "react";
import { FaUsers, FaMoneyBillWave, FaShoppingBag } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
// import { listUsers } from "../../../services/user";
import CustomCard from "../../../components/ui/CustomCard";
import { adminDashboard } from "../../../services/admin";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () =>  await adminDashboard(),
  });
  const { pathname } = useLocation();
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  const stats = data?.data?.result || {};
  console.log(stats, "dashboard user data");
const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Superadmin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <CustomCard
          icon={<FaShoppingBag size={24} />}
          label="Total Orders"
          value={stats?.totalOrders || 0}
          // bgColor="bg-blue-100"
        />
        <CustomCard
          icon={<FaUsers size={24} />}
          label="Total Customers"
          value={stats?.totalCustomers || 1}
          // bgColor="bg-green-100"
        />
        <CustomCard
          icon={<FaMoneyBillWave size={24} />}
          label="Revenue"
          value={`₹ ${stats?.revenue?.toLocaleString() || 0}`}
          // bgColor="bg-yellow-100"
        />
        {/* <CustomCard
          icon={<FaHamburger size={24} />}
          label="Top Dish"
          value={stats?.topDish || "N/A"}
          bgColor="bg-pink-100"
        /> */}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6 gap-2">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Loading data...</p>
        ) : isError ? (
          <p className="text-center text-lg text-red-500">Failed to fetch data.</p>
        ) : 

            stats?.recentOrders?.map((order:any) => (
                <div key={order._id} className="bg-white rounded-lg shadow-lg p-4 mb-2">
                          {/* Order Header */}
                          <div className="flex items-center justify-between mb-1">
                            <h2 className=" text-gray-900"><span className="font-semibold">{order.restaurant_id.name}</span> #{order._id}</h2>
                            <span
                              className={`px-4 py-2 rounded-full text-white ${
                                order?.payment_status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                            >
                              {order.payment_status}
                            </span>
                          </div>
            
                          {/* Order Date */}
                          <p className="text-gray-600 mb-2">Order Date: {formatDate(order.sale_date)}</p>
            
                          {/* Products */}
                          <div className="space-y-4">
                            {order.products?.map((item:any, index:number) => (
                              <div key={index} className="flex items-start space-x-4">
                                <img
                                  src={item?.product_id?.image || 'https://via.placeholder.com/100'}
                                  alt={item?.product_id?.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">{item?.product_id?.name}</h3>
                                  <p className="text-sm text-gray-600">{item?.product_id?.description}</p>
                                  {item?.restaurant_id && (
                                    <>
                                      <p className="text-sm text-gray-600">
                                        Restaurant: {item?.product.restaurant?.name}
                                      </p>
                                      {/* <p className="text-sm text-gray-600">
                                        Address: {item?.product.restaurant?.address}
                                      </p> */}
                                    </>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    Quantity: {item?.quantity} | Price: Rs. {item?.price * item?.quantity}
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
                              <div className="text-sm text-gray-700">
                                <span className="font-medium">Delivery Status: </span>
                                {order.delivery_status || 'Not Available'}
                              </div>
                            
                            {pathname !== '/restaurant/orders' && order?.delivery_status!=='Delivered'&&(
                              <button
                                onClick={() => navigate(`/track/${order._id}`, { state: { order } })}
                                className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
                              >
                                Track
                              </button>
                            )}
                          </div>
                        </div>
            ))
      
        }
      </div>
    </div>
  );
};

export default DashboardPage;
