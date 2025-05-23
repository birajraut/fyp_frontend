// import { useSelector } from "react-redux";
// import userPlaceholder from "../../assets/userPlaceholder.png";
// import { useRef, useState } from "react";
// import axios from "axios";
// import { LuFilePen } from "react-icons/lu";
// import { updateRestaurantImage } from "../../services/restaurant";

// const Profile = () => {
//   const auth = useSelector((state) => state?.auth);
//   const user = auth?.user?.user;
//   const restaurant = auth.restaurant;


//   console.log(restaurant,'restaurant')
//   const [imageUrl, setImageUrl] = useState(restaurant.image||user?.image||userPlaceholder);
//   const inputFileRef = useRef();

// /*************  ✨ Windsurf Command ⭐  *************/
// /**
//  * Triggers a click event on the hidden file input element to allow the user to select a new image.
//  */

// /*******  2bca3734-9040-4e8c-8d81-119ee17fc6d0  *******/
//   const handleEditClick = () => {
//     inputFileRef.current.click(); // Trigger hidden file input
//   };

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const token = auth?.accessToken; // Assuming token is stored in Redux
//       const restaurantId = restaurant?._id;

//       const response = await updateRestaurantImage(restaurantId, file);

// console.log(response,'image response')
//       const newImage = response?.data?.result?.image;
//       if (newImage) {
//         setImageUrl(newImage); // Update UI instantly
//       }
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       alert("Failed to upload image");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="p-6 max-w-lg mx-auto">
//         <h2 className="text-3xl font-bold mb-4">User Profile</h2>
//         {user ? (
//           <div className="bg-white p-6 rounded-lg shadow-md relative">
//             {/* Image Container */}
//             <div className="relative w-24 h-24 mx-auto group">
//               <img
//                 src={imageUrl}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover"
//               />

//               {/* Edit Button */}
//               <button
//                 onClick={handleEditClick}
//                 className="absolute bottom-0 right-0 bg-black text-white text-xs p-1 rounded-full opacity-75 group-hover:opacity-100"
//                 title="Edit Image"
//               >
//                <LuFilePen/>
//               </button>

//               {/* Hidden File Input */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 ref={inputFileRef}
//                 className="hidden"
//               />
//             </div>

//             {/* User Info */}
//             <h3 className="text-xl font-semibold text-center mt-4">{user.fullName}</h3>
//             <p className="text-gray-700 text-center">{user.email}</p>

//             {user.address && (
//               <div className="mt-4">
//                 <strong>Address:</strong>
//                 <p className="text-gray-700">{user.address}</p>
//               </div>
//             )}
//             {user.contactNumber && (
//               <div className="mt-4">
//                 <strong>Contact Number:</strong>
//                 <p className="text-gray-700">{user.contactNumber}</p>
//               </div>
//             )}
//             {user.isGoogleUser && (
//               <div className="mt-4">
//                 <strong>Google User:</strong>
//                 <p className="text-green-500">This account was created using Google</p>
//               </div>
//             )}

//             {restaurant && (
//               <div className="mt-6 border-t pt-4">
//                 <h4 className="text-lg font-semibold mb-2">Restaurant Details</h4>
//                 {restaurant.name && (
//                   <p>
//                     <strong>Name:</strong> {restaurant.name}
//                   </p>
//                 )}
//                 {restaurant.address && (
//                   <p>
//                     <strong>Address:</strong> {restaurant.address}
//                   </p>
//                 )}
//                 {restaurant.contact && (
//                   <p>
//                     <strong>Contact:</strong> {restaurant.contact}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         ) : (
//           <p className="text-gray-700 text-center">No user data found. Please log in.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useSelector } from "react-redux";
import userPlaceholder from "../../assets/userPlaceholder.png";
import { useRef, useState } from "react";
import { LuFilePen } from "react-icons/lu";
import { updateRestaurantImage } from "../../services/restaurant";

const Profile = () => {
  const auth = useSelector((state) => state?.auth);
  const user = auth?.user?.user;
  const restaurant = auth?.restaurant;

  const [imageUrl, setImageUrl] = useState(
    restaurant?.image || user?.image || userPlaceholder
  );
  const inputFileRef = useRef();

  const handleEditClick = () => {
    inputFileRef.current.click(); // Trigger hidden file input
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const restaurantId = restaurant?._id;
      const response = await updateRestaurantImage(restaurantId, file);

      const newImage = response?.data?.result?.image;
      if (newImage) {
        setImageUrl(newImage); // Update UI instantly
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          User Profile
        </h2>

        {user ? (
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="relative w-32 h-32">
              <img
                src={imageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
              />
              <button
                onClick={handleEditClick}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
                title="Edit Image"
              >
                <LuFilePen size={16} />
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputFileRef}
                className="hidden"
              />
            </div>

            {/* User Info */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                {user.fullName}
              </h3>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* Additional User Info */}
            <div className="mt-8 w-full">
              {user.address && (
                <div className="flex justify-between items-center border-b py-4">
                  <span className="font-semibold text-gray-700">Address:</span>
                  <span className="text-gray-600">{user.address}</span>
                </div>
              )}
              {user.contactNumber && (
                <div className="flex justify-between items-center border-b py-4">
                  <span className="font-semibold text-gray-700">
                    Contact Number:
                  </span>
                  <span className="text-gray-600">{user.contactNumber}</span>
                </div>
              )}
              {user.isGoogleUser && (
                <div className="flex justify-between items-center border-b py-4">
                  <span className="font-semibold text-gray-700">
                    Google User:
                  </span>
                  <span className="text-green-500">
                    This account was created using Google
                  </span>
                </div>
              )}
            </div>

            {/* Restaurant Info */}
            {restaurant && (
              <div className="mt-10 w-full">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  Restaurant Details
                </h4>
                {restaurant.name && (
                  <div className="flex justify-between items-center border-b py-4">
                    <span className="font-semibold text-gray-700">Name:</span>
                    <span className="text-gray-600">{restaurant.name}</span>
                  </div>
                )}
                {restaurant.address && (
                  <div className="flex justify-between items-center border-b py-4">
                    <span className="font-semibold text-gray-700">
                      Address:
                    </span>
                    <span className="text-gray-600">{restaurant.address}</span>
                  </div>
                )}
                {restaurant.contact && (
                  <div className="flex justify-between items-center border-b py-4">
                    <span className="font-semibold text-gray-700">
                      Contact:
                    </span>
                    <span className="text-gray-600">{restaurant.contact}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-700">
            No user data found. Please log in.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;