// import React from 'react'
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
// import CheckoutPage from "./checkout"

// const StriteElement = () => {
//   return (
//     <div>
//          <Elements stripe={stripePromise} >
//             <CheckoutPage />
//          </Elements>
      
//     </div>
//   )
// }

// export default StriteElement



import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm"; // Corrected the import

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Your actual public key



interface IProps {
    submitFn:(data:any)=>void
}

const StripeElement = ({submitFn}:IProps) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm submitFn={submitFn} />
      </Elements>
    </div>
  );
}

export default StripeElement;

