import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { setAccessToken, setLoginAs, setRefreshToken, setRestaurant, setUser } from '../../redux/reducers/authSlice';
import { restaurantLogin } from "../../services/auth"

const RestaurantLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be 20 characters or less')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await restaurantLogin(values)
        dispatch(setAccessToken(response.data.result.accessToken))
        dispatch(setRefreshToken(response.data.result.refreshToken))
        dispatch(setUser(response.data.result?.user))
        dispatch(setRestaurant(response.data?.result?.restaurant))
        dispatch(setLoginAs('RESTAURANT'))
        navigate('/restaurant');
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setErrors({ email: error.response?.data.message || 'Invalid email or password' });
        } else {
          setErrors({ email: 'An unknown error occurred' });
        }
      }
      setSubmitting(false);
    }
  });

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Login as Restaurant Manager</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="rememberMe"
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                  className="mr-2"
                />
                Remember Me
              </label>
              <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RestaurantLoginPage