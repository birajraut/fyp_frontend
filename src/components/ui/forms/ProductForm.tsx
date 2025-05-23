import React from 'react';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Input';
import Textarea from '../Textarea';
import { createProduct,updateProduct } from '../../../services/productService';
import { useQueryClient } from '@tanstack/react-query';

const ProductForm = ({ restaurantId, setModelOpen, selectedProduct }) => {
  const [loading, setLoading] = useState(false);
const queryClient = useQueryClient()
  console.log(restaurantId,'restaurant')


  const formik = useFormik({
    initialValues: {
      name: selectedProduct?.title || '',
      description: selectedProduct?.description || '',
      price: selectedProduct?.price || '',
      restaurant_id: restaurantId,
      image: null,
      foodtype: selectedProduct?.foodtype || '',

    },
    enableReinitialize: true, // Important for pre-filling on edit
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      price: Yup.number().required('Required'),
      restaurant_id: Yup.string().required('Required'),
      foodtype: Yup.string().required('Required'),
    }),

    

    onSubmit: async (values) => {
      setLoading(true);
      
      try {
        if (selectedProduct) {
          // 🛠 Update existing product
          await updateProduct(selectedProduct.id, values);
          queryClient.invalidateQueries({queryKey:['restaurant-owener-product-list']})

          
        } else {
          // ➕ Create new product
          await createProduct(values);
          queryClient.invalidateQueries({queryKey:['restaurant-owener-product-list']})

        }
        setModelOpen(false);
      } catch (err) {
        console.error('Submit error:', err);
      } finally {
        setLoading(false);
      }
    },
  });

  console.log(restaurantId,'restaurantId')
  console.log('Selected foodtype:', selectedProduct?.foodtype);
  console.log('Selected product:', selectedProduct);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='my-2'>
          <label>Name:</label>
          <Input
            type='text'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            className='w-full p-2 mt-2 border rounded'
            error={formik.touched.name && formik.errors.name}
          />
        </div>

        <div className='my-2'>
          <label>Description:</label>
          <Textarea
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            className='w-full p-2 mt-2 border rounded'
            error={formik.touched.description && formik.errors.description}
          />
        </div>

        <div className='my-2'>
        
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Food Type: *
                </label>
                <select
                    id="foodtype"
                    name="foodtype"
                    value={formik.values.foodtype}
                    onChange={formik.handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    aria-label="Select Category"
                >
                    <option value="" disabled>
                    Select Food Type
                    </option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                    <option value="snack">Snack</option>
                    <option value="beverage">Beverage</option>
                </select>
                {formik.errors.foodtype && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.foodtype as string}</p>
                )}
                </div> 

        <div className='my-2'>
          <label>Price:</label>
          <Input
            type='number'
            name='price'
            value={formik.values.price}
            onChange={formik.handleChange}
            className='w-full p-2 mt-2 border rounded'
            error={formik.touched.price && formik.errors.price}
          />
        </div>

  {/* Image Picker */}
  <div className='my-2'>
    <label>Image:</label>
    <input
      type='file'
      accept='image/*'
      onChange={(event) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
          formik.setFieldValue('image', file);
        }
      }}
      className='w-full p-2 mt-2 border rounded'
    />
  </div>



        <div className='my-2 flex justify-between'>
          <CustomButton
            type='submit'
            label={selectedProduct ? 'Update Menu Item' : 'Add Menu Item'}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
