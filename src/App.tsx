// import { Route, Routes } from 'react-router-dom';
// import RegisterPage from './pages/register/index';
// import HomePage from './pages/homepage';
// import OtpVerificationPage from './pages/verifyOTP';
// import AboutUs from './pages/aboutUs';
// import ProfilePage from './pages/profile';
// import RestaurantPage from './pages/restaurantPage';
// import LoginPage from './pages/login/index';
// import BlogPage from './pages/blog';
// import CartPage from './pages/cart/cart';
// import TrackProductPage from './pages/trackProduct';
// import CheckoutPage from './pages/checkout/checkout';
// import SuccessPage from './pages/success';
// import OrderPage from './pages/order';
// import ContactUsPage from './pages/contactUS/index';
// import OAuthRedirect from './pages/OAuthRedirect';
// import UserLayout from './components/layout/UserLayout';
// import RestaurantDetail from './pages/restaurantPage/restaurantDetails';
// import { useSelector } from 'react-redux';
// import UserPrivateRoute from './routes/UserPrivateRoute';
// import AdminPrivateRoute from './routes/AdminPrivateRoute';
// import RestaurantLayout from './components/layout/RestaurantLayout';
// import AdminLayout from './components/layout/AdminLayout';
// import RestaurantItemsPage from './pages/restaurant/items';
// import AdminRestaurantPage from "./pages/admin/restaurant/index"
// import AdminRestaurantView from "./components/ui/restaurant/AdminRestuarantView"
// import ForgotPassword from './pages/auth/ForgotPassword';

// const App = () => {
//   const { user, restaurant } = useSelector((state) => state?.auth);
//   console.log(user, 'user');
//   return (
//     <Routes>
//       <Route path='/register' element={<RegisterPage />} />
//       <Route path='/login' element={<LoginPage />} />
//       <Route path='/forgot-password' element={<ForgotPassword />} />
//       <Route path='/verifyOTP' element={<OtpVerificationPage />} />
//       <Route path='/redirect-oAuth' element={<OAuthRedirect />} />

//       {/* user private routes  */}
//       {user ? (
//         <Route path='/' element={<UserLayout />}>
//           <Route index element={<HomePage />} />
//           <Route path='/aboutUs' element={<AboutUs />} />
//           <Route path='/profile' element={<ProfilePage />} />
//           <Route path='/cart' element={<CartPage />} />
//           <Route path='/checkout' element={<CheckoutPage />} />
//           <Route path='/success' element={<SuccessPage />} />
//           <Route path='/orders' element={<OrderPage />} />
//           <Route path='/track/:id' element={<TrackProductPage  />} />
//           <Route path='/restaurants' element={<RestaurantPage />} />
//           <Route path='/blog' element={<BlogPage />} />
//           <Route path='/contactUs' element={<ContactUsPage />} />
//           <Route path='/restaurant/details/:id' element={<RestaurantDetail />} />
//         </Route>

//       ) : restaurant?.id ? (
//         <Route path='/' element={<UserLayout />}>
//           <Route index element={<RestaurantDetail />} />
//           <Route path='/aboutUs' element={<AboutUs />} />
//           <Route path='/profile' element={<ProfilePage />} />
//           <Route path='/cart' element={<CartPage />} />
//           <Route path='/checkout' element={<CheckoutPage />} />
//           <Route path='/success' element={<SuccessPage />} />
//           <Route path='/orders' element={<OrderPage />} />
//           <Route path='/restaurants' element={<RestaurantPage />} />
//           <Route path='/blog' element={<BlogPage />} />
//           <Route path='/contactUs' element={<ContactUsPage />} />
//           <Route path='/restaurant/details/:id' element={<RestaurantDetail />} />
//         </Route>

//       ) : (
//         <Route path='/' element={<UserLayout />}>
//           <Route index element={<HomePage />} />
//           <Route path='/restaurants' element={<RestaurantPage />} />
//           <Route path='/aboutUs' element={<AboutUs />} />
//           <Route path='/blog' element={<BlogPage />} />
//         </Route>
//       )}

//       {/* RestaurantLayout */}
//       <Route path='/restaurant' element={<UserPrivateRoute children={<RestaurantLayout />} />}>
//         <Route index element='Dashboard Restaurant Manager' />
//         <Route path='items' element={<RestaurantItemsPage />} />
//         <Route path='profile' element={<ProfilePage/> }/>
//         <Route path='orders' element={<OrderPage />} />
//         <Route path='teams' element='Dashboard Teams' />
//         <Route path='items/:id' element='Dashboard Teams' />
//       </Route>


//       {/* AdminPrivateRoute */}  
//       <Route path='/admin' element={<AdminPrivateRoute children={<AdminLayout />} />}>
//         <Route index element='Dashboard Admin' />
//         <Route path='restaurants' element={<AdminRestaurantPage />} />
//         <Route path='restaurant/:id' element={<AdminRestaurantView />} />
//       </Route>
      
//     </Routes>

//   );
// };

// export default App;



import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register/index';
import HomePage from './pages/homepage';
import OtpVerificationPage from './pages/verifyOTP';
import AboutUs from './pages/aboutUs';
import ProfilePage from './pages/profile';
import RestaurantPage from './pages/restaurantPage';
import LoginPage from './pages/login/index';
import BlogPage from './pages/blog';
import CreateBlogPage from './pages/createBlog';

import CartPage from './pages/cart/cart';
import TrackProductPage from './pages/trackProduct';
import CheckoutPage from './pages/checkout/checkout';
import SuccessPage from './pages/success';
import OrderPage from './pages/order';
import ContactUsPage from './pages/contactUS/index';
import OAuthRedirect from './pages/OAuthRedirect';
import UserLayout from './components/layout/UserLayout';
import RestaurantDetail from './pages/restaurantPage/restaurantDetails';
import { useSelector } from 'react-redux';
import UserPrivateRoute from './routes/UserPrivateRoute';
import AdminPrivateRoute from './routes/AdminPrivateRoute';
import RestaurantLayout from './components/layout/RestaurantLayout';
import AdminLayout from './components/layout/AdminLayout';
import RestaurantItemsPage from './pages/restaurant/items';
import AdminRestaurantPage from "./pages/admin/restaurant/index"
import AdminRestaurantView from "./components/ui/restaurant/AdminRestuarantView"

import AdminBlogPage from "./pages/admin/blogs/blog";
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import UserListPage from './pages/admin/user/user';
import NotFound from './pages/NotFound/NotFound';
import DashboardPage from './pages/admin/dahboard/dashboard';

const App = () => {
  const { user, restaurant } = useSelector((state) => state?.auth);
  console.log(user, 'user');
  return (
    <Routes>
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/verifyOTP' element={<OtpVerificationPage />} />
      <Route path='/reset-password' element={<ResetPassword />} />

      <Route path='/redirect-oAuth' element={<OAuthRedirect />} />

      {/* Public routes accessible to everyone */}
      <Route path='/' element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/restaurants' element={<RestaurantPage />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/blog/create' element={<CreateBlogPage />} />

        <Route path='/contactUs' element={<ContactUsPage />} />
        <Route path='/restaurant/details/:id' element={<RestaurantDetail />} />
      </Route>

      {/* User private routes */}
      {user && (
        <Route path='/' element={<UserLayout />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/orders' element={<OrderPage />} />
          <Route path='/track/:id' element={<TrackProductPage />} />
        </Route>
      )}

      {/* Restaurant manager private routes */}
      {restaurant?.id && (
        <Route path='/restaurant' element={<UserPrivateRoute children={<RestaurantLayout />} />}>
          <Route index element={<Navigate to='orders' />} />
          <Route path='items' element={<RestaurantItemsPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='orders' element={<OrderPage />} />
          <Route path='teams' element='Dashboard Teams' />
          <Route path='items/:id' element='Dashboard Teams' />
        </Route>
      )}

      {/* Admin private routes */}
      <Route path='/admin' element={<AdminPrivateRoute children={<AdminLayout />} />}>

        <Route index element={<DashboardPage/>} />
        <Route path='/admin/dashboard' element={<DashboardPage/>} />
        <Route path='/admin/users' element={<UserListPage />} />
        <Route path='/admin/blogs' element={<AdminBlogPage />} />

        <Route path='restaurants' element={<AdminRestaurantPage />} />
        <Route path='restaurant/:id' element={<AdminRestaurantView />} />
      </Route>
      <Route path='*' element={<NotFound />} />

    </Routes>
  );
};

export default App;
