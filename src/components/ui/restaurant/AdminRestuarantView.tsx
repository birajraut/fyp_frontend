// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { resturantDetailsFn, resturantUpdateAdmin } from "../../../services/restaurant";
// import toast from "react-hot-toast";



// const AdminRestaurantView = () => {

//     const navigate = useNavigate()
//     const { id } = useParams()

//     const { data } = useQuery({
//         queryKey: ['admin-restaurant-details', id],
//         queryFn: async () => await resturantDetailsFn(id as string)
//     })

//     console.log(data)

//     const restaurant = data?.data?.result
//     // Example placeholder handler functions
//     const handleAccept = async () => {


//         await resturantUpdateAdmin({ status: 'ACCEPTED', restaurant_id: restaurant?._id })

//         toast.success('Restaurant Accepted')
//         navigate('/admin/restaurants')



//     };

//     const handleReject = async () => {
//         await resturantUpdateAdmin({ status: 'REJECTED', restaurant_id: restaurant?._id })
//         toast.error('Restaurant Rejected')
//         navigate('/admin/restaurants')

//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
//             <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6 space-y-6">
//                 {/* Banner Image */}
//                 <img
//                     src={restaurant?.banner || "https://source.unsplash.com/800x400/?restaurant"}
//                     alt="Restaurant"
//                     className="w-full h-64 object-cover rounded-xl"
//                 />

//                 <div className="space-y-2">
//                     {/* Restaurant Logo */}
//                     <div className="flex items-center gap-4 mt-4">
//                         <div className="w-16 h-16 rounded-full overflow-hidden">
//                             <img
//                                 src={restaurant?.image || "https://source.unsplash.com/100x100/?logo"}
//                                 alt="Restaurant Logo"
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                         <div className="font-semibold text-lg">{restaurant?.name || "Restaurant Name"}</div>
//                     </div>

//                     <p className="text-gray-600 text-sm mt-2">
//                         {restaurant?.description || "Restaurant description goes here."}
//                     </p>
//                 </div>

//                 {/* Restaurant Info */}
//                 <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
//                     <div>
//                         <p className="font-medium">Address:</p>
//                         <p>{restaurant?.location || "Address not provided"}</p>
//                     </div>
//                     <div>
//                         <p className="font-medium">Phone:</p>
//                         <p>{restaurant?.phone || "Phone number not available"}</p>
//                     </div>
//                     <div>
//                         <p className="font-medium">Email:</p>
//                         <p>{restaurant?.email || "Email not available"}</p>
//                     </div>
//                     <div>
//                         <p className="font-medium">Rating:</p>
//                         <p>{restaurant?.rating || "No rating available"}</p>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end space-x-4 mt-6">
//                     <button
//                         onClick={handleReject}
//                         className="px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 transition"
//                     >
//                         Reject
//                     </button>
//                     <button
//                         onClick={handleAccept}
//                         className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
//                     >
//                         Accept
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminRestaurantView;

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { resturantDetailsFn, resturantUpdateAdmin } from "../../../services/restaurant";
import toast from "react-hot-toast";

const AdminRestaurantView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["admin-restaurant-details", id],
    queryFn: async () => await resturantDetailsFn(id as string),
  });

  const restaurant = data?.data?.result;

  const handleAccept = async () => {
    await resturantUpdateAdmin({ status: "ACCEPTED", restaurant_id: restaurant?._id });
    toast.success("Restaurant Accepted");
    navigate("/admin/restaurants");
  };

  const handleReject = async () => {
    await resturantUpdateAdmin({ status: "REJECTED", restaurant_id: restaurant?._id });
    toast.error("Restaurant Rejected");
    navigate("/admin/restaurants");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Banner Image */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden">
          <img
            src={restaurant?.image || "https://source.unsplash.com/800x400/?restaurant"}
            alt="Restaurant Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Restaurant Details */}
        <div className="flex items-start gap-6">

          {/* Restaurant Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{restaurant?.name || "Restaurant Name"}</h1>
            <p className="text-sm text-gray-600 mt-2">{restaurant?.description || "No description provided."}</p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
              <div>
                <p className="font-medium">Address:</p>
                <p>{restaurant?.address || "Address not provided"}</p>
              </div>
              <div>
                <p className="font-medium">Phone:</p>
                <p>{restaurant?.phone || "Phone number not available"}</p>
              </div>
              
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleReject}
            className="px-6 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRestaurantView;