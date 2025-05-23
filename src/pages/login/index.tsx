import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { setAccessToken, setLoginAs, setRefreshToken, setUser } from '../../redux/reducers/authSlice';
import { login } from "../../services/auth"

const LoginPage = () => {
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
        const response = await login(values)
        dispatch(setAccessToken(response.data.result.accessToken))
        dispatch(setRefreshToken(response.data.result.refreshToken))
        dispatch(setUser(response.data.result?.user))


        if (response?.data?.result?.user?.role === 'ADMIN') {
          dispatch(setLoginAs('ADMIN'))
          navigate('/admin');
        }

        if (response?.data?.result?.user?.role === 'USER') {
          dispatch(setLoginAs('USER'))
          navigate('/');
        }

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

  const handleGoogleLogin = () => {

    window.location.href = "http://localhost:8000/auth/google";
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
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
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>

            {/* <div className="flex justify-center">
              <button onClick={handleGoogleLogin} type='button'>Login with google</button>
            </div> */}
            <div className="flex justify-center">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full py-3 px-6  bg-white border border-gray-300 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
              >
                {/* Google Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                >
                  <path
                    d="M23.49 12.3c0-.72-.06-1.38-.18-2H12v3.08h6.53c-.28 1.55-1.1 2.87-2.38 3.57v3h3.8c2.23-2.06 3.5-5.1 3.5-8.65z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 6.08c1.12 0 2.08.38 2.85 1.02L16.9 4.24A5.929 5.929 0 0 0 12 3C8.29 3 5.02 5.41 3.81 8.76l3.9 3.06C8.02 9.8 9.52 8.08 12 6.08z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.81 8.76c-.13-.39-.2-.81-.2-1.26s.07-.87.2-1.26V4.24H.02C.01 5.41 1.45 6.75 3.81 8.76z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 3c1.54 0 2.91.54 4.03 1.43l2.85-2.85C16.66.9 14.42 0 12 0 7.03 0 3.61 2.24 1.94 5.61l3.9 3.06C6.11 6.53 8.02 3 12 3z"
                    fill="#EA4335"
                  />
                </svg>
                Login with Google
              </button>
            </div>

          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage