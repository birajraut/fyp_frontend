import StriteElement from "./StriteElement";
import { createSale } from "../../services/sale";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/reducers/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cart = useSelector((state: any) => state.cart.cart);
  const user = useSelector((state: any) => state.auth.user); // Fetch user from Redux
//   const restaurant = useSelector((state: any) => state.auth.restaurant); // Fetch restaurant from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurant_id = cart[0]?.restaurant?._id;

  console.log("cart", cart);
  // Prepare the payload for the sale
  const payload = cart.map((item: any) => ({
    product_id: item._id,
    price: item.price * item.quantity,
  }));

  const submitFn = async (data: any) => {
    try {
      const res = await createSale({
        ...data,
        products: payload,
        user_id: user?.user?._id, // Include user_id
        restaurant_id: restaurant_id, // Include restaurant_id
      });

      if (res?.status === 200) {
        dispatch(resetCart());
        navigate("/success");
      }
    } catch (error) {
      console.error("Error creating sale:", error);
    }
  };

  return (
    <>
      <StriteElement submitFn={submitFn} />
    </>
  );
};

export default CheckoutPage;