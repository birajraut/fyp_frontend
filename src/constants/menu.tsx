import {
  RxBackpack,
  RxBookmark,
  RxDashboard,
  RxLapTimer,
  RxListBullet,
  RxMagicWand,
  RxPerson,
} from 'react-icons/rx';

export const mainMenu = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '/restaurants',
    title: 'Restaurants',
  },
  {
    link: '/blog',
    title: 'Blog',
  },
  {
    link: '/aboutUs',
    title: 'About Us',
  },
];

export const mainMenuRestaurantManager = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '/blog',
    title: 'Blog',
  },
  {
    link: '/aboutUs',
    title: 'About Us',
  },
];

export const restaurantMenu = [
  {
    link: '/items',
    title: 'Items',
    icon: <RxListBullet />,
  },

  {
    link: '/orders',
    title: 'Orders',
    icon: <RxMagicWand />,
  },
];



export const adminMenu = [
  {
    link: '/',
    title: 'Dashboard',
    icon: <RxDashboard />,
  },

  {
    link: '/restaurants',
    title: 'Restaurants',
    icon: <RxListBullet />,
  },

  {
    link: '/users',
    title: 'Users',
    icon: <RxPerson />,
  },
  {
    link: '/blogs',
    title: 'Blogs',
    icon: <RxBookmark
     />,
  },


];
