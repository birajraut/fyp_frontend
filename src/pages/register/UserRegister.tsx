import { AxiosError } from 'axios';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/ui/button';
import CustomButton from '../../components/ui/CustomButton';
import userPlaceholder from '../../assets/user.jpg';
import restaurantPlaceholder from '../../assets/restaurant.png';
import { IoKeyOutline } from 'react-icons/io5';
import React from 'react';
import Input from '../../components/ui/Input';

const UserRegisterPage = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      address: '',
      contactNumber: '',
      role: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Full Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be 20 characters or less')
        .required('Password is required'),
      address: Yup.string()
        .max(100, 'Address must be 100 characters or less')
        .required('Address is required'),
      contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits')
        .required('Contact number is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post('http://localhost:8000/api/auth/register', values);
        alert('Registration Successful');
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

  const handleRes = () => {
    navigate('/register-restaurant');
  };

  const handleUsr = () => {
    navigate('/register-user');
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-200 h-screen w-full gap-10'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg'>
        <h2 className='font-semibold text-center text-slate-800'>Create User Account</h2>
        <form onSubmit={formik.handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='fullName'>Full Name</label>
            {/* <input
              type='text'
              id='fullName'
              name='fullName'
              onChange={formik.handleChange}
              value={formik.values.fullName}
              className='border p-2 w-full'
            /> */}
            <Input
              type='text'
              id='fullName'
              name='fullName'
              //   onChange={formik.handleChange}
              //   value={formik.values.fullName}
              className='border p-2 w-full'
            />
          </div>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              className='border p-2 w-full'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              className='border p-2 w-full'
            />
          </div>
          <div>
            <label htmlFor='contactNumber'>Contact Number</label>
            <input
              type='tel'
              id='contactNumber'
              name='contactNumber'
              onChange={formik.handleChange}
              value={formik.values.contactNumber}
              className='border p-2 w-full'
            />
          </div>
          <div>
            <label htmlFor='Role'>
              User Role<br></br>
            </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='customer'>Customer</option>
              <option value='restaurant_manager'>Restaurant Manager</option>
            </select>
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <textarea
              id='address'
              name='address'
              onChange={formik.handleChange}
              value={formik.values.address}
              className='border p-2 w-full'
            ></textarea>
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white p-2'>
            Register
          </button>
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
