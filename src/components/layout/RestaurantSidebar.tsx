import React from 'react';

import { restaurantMenu } from '../../constants/menu';
import { useNavigate } from 'react-router-dom';

const RestaurantSidebar = () => {
  const navigate = useNavigate();

  const handleNav = (link: string) => {
    navigate(`/restaurant${link}`);
  };
  return (
    <>
      <div>
        <ul className='space-y-4'>
          {restaurantMenu.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => handleNav(item.link)}
                className='p-3 bg-white rounded-md font-semibold flex items-center gap-5 w-full cursor-pointer hover:bg-slate-100 text-slate-700 hover:border-l-2 border-pink-500'
              >
                <div>{item.icon}</div>
                <div> {item.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default RestaurantSidebar;
