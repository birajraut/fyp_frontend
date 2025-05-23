import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import placeholder from '../../assets/restaurant.png'
import userPlaceHolder from '../../assets/userPlaceholder.png'


const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
};

const user = JSON.parse(localStorage.getItem('user') || '{}');
const AdminHeader = () => {
    return (
        <>
            <div className='bg-white shadow-md px-6 py-4 flex items-center justify-between'>
            <div className='flex flex-col'>
              <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500">
                SnackRush
              </Link>
              <p className="text-lg font-medium text-gray-500">Admin Panel</p>
            </div>
                <div>
                    <Menu as='div' className='relative inline-block text-left'>
                        <div>
                            <MenuButton className='inline-flex  justify-center gap-x-1.5 rounded-full w-10 h-10 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50'>
                                <img src={userPlaceHolder || user?.image} alt='i age' className='w-full h-full object-cover' />
                            </MenuButton>
                        </div>

                        <MenuItems
                            transition
                            className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
                        >
                            <div className='py-1'>
                                <MenuItem>
                                    <button
                                        type='button'
                                        onClick={handleLogout}
                                        className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
                                    >
                                        Logout
                                    </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </>
    );
};

export default AdminHeader;
