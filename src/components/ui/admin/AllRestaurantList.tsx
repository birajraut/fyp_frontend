// import React, { useMemo, useState } from 'react';
// import CustomButton from "../CustomButton"
// import { LuEye } from "react-icons/lu";
// import { RestaurantViewForm } from "../forms/restaurantViewForm";
// import { useNavigate } from "react-router-dom";
// import moment from "moment"

// interface IProps {
//     restaurantList: any;
//     search?: string;
// }

// const AllRestaurantList = ({ restaurantList }: IProps) => {

//     const navigate = useNavigate();
    
//     const filteredRestaurants = useMemo(() => {
//         if (!search?.trim()) return restaurantList;
//         return restaurantList?.filter((item) => {
//           const name = item?.name?.toLowerCase() || "";
//           const location = item?.location?.toLowerCase() || "";
//           return name.includes(search.toLowerCase()) || location.includes(search.toLowerCase());
//         });
//       }, [search, restaurantList]);
      
//     const handleCLick = (id: string) => {
//         navigate(`/admin/restaurant/${id}`)
//     }
//     return (
//         <>
//             <div className="bg-white  rounded-md overflow-hidden">
//                 <table className="table-auto w-full">
//                     <thead className="text-left border-b bg-blue-500 text-white">
//                         <tr >
//                             <th className="p-5">Name</th>
//                             <th>Owner</th>
//                             <th>Status</th>
//                             <th>Created Date</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody >
//                         {
//                             restaurantList?.map((item, index) => {
//                                 return (
//                                     <tr key={index} className="border-b">
//                                         <td className="p-5">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-10 h-10 rounded-md overflow-hidden">
//                                                     <img src={item.image} alt="" className="w-full h-full object-cover" />
//                                                 </div>
//                                                 <div>
//                                                     <div className="font-semibold text-slate-700">{item.name}</div>
//                                                     <div className="text-xs text-gray-500 ">{item.location}</div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="py-5">{item?.creator?.fullName}</td>
//                                         <td className="py-5">
//                                             <button
//                                                 type="button"
//                                                 className={`py-2 px-6 text-xs rounded-full capitalize
//                                                     ${item.status?.toLowerCase() === "accepted" ? "bg-green-100 text-green-700" :
//                                                     item.status?.toLowerCase() === "rejected" ? "bg-red-100 text-red-700" :
//                                                     "bg-gray-100 text-darkGray-600"}`}>
//                                                 {item.status?.toLowerCase()}
//                                                 </button>

//                                         </td>
//                                         <td className="py-5">{ item.createdAt && moment(item.createdAt).fromNow()}</td>
//                                         <td className="py-5">

//                                             <CustomButton icon={<LuEye />} showIcon type="button" onClick={() => handleCLick(item._id)} label={'View'} />
//                                         </td>
//                                     </tr>
//                                 )
//                             })
//                         }

//                     </tbody>
//                 </table>
//             </div>

//         </>
//     )
// }

// export default AllRestaurantList

import React, { useMemo } from "react";
import CustomButton from "../CustomButton";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import restaurant from "../../../assets/restaurant.png";

interface IProps {
  restaurantList: any;
  search?: string;
}

const AllRestaurantList = ({ restaurantList, search }: IProps) => {
  const navigate = useNavigate();

  const handleCLick = (id: string) => {
    navigate(`/admin/restaurant/${id}`);
  };

  const filteredRestaurants = useMemo(() => {
    if (!search?.trim()) return restaurantList;
    const lowerSearch = search.toLowerCase();

    return restaurantList?.filter((item) => {
      const restName = item?.name?.toLowerCase() || "";
      const ownerName = item?.creator?.fullName?.toLowerCase() || "";
      return (
        restName.includes(lowerSearch) || ownerName.includes(lowerSearch)
      );
    });
  }, [search, restaurantList]);

  return (
    <div className="bg-white rounded-md overflow-hidden">
      <table className="table-auto w-full">
        <thead className="text-left border-b bg-blue-500 text-white">
          <tr>
            <th className="p-5">Name</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRestaurants?.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img
                      src={item.image || restaurant}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.location}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-5">{item?.creator?.fullName}</td>
              <td className="py-5">
                <button
                  type="button"
                  className={`py-2 px-6 text-xs rounded-full capitalize ${
                    item.status?.toLowerCase() === "accepted"
                      ? "bg-green-100 text-green-700"
                      : item.status?.toLowerCase() === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status?.toLowerCase()}
                </button>
              </td>
              <td className="py-5">
                {item.createdAt && moment(item.createdAt).fromNow()}
              </td>
              <td className="py-5">
                <CustomButton
                  icon={<LuEye />}
                  showIcon
                  type="button"
                  onClick={() => handleCLick(item._id)}
                  label={"View"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRestaurantList;
