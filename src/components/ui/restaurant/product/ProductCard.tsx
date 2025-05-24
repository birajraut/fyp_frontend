import { CiEdit } from 'react-icons/ci';
import CustomButton from '../../CustomButton';
// import { useNavigate } from "react-router-dom";
import placeholder from '../../../../assets/product_placeholder.webp';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  removeFromCart } from '../../../../redux/reducers/cartSlice';
import { RootState } from '../../../../redux/store/store';
import Model from '../../Model';
import ProductForm from '../../forms/ProductForm';
import {IProduct} from '../../../../types/product';

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

// const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);


const ProductCard = ({ title, description, price, id, image, subTitle, forUser = false, className, restaurant }: IProps) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { cart } = useSelector((state: RootState) => state.cart);
  const addedItem = cart.find((item) => item._id === id);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleEditClick = (item: IProduct) => {
    setSelectedProduct(item);
    setOpenModal(true);
  };

  const handleDecrease = () => {
    if ((addedItem?.quantity ?? 0) > 0) {
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
              {addedItem?.quantity && (
                <div className="text-sm text-gray-500 mt-2">
                  Total: Rs. {price && addedItem.quantity ? (Number(price) * addedItem.quantity) : 0}
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;