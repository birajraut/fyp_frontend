// // import CustomButton from '../../../components/ui/CustomButton';
// import { CiEdit } from 'react-icons/ci';
// import { MdDoNotDisturbOnTotalSilence, MdOutlineDelete } from 'react-icons/md';
// import CustomButton from '../../CustomButton';
// import { useNavigate } from "react-router-dom";

// import placeholder from '../../../../assets/product_placeholder.webp';
// import { twMerge } from 'tailwind-merge';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCartSlice, resetCart } from '../../../../redux/reducers/cartSlice';
// import { RootState } from '../../../../redux/store/store';
// import Model from '../../Model';
// import ProductForm from '../../forms/ProductForm';

// interface IProps {
//   id: string;
//   title: string;
//   subTitle?: string;
//   description: string;
//   image?: string;
//   price?: string | number;
//   forUser?: boolean
//   className?: string
//   restaurant?: any
// }
// const ProductCard = ({ title, description, price, id, image, subTitle, forUser = false, className, restaurant }: IProps) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { cart } = useSelector((state: RootState) => state.cart)
//   const addedItem = cart.find((item) => item._id === id)

//   const [count, setCount] = useState<number>(0)
//   const [openModal, setOpenModal] = useState<boolean>(false);

//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const handleEditClick = (item) => {
//     setSelectedProduct(item)
//     console.log(item, 'selected product')
//     setOpenModal(true)

//     // navigate(`/restaurant/items/${id}`)
//   }
//   const handleDecrease = () => {

//     if (count > 0) {
//       setCount((prev) => prev - 1)
//     }

//   }

//   const handleIncrease = () => {
//     setCount((prev) => prev + 1)
//   }

//   const handleCart = () => {

//     const sameRestaurantItem = cart?.some(items => items?.restaurant?.restaurant?._id == restaurant.restaurant._id)
//     console.log(sameRestaurantItem, 'same restaurant')
//     if (sameRestaurantItem || cart.length == 0) {

//       const item = {
//         _id: id,
//         title,
//         description,
//         price,
//         restaurant,
//         quantity: count
//       }
//       dispatch(addToCartSlice(item))
//       return

//     } else {
//       const confirmClearCart = window.confirm('Items from another restaurant are in the cart. Do you want to clear them and add this item?')
//       if (!confirmClearCart) {
//         return
//       }
//       dispatch(resetCart())
//       const item = {
//         _id: id,
//         title,
//         description,
//         price,
//         restaurant,
//         quantity: count
//       }
//       dispatch(addToCartSlice(item))
//     }

//     // setCount(0)

//     console.log(count)
//   }


//   const btnText = () => {


//     // console.log(cart?,'cart items')


//     if (!addedItem?.quantity) {
//       return 'Add to cart'
//     } else {
//       if (addedItem?.quantity === count) {
//         return 'Item Added to cart'
//       } else {
//         return 'Update  cart'
//       }
//     }
//   }



//   // console.log({ addedItem })
//   return (
//     <>

//       <Model
//         openModel={openModal}
//         setModelOpen={setOpenModal}
//         body={<ProductForm selectedProduct={selectedProduct} setModelOpen={setOpenModal} restaurantId={restaurant?.id} />}
//         title='Edit a Product'
//       />
//       <div className={twMerge(` bg-white border rounded-2xl relative  ${className}`)}>

//         <div className='p-5'>
//           {/* <div className='h-52 w-full'></div> */}
//           <div className='w-full h-56'>
//             <img src={image || placeholder} alt='' className='w-full h-full object-contain' />
//           </div>
//           <div className='flex items-center justify-between mb-5'>
//             <div>
//               <div className='text-slate-700 font-semibold text-xl'>{title}</div>
//               <div className='text-xs text-gray-500'>{subTitle}</div>
//             </div>
//             <div className='text-3xl font-bold text-slate-700'>Rs. {price}</div>
//           </div>

//           <div className='text-gray-500 text-sm'>{description}</div>

//           {
//             !forUser && <div className='flex items-center justify-between  absolute top-2 right-2'>
//               <CustomButton
//                 type='button'
//                 label={'Edit'}
//                 className='bg-green-600 font-semibold'
//                 icon={<CiEdit />}
//                 showIcon
//                 onClick={() => handleEditClick({ title, price, description, image, id })}
//               />
//             </div>
//           }
//         </div>

//         {
//           forUser && <div className={`flex items-center justify-between  ${count ? 'bg-purple-100' : 'bg-slate-100'} p-3 rounded-b-xl`}>
//             <div>
//               <div className="flex items-center gap-5">
//                 <div className="w-8 h-8 rounded-full border flex items-center justify-center font-bold cursor-pointer bg-white " onClick={handleDecrease}>-</div>
//                 <div className="font-bold text-slate-700 text-lg ">{count}</div>
//                 <div className="w-8 h-8 rounded-full border flex items-center justify-center font-bold cursor-pointer bg-white" onClick={handleIncrease}>+</div>
//               </div>

//               {count > 0 && <div className='text-sm text-gray-500 mt-2'> Total: {price as number * count}</div>}
//             </div>
//             <div>
//               {
//                 count > 0 && <CustomButton type='button' label={btnText()} onClick={handleCart} />
//               }


//             </div>

//           </div>
//         }

//       </div>

//     </>
//   );
// };

// export default ProductCard;


import { CiEdit } from 'react-icons/ci';
import CustomButton from '../../CustomButton';
import { useNavigate } from "react-router-dom";
import placeholder from '../../../../assets/product_placeholder.webp';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, resetCart } from '../../../../redux/reducers/cartSlice';
import { RootState } from '../../../../redux/store/store';
import Model from '../../Model';
import ProductForm from '../../forms/ProductForm';

interface IProps {
  id: string;
  title: string;
  subTitle?: string;
  description: string;
  image?: string;
  price?: string | number;
  forUser?: boolean;
  className?: string;
  restaurant?: any;
}

const ProductCard = ({ title, description, price, id, image, subTitle, forUser = false, className, restaurant }: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state: RootState) => state.cart);
  const addedItem = cart.find((item) => item._id === id);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleEditClick = (item: any) => {
    setSelectedProduct(item);
    setOpenModal(true);
  };

  const handleDecrease = () => {
    if (addedItem?.quantity > 0) {
      dispatch(removeFromCart(id));
    }
  };
  const handleIncrease = () => {};


  return (
    <>
      <Model
        openModel={openModal}
        setModelOpen={setOpenModal}
        body={<ProductForm selectedProduct={selectedProduct} setModelOpen={setOpenModal} restaurantId={restaurant?.id} />}
        title="Edit a Product"
      />
      <div className={twMerge(`bg-white border rounded-2xl relative ${className}`)}>
        <div className="p-5">
          <div className="w-full h-56">
            <img src={image || placeholder} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-slate-700 font-semibold text-xl">{title}</div>
              <div className="text-xs text-gray-500">{subTitle}</div>
            </div>
            <div className="text-3xl font-bold text-slate-700">Rs. {price}</div>
          </div>
          <div className="text-gray-500 text-sm">{description}</div>

          {!forUser && (
            <div className="flex items-center justify-between absolute top-2 right-2">
              <CustomButton
                type="button"
                label="Edit"
                className="bg-green-600 font-semibold"
                icon={<CiEdit />}
                showIcon
                onClick={() => handleEditClick({ title, price, description, image, id })}
              />
            </div>
          )}
        </div>

        {forUser && (
          <div className={`flex items-center justify-between ${addedItem?.quantity ? 'bg-purple-100' : 'bg-slate-100'} p-3 rounded-b-xl`}>
            <div>
              <div className="flex items-center gap-5">
                <div
                  className="w-8 h-8 rounded-full border flex items-center justify-center font-bold cursor-pointer bg-white"
                  onClick={handleDecrease}
                >
                  -
                </div>
                <div className="font-bold text-slate-700 text-lg">{addedItem?.quantity || 0}</div>
                <div
                  className="w-8 h-8 rounded-full border flex items-center justify-center font-bold cursor-pointer bg-white"
                  onClick={handleIncrease}
                >
                  +
                </div>
              </div>
              {addedItem?.quantity > 0 && (
                <div className="text-sm text-gray-500 mt-2">Total: Rs. {price as number * addedItem.quantity}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;