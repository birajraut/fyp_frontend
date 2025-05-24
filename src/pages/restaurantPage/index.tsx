import { useState } from "react";
import { useSelector } from "react-redux";
import Model from "../../components/ui/Model";
import RestaurantCreateForm from "../../components/ui/forms/RestaurantCreateForm"
import { LuHotel } from "react-icons/lu";
import { listRestaurant } from "../../services/restaurant"
import { useQuery } from "@tanstack/react-query";
import { IRestaurantResponse } from "../../types/restaurant"
import RestaurantCard from "../../components/ui/restaurant/RestaurantCard"
import CustomButton from "../../components/ui/CustomButton";
import { CiCirclePlus } from "react-icons/ci";
import { IRootReducer } from "../../types/redux";

const categories = [
  "Nepali",
  "Indian",
  "Chinese",
  "Continental"
];

const RestaurantPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const { accessToken } = useSelector((state: IRootReducer) => state.auth);

  const { data: restaurantList, isLoading } = useQuery({
    queryKey: ['restaurant-list', isModalOpen],
    queryFn: async () => listRestaurant()
  });

  const filteredRestaurants = restaurantList?.data?.result?.filter((restaurant:any) => {
    if (selectedCategory === '') return true;
    return restaurant.category === selectedCategory;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Model 
        openModel={isModalOpen} 
        setModelOpen={setIsModalOpen} 
        title="Request for restaurant registration" 
        body={<RestaurantCreateForm setIsModalOpen={setIsModalOpen} />} 
        icon={<LuHotel />} 
        showIcon 
      />

      <div className="flex items-center justify-between bg-purple-100 p-4 rounded-md mb-10">
        <h1 className="text-2xl font-bold text-purple-700">Restaurants</h1>

        {accessToken && (
          <div className="flex justify-end">
            <CustomButton 
              type="button" 
              onClick={() => setIsModalOpen(true)} 
              label='Register Your Restaurant' 
              icon={<CiCirclePlus />} 
              showIcon 
              className="font-bold text-md bg-pink-500" 
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-gray-600 text-lg">Filter by category:</p>
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value as string | null)}
          className="bg-white border border-gray-300 rounded-md p-2"
        >
          <option value={''}>All</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {filteredRestaurants?.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No restaurants available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredRestaurants?.map((restaurant: IRestaurantResponse) => (
            <RestaurantCard 
              key={restaurant._id}
              id={restaurant._id} 
              title={restaurant.name} 
              description={restaurant.description} 
              logo={restaurant.image || ''} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;

