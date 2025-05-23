import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import CustomButton from '../../components/ui/CustomButton';
import Input from '../../components/ui/Input';
import { register } from '../../services/auth';

const UserRegisterPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Full Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be 20 characters or less')
        .required('Password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await register(values)
        localStorage.setItem('email', values?.email?.toString());
        navigate('/verifyOTP');
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrors({ email: error.response?.data.message || 'An error occurred' });
        } else {
          setErrors({ email: 'An unknown error occurred' });
        }
      }
      setSubmitting(false);
    },
  });



  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-200 h-screen w-full gap-10'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg'>
        <h2 className='font-semibold text-center text-slate-800'>Create User Account</h2>
        <form onSubmit={formik.handleSubmit} className='space-y-6'>
          <div>
            <Input
              type='text'
              label='full Name'
              name='fullName'
              onChange={formik.handleChange}
              className='border p-2 w-full'
              error={formik.errors.fullName}
            />
          </div>
          <div>
            <Input
              type='email'
              label='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              className='border p-2 w-full'
              error={formik.errors.email}
            />
          </div>
          <div>
            <Input
              type='password'
              label='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              className='border p-2 w-full'
              isPassword
              error={formik.errors.password}
            />
          </div>
          <div>
            <Input
              type='password'
              label='Confirm password'
              name='confirm_password'
              onChange={formik.handleChange}
              className='border p-2 w-full'
              isPassword
              error={formik.errors.confirm_password}

            />
          </div>
          <CustomButton type='submit' label={'Register'} className='mx-auto' />


        </form>

        <p className='text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <a href='/login' className='text-blue-600 hover:underline'>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserRegisterPage;


