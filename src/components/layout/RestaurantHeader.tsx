// import React from 'react';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import placeholder from '../../assets/restaurant.png';
// import { useNavigate } from 'react-router-dom';


// const handleLogout = () => {
//   localStorage.clear();
//   window.location.href = "/"; 
// }

// const RestaurantHeader = () => {
//     const navigate = useNavigate();
//     const handleNav = (link: string) => {
//       navigate(`/profile${link}`);
//     };
//   return (
//     <>
//       <div className='flex items-center justify-between'>
//         <div>logo</div>
//         <div>
//           <Menu as='div' className='relative inline-block text-left'>
//             <div>
//               <MenuButton className='inline-flex  justify-center gap-x-1.5 rounded-full w-10 h-10 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50'>
//                 <img src={placeholder} alt='i age' className='w-full h-full object-cover' />
//               </MenuButton>
//             </div>

//             <MenuItems
//               transition
//               className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
//             >
//               <div className='py-1'>
//              <MenuItem>
//                       <a
//                         href="/restaurant/profile"
//                         className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
//                       >
//                         Your Profile
//                       </a>
//                     </MenuItem>
//                 <MenuItem>
//                   <button
//                     type='button'
//                     onClick={handleLogout}
//                     className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
//                   >
//                     Logout
//                   </button>
//                 </MenuItem>
//               </div>
//             </MenuItems>
//           </Menu>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RestaurantHeader;

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import placeholder from '../../assets/restaurant.png';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const handleLogout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const RestaurantHeader = () => {
  const navigate = useNavigate();

  const handleNav = (link: string) => {
    navigate(`/profile${link}`);
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-4">
      {/* Logo Section */}
      <div className="text-2xl font-bold text-gray-800">
        SnackRush
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications Icon */}
        <button
          type="button"
          className="relative text-gray-600 hover:text-blue-600"
          title="Notifications"
        >
          <FaBell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex justify-center items-center gap-x-1.5 rounded-full w-10 h-10 bg-gray-200 hover:bg-gray-300 transition">
              <img
                src={placeholder}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </MenuButton>
          </div>

          <MenuItems
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <a
                    href="/restaurant/profile"
                    className={`block px-4 py-2 text-sm ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    Your Profile
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    Logout
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default RestaurantHeader;

