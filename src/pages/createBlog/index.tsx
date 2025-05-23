import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ReactQuill from 'react-quill-new';
import { createBlog } from "../../services/blog";

import 'react-quill-new/dist/quill.snow.css';
import { useQueryClient } from '@tanstack/react-query';
import FileInput from '../../components/ui/FileInput';


/**
 * Renders the CreateBlogPage component, which provides a form for users to create a new blog post.
 * The form includes fields for the title, content, and an image upload.
 * Uses Formik for form state management and validation with Yup.
 * On successful submission, sends a POST request to create a new blog and navigates to the blogs page.
 * Handles image file input by converting it to a base64 string for preview and submission.
 */

const CreateBlogPage = () => {
  const navigate = useNavigate();
const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      image: '' as string, // base64 string
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      image: Yup.string().required('Image is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        if (values.image) {
          formData.append('image', values.image);
        }

        await createBlog(formData);
        queryClient.invalidateQueries({queryKey:['blogs']})
        alert('Blog created successfully');
        navigate('/blog');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({ title: error.response?.data.message || 'An error occurred' });
        } else {
          setErrors({ title: 'An unknown error occurred' });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-semibold mb-6">Create a New Blog</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <ReactQuill
            theme="snow"
            value={formik.values.content}
            onChange={(content) => formik.setFieldValue('content', content)}
            // className="bg-white"
          />
          {formik.touched.content && formik.errors.content && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="image">Image</label>
          <FileInput getFile={(file)=> formik.setValues({...formik.values, image: file})} />

          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          )}

          {/* Optional Preview */}
          {formik.values.image && (
            <img
              src={formik.values.image}
              alt="Preview"
              className="mt-4 max-h-48 rounded shadow"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {formik.isSubmitting ? 'Submitting...' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogPage;
