import { AxiosError } from 'axios';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const ContactUsPage = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      message: '',
      contactNumber: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().max(50, 'Must be 50 characters or less').required('Full Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      message: Yup.string().max(500, 'Message must be 500 characters or less').required('Message is required'),
      contactNumber: Yup.string().matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits').required('Contact number is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post('http://localhost:8000/api/contact', values);
        alert('Your message has been sent!');
        navigate('/thank-you'); // Redirect to a thank-you page or confirmation page
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Contact Us</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              onChange={formik.handleChange} 
              value={formik.values.fullName} 
              className="border p-2 w-full"
            />
            {formik.errors.fullName && formik.touched.fullName && (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              onChange={formik.handleChange} 
              value={formik.values.email} 
              className="border p-2 w-full"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="contactNumber">Contact Number</label>
            <input 
              type="tel" 
              id="contactNumber" 
              name="contactNumber" 
              onChange={formik.handleChange} 
              value={formik.values.contactNumber} 
              className="border p-2 w-full"
            />
            {formik.errors.contactNumber && formik.touched.contactNumber && (
              <p className="text-red-500 text-sm">{formik.errors.contactNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              onChange={formik.handleChange} 
              value={formik.values.message} 
              className="border p-2 w-full" 
              rows={4}
            />
            {formik.errors.message && formik.touched.message && (
              <p className="text-red-500 text-sm">{formik.errors.message}</p>
            )}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2">Send Message</button>
        </form>

        {/* Additional Links */}
        <p className="text-center text-sm text-gray-600">
          Need help?{' '}
          <a href="/faq" className="text-blue-600 hover:underline">
            Visit our FAQ
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactUsPage;
