// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const SuccessPage = () => {
//     const navigate = useNavigate();

//     // Handle Redirect back to home or cart page
//     const handleReturnHome = () => {
//         navigate('/');
//     };

//     const handleViewOrders = () => {
//         navigate('/orders'); // Assuming you have a route for viewing orders
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
//                 <div className="mb-6">
//                     <svg
//                         className="w-16 h-16 text-green-500 mx-auto"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         strokeWidth="2"
//                         aria-hidden="true"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M9 11l3 3 7-7"
//                         ></path>
//                     </svg>
//                 </div>
//                 <h2 className="text-3xl font-semibold text-gray-800">Purchase Successful!</h2>
//                 <p className="text-lg text-gray-600 mt-4">Your order has been successfully placed. Thank you for shopping with us!</p>
                
//                 <div className="mt-6 space-x-4">
//                     <button
//                         onClick={handleReturnHome}
//                         className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
//                     >
//                         Go to Home
//                     </button>
//                     <button
//                         onClick={handleViewOrders}
//                         className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
//                     >
//                         View Orders
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SuccessPage;

import  { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Extract payment method from the location state (assuming it's passed as state)
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    useEffect(() => {
        // Get the payment method from the state passed when navigating
        const state = location.state as { paymentMethod: string } | undefined;
        if (state && state.paymentMethod) {
            setPaymentMethod(state.paymentMethod);
        }
    }, [location.state]);

    // Handle Redirect back to home or cart page
    const handleReturnHome = () => {
        navigate('/');
    };

    const handleViewOrders = () => {
        navigate('/orders'); // Assuming you have a route for viewing orders
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 text-green-500 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 11l3 3 7-7"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-gray-800">Purchase Successful!</h2>
                <p className="text-lg text-gray-600 mt-4">
                    Your order has been successfully placed. Thank you for shopping with us!
                </p>

                {/* Display the payment method */}
                <div className="mt-4">
                    <p className="text-lg text-gray-600">
                        Payment Method: <span className="font-semibold text-green-600">{paymentMethod}</span>
                    </p>
                </div>

                <div className="mt-6 space-x-4">
                    <button
                        onClick={handleReturnHome}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={handleViewOrders}
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
                    >
                        View Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
