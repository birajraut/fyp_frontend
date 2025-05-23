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