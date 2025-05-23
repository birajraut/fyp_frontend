import { NavLink, useNavigate, useLocation, data } from "react-router-dom";
import Button from "../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { IRootReducer } from "../../types/redux";
import { mainMenu, mainMenuRestaurantManager } from "../../constants/menu";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import userPlaceholder from "../../assets/userPlaceholder.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { setLoginAs, setRestaurant, setUser } from "../../redux/reducers/authSlice";
import { use } from "react";

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, user } = useSelector((root: IRootReducer) => root.auth);
  const cart = useSelector((state) => state.cart.cart);

  const isAuthorized = !!accessToken;


  // Filter menu items (ensure "Restaurants" is always visible)
  const filteredMenu = mainMenu.map((item) => {
    return item; // No filtering logic here to ensure all menu items are visible
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleCart = () => {
    navigate("cart");
  };

  const handleRestaurantSwitch = (restaurant) => {
    const restData = {
      ...restaurant,
      id: restaurant._id,
    };
    dispatch(setRestaurant(restData));
    dispatch(setLoginAs("RESTAURANT"));
    navigate("/restaurant");
  };

  console.log("user", user);

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <h1 className="text-3xl font-bold text-red-600">SnackRush</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {filteredMenu?.map((item, index: number) => {
                const isActive = location?.pathname === item.link;
                return (
                  <NavLink
                    to={item.link}
                    key={index}
                    className={`text-gray-700 hover:text-red-600 transition-colors font-medium ${
                      isActive ? "text-red-600 border-b-2 border-red-600" : ""
                    }`}
                  >
                    {item.title}
                  </NavLink>
                );
              })}
            </div>

            {/* Right Side Icons and Auth */}
            <div className="flex items-center space-x-6">
              {!isAuthorized ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  {/* Shopping Cart */}
                  <div
                    className="relative cursor-pointer group"
                    onClick={handleCart}
                  >
                    <AiOutlineShoppingCart className="text-2xl text-gray-700 group-hover:text-red-600 transition-colors" />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </div>

                  {/* User Profile */}
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center space-x-2 focus:outline-none">
                      <div className="relative">
                        <img
                          alt=""
                          src={user?.image || userPlaceholder}
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-red-600 transition-colors"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white py-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      {/* User Info */}
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          Hey! {user?.user?.fullName || "Users"}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="/orders"
                              className={`flex items-center px-4 py-2 text-sm ${
                                active
                                  ? "bg-gray-50 text-red-600"
                                  : "text-gray-700"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                              </svg>
                              Orders
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="/profile"
                              className={`flex items-center px-4 py-2 text-sm ${
                                active
                                  ? "bg-gray-50 text-red-600"
                                  : "text-gray-700"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              Your Profile
                            </a>
                          )}
                        </MenuItem>

                        {/* Restaurant Section */}
                        {user?.restaurant?.length > 0 && (
                          <>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 border-t border-gray-100 mt-2">
                              Your Restaurants
                            </div>
                            {user.restaurant.map((item) => (
                              <MenuItem key={item._id}>
                                {({ active }) => (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRestaurantSwitch(item)
                                    }
                                    className={`flex items-center w-full px-4 py-2 text-sm ${
                                      active
                                        ? "bg-gray-50 text-red-600"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 mr-3"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                      />
                                    </svg>
                                    {item.name}
                                  </button>
                                )}
                              </MenuItem>
                            ))}
                          </>
                        )}

                        {user?.user?.role === 'ADMIN' && (
                          <MenuItem>
                            {({ active }) => (
                              <a
                                href="/admin"
                                className={`flex items-center px-4 py-2 text-sm ${
                                  active ? "bg-gray-50 text-red-600" : "text-gray-700"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
                                  />
                                </svg>
                                Admin Dashboard
                              </a>
                            )}
                          </MenuItem>
                        )}



                        {/* Logout */}
                        <div className="border-t border-gray-100 mt-2">
                          <MenuItem>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={handleLogout}
                                className={`flex items-center w-full px-4 py-2 text-sm ${
                                  active
                                    ? "bg-gray-50 text-red-600"
                                    : "text-gray-700"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  />
                                </svg>
                                Logout
                              </button>
                            )}
                          </MenuItem>
                        </div>
                      </div>
                    </MenuItems>
                  </Menu>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserHeader;
