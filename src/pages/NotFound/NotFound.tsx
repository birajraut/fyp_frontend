import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-6">404 - Not Found</h1>
      <p className="text-xl mb-10">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
