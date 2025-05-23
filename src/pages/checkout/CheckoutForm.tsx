// import React, { useState } from "react";
// import { useElements, useStripe, CardElement, AddressElement } from "@stripe/react-stripe-js";
// import { useSelector } from "react-redux";



// interface IProps {
//     submitFn: (data:any)=>void
// }

// const CheckoutForm = ({submitFn}:IProps) => {
//   const cart = useSelector(state=> state.cart.cart)
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const total =  cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const handlePayment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) return;

//     try {
//       const cardElement = elements.getElement(CardElement);
//       const addressElement = elements.getElement(AddressElement);
//       const billingaddress = await addressElement?.getValue()
//       if (!cardElement || !addressElement) {
//         setMessage("Please provide complete payment details.");
//         setLoading(false);
//         return;
//       }
//       const paymentMethodResponse = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//         billing_details: {
//           name: billingaddress?.value.name, 
//           address: billingaddress?.value.address,
//         },
//       });
//       if (paymentMethodResponse.error) {
//         setMessage(paymentMethodResponse.error.message || "Payment method creation failed.");
//         setLoading(false);
//         return;
//       }

//       const paymentMethodId = paymentMethodResponse.paymentMethod.id;
//     //   console.log("Payment Method ID:", paymentMethodId);

//     await submitFn({payment_id:paymentMethodId})

//       console.log('Payment Method',paymentMethodResponse)

      
//     } catch (error) {
//       setMessage("Error processing payment.");
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Checkout</h1>

//         <form onSubmit={handlePayment} className="space-y-4">
//           <div className="space-y-2">
//             <h2 className="text-lg font-medium text-gray-700">Payment Details</h2>

//             {/* Stripe Card Element */}
//             <CardElement />
//           </div>

//           <div className="space-y-2">
//             <h2 className="text-lg font-medium text-gray-700">Billing Address</h2>

//             {/* Stripe Address Element */}
//             <AddressElement options={{ mode: 'billing' }} />
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : `Pay $${total}`}
//           </button>
//         </form>

//         {message && (
//           <p className={`mt-4 text-center ${message.includes("successful") ? 'text-green-500' : 'text-red-500'}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CheckoutForm;

import React, { useState } from "react";
import { useElements, useStripe, CardElement, AddressElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

interface IProps {
  submitFn: (data: any) => void;
}

const CheckoutForm = ({ submitFn }: IProps) => {
  const cart = useSelector((state) => state.cart.cart);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();  // Initialize navigate
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function for payment through Stripe
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      const cardElement = elements.getElement(CardElement);
      const addressElement = elements.getElement(AddressElement);
      const billingaddress = await addressElement?.getValue();

      if (!cardElement || !addressElement) {
        setMessage("Please provide complete payment details.");
        setLoading(false);
        return;
      }

      const paymentMethodResponse = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: billingaddress?.value.name,
          address: billingaddress?.value.address,
        },
      });

      if (paymentMethodResponse.error) {
        setMessage(paymentMethodResponse.error.message || "Payment method creation failed.");
        setLoading(false);
        return;
      }

      const paymentMethodId = paymentMethodResponse.paymentMethod.id;
      await submitFn({ payment_id: paymentMethodId });

      // Navigate to the success page with the payment method
      navigate("/success", { state: { paymentMethod: "Paid via Stripe" } });

    } catch (error) {
      setMessage("Error processing payment.");
      console.error(error);
    }

    setLoading(false);
  };

  // Function for Cash on Delivery
  const handleCODPayment = async() => {
    // Simulate a successful payment and navigate to the order placed page
    setMessage("Order placed successfully with Cash on Delivery.");
    await submitFn({ payment_id: null });

    // Navigate to the success page with the payment method
    navigate("/success", { state: { paymentMethod: "Cash on Delivery" } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Checkout</h1>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-700">Payment Details</h2>

            {/* Stripe Card Element */}
            <CardElement />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-700">Billing Address</h2>

            {/* Stripe Address Element */}
            <AddressElement options={{ mode: "billing" }} />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay Rs. ${total}`}
          </button>
        </form>

        {/* Cash on Delivery Button */}
        <button
          onClick={handleCODPayment}
          className="mt-4 w-full py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
        >
          Cash on Delivery
        </button> 

        {message && (
          <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
