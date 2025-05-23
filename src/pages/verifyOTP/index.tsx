/* eslint-disable @typescript-eslint/no-explicit-any */


import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom'
import OTPInput from "../../components/ui/OTPInput"

import * as Yup from 'yup';
import CustomButton from '../../components/ui/CustomButton';
import toast from 'react-hot-toast';
import { OTPVerify } from '../../services/auth';


const OtpVerificationPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isOAuth = queryParams.get("fromOauth");
    const oAuthEmail = queryParams.get("email");

    const emailForOTP = localStorage.getItem('email')
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: isOAuth ? oAuthEmail : emailForOTP,
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string().length(6, 'OTP must be exactly 6 digits').required('OTP is required'),
        }),
        onSubmit: async (values,) => {
            try {
                await OTPVerify(values)
                navigate('/login');
            } catch (error: any) {

                toast.error(error?.response?.data?.message)
            }

        },
    });


    const handleComplete = (data: string) => {
        formik.setValues({
            ...formik.values,
            otp: data
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">OTP Verification</h2>
                <p className="text-center text-gray-600">Enter the OTP sent to your email</p>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <OTPInput onComplete={handleComplete} />
                    <CustomButton type="submit" label={'Verify OTP'} className=" mx-auto mt-10" />
                </form>
            </div>


        </div>
    );
};

export default OtpVerificationPage;