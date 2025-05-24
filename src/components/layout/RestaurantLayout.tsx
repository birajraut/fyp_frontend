import { Link } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaUtensils, FaSignOutAlt } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authSlice';

const RestaurantLayout = () => {
  const dispatch= useDispatch()
  const navigate=useNavigate()

  const handleLogout = () => {
    // Add logout functionality here
    dispatch(logout());
    navigate('/');

    console.log('Logout clicked');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[250px] bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500">
                SnackRush
              </Link>
          <p className="text-sm text-gray-500">Restaurant Manager</p>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          {/* <a
            href="/restaurant"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaChartPie size={20} />
            <span>Dashboard</span>
          </a> */}
          <a
            href="/restaurant/items"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <MdFastfood size={20} />
            <span>Menu Items</span>
          </a>
          <a
            href="/restaurant/orders"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaUtensils size={20} />
            <span>Orders</span>
          </a>
          {/* <a
            href="/settings"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaCog size={20} />
            <span>Settings</span>
          </a> */}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-gray-100 p-3 rounded-lg transition w-full"
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Welcome, Manager</h2>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-blue-600">
              Notifications
            </button>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header> */}

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RestaurantLayout;