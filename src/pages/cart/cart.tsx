// import { useDispatch, useSelector } from 'react-redux';
// import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/reducers/cartSlice';
// import { useNavigate } from 'react-router-dom';





// const CartPage = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const cart = useSelector((state: any) => state.cart.cart); // get cart items from state

//     const handleRemoveItem = (id: string) => {
//         dispatch(removeFromCart(id));
//     };

//     const handleIncreaseQuantity = (id: string) => {
//         dispatch(increaseQuantity(id));
//     };

//     const handleDecreaseQuantity = (id: string) => {
//         dispatch(decreaseQuantity(id));
//     };

//     const calculateTotal = () => {
//         return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//     };

// const handleCheckout=()=>{
//     navigate("/checkout")
// }
// console.log(cart,'cart')


//     return (
//         <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
//             <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

//             <div className="space-y-4">
//                 {cart.length === 0 ? (
//                     <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
//                 ) : (
//                     cart?.map(item => (
//                         <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
//                             <div className="flex items-center">
//                                 <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
//                                 <div>
//                                     <h3 className="font-semibold text-xl">{item.title}</h3>
//                                     <p className="text-sm text-gray-600">Price: ${item.price}</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center space-x-4">
//                                 <div className="flex items-center space-x-2">
//                                     <button
//                                         onClick={() => handleDecreaseQuantity(item._id)}
//                                         className="w-8 h-8 bg-gray-300 text-white rounded-full flex justify-center items-center hover:bg-gray-400"
//                                     >
//                                         -
//                                     </button>
//                                     <input
//                                         type="number"
//                                         value={item.quantity}
//                                         readOnly
//                                         className="w-12 text-center bg-gray-100 border border-gray-300 rounded-md"
//                                     />
//                                     <button
//                                         onClick={() => handleIncreaseQuantity(item._id)}
//                                         className="w-8 h-8 bg-gray-300 text-white rounded-full flex justify-center items-center hover:bg-gray-400"
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                                 <button
//                                     onClick={() => handleRemoveItem(item._id)}
//                                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>

//             <div className="mt-6 flex items-center justify-between">
//                 <div className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</div>
//                 <button

//                 onClick={()=>handleCheckout()}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     disabled={cart.length === 0}
//                 >
//                     Checkout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartPage;

import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.cart); // Get cart items from state

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const calculateTotal = () => {
    return cart.reduce((total:any, item:any) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto my-10 p-6">
      {/* Cart Items Section */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item:any) => (
              <div
                key={item._id}
                className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Price: Rs. {item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecreaseQuantity(item._id)}
                    className={`w-8 h-8 rounded-full flex justify-center items-center font-bold ${
                      item.quantity > 1
                        ? 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item._id)}
                    className="w-8 h-8 bg-gray-300 text-gray-800 rounded-full flex justify-center items-center hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item._id)}
                   className="text-gray-500 hover:text-red-700 transition"
                >
                <MdDelete size={24} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Section */}
      {cart.length > 0 && (
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-lg text-gray-600">
              <span>Subtotal</span>
              <span>Rs. {calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg text-gray-600">
              <span>Tax (10%)</span>
              <span>Rs. {(calculateTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>Rs. {(calculateTotal() * 1.1).toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;