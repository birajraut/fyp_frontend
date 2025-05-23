import { useState } from 'react';
import CustomButton from '../../../components/ui/CustomButton';
import Input from '../../../components/ui/Input';
import Model from '../../../components/ui/Model';
import ProductCard from '../../../components/ui/restaurant/product/ProductCard';
import ProductForm from '../../../components/ui/forms/ProductForm';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { restaurantOwnerProducts } from '../../../services/productService';
import { RootState } from '../../../redux/store/store';

const RestaurantItemsPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { restaurant } = useSelector((state: RootState) => state.auth)


  const {data} = useQuery({
    queryKey: ['restaurant-owener-product-list', openModal],
    queryFn:async ()=>await  restaurantOwnerProducts(restaurant?.id as string) 
  })

  console.log(data)
  return (
    <>
      <Model
        openModel={openModal}
        setModelOpen={setOpenModal}
        body={<ProductForm setModelOpen={setOpenModal}  restaurantId={restaurant?.id} />}
        title='Create a Product'
      />
      <div className='mb-10 flex items-center gap-10 justify-between'>
        <div className='w-full'>
          <Input
            type='search'
            name='search'
            className='p-5'
            placeholder='Search Product...'
            onChange={() => { }}
          />
        </div>
        <div className='max-w-44 w-full'>
          <CustomButton
            type='button'
            label={'Add Product'}
            className='py-4 px-10 font-semibold'
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-5'>
        {
          data?.data?.result?.map((item, index)=>{
            return (
<ProductCard 
key={index}
image={item.image}
          id={item._id}
          title={item.name}
          description={item.description}
          subTitle=''
          restaurant={restaurant}
          price={item.price}
        />
            )
          })
        }
        
      </div>
    </>
  );
};

export default RestaurantItemsPage;
