import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { resturantDetailsFn } from "../../services/restaurant";
import { IRestaurantResponse } from "../../types/restaurant";
import placeholder from "../../assets/restaurantPlaceholder.png";
import { listProduct } from "../../services/productService";
import { GoLocation } from "react-icons/go";
import { CiPhone } from "react-icons/ci";
import { addToCart, removeFromCart, resetCart } from "../../redux/reducers/cartSlice";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const { data: restaurant, isLoading, isError } = useQuery({
    queryKey: ["restaurant-details", id],
    queryFn: async () => resturantDetailsFn(id as string),
  });

  const {
    data: productList,
    isLoading: isLoadingProduct,
    error: errorProduct,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => listProduct(id as string),
  });

  const restaurantData: IRestaurantResponse = restaurant?.data?.result;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading restaurant details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">Error fetching restaurant details.</p>
      </div>
    );
  }

  const getProductQuantity = (productId: string) => {
    const productInCart = cart.find((item) => item._id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  const handleAdd = (product) => {
    if (cart.length > 0) {
      const sameRestaurant = cart[0]?.restaurant?._id === product?.restaurant?._id;

      if (!sameRestaurant) {
        const confirmClearCart = window.confirm(
          "Your cart contains items from another restaurant. Do you want to clear the cart and add this item?"
        );
        if (!confirmClearCart) {
          return;
        }
        dispatch(resetCart());
      }
    }

    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Banner */}
      <div className="relative w-full h-[450px] bg-white">
        <img
          src={restaurantData?.image || placeholder}
          alt={restaurantData?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white">{restaurantData?.name}</h1>
                <p className="text-gray-300 mt-2">{restaurantData?.description}</p>
              </div>
            </div>
            <ul className="text-white space-y-3 mt-6">
              <li className="flex items-center gap-3">
                <GoLocation className="text-xl" />
                <span>{restaurantData?.address || "N/A"}</span>
              </li>
              <li className="flex items-center gap-3">
                <CiPhone className="text-xl" />
                <span>{restaurantData?.phone || "Number not available"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto mb-8">
          {["all", "veg", "nonveg", "snack", "beverage"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTab(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedTab === type
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {isLoadingProduct ? (
          <p className="text-center text-lg text-gray-500">Loading products...</p>
        ) : errorProduct ? (
          <p className="text-center text-lg text-red-500">Error loading products.</p>
        ) : (
          <div className="space-y-6">
            {productList?.data?.result
              ?.filter(
                (product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (selectedTab === "all" || product.foodtype === selectedTab)
              )
              .map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-6 bg-white shadow-md rounded-lg p-4"
                >
                  <img
                    src={product.image || placeholder}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    <p className="text-sm text-gray-800 font-semibold mt-2">
                      Price: Rs. {product.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleRemove(product._id)}
                      disabled={getProductQuantity(product._id) === 0}
                      className={`px-4 py-2 rounded-lg ${
                        getProductQuantity(product._id) > 0
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800">
                      {getProductQuantity(product._id)}
                    </span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
