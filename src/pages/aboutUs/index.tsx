import { Card, CardContent } from "../../components/ui/card";
import { FaUtensils, FaHeart, FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl">Discover Our Story</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">We Are SnackRush</h2>
            <p className="text-gray-600 mb-4">
              Welcome to SnackRush, your ultimate restaurant management solution. Our mission is to
              connect food lovers with the best dining experiences, while providing restaurants with
              cutting-edge tools for seamless operations.
            </p>
            <p className="text-gray-600 mb-6">
              We believe in creating a platform that not only satisfies your hunger but also
              enhances your dining experience. Our team is dedicated to bringing you the best
              restaurants and food options in your area, with a focus on quality, convenience,
              and customer satisfaction.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full">
              Read More
            </button>
          </div>
          <div className="relative h-[500px]">
            <img
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
              alt="About Us"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <CardContent>
              <FaUtensils className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Diverse Cuisines</h3>
              <p className="text-gray-600">
                Explore a variety of dishes from the best restaurants in town.
                From local favorites to international cuisines, we've got you covered.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <CardContent>
              <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Ensuring quality service and an enjoyable dining experience.
                Your satisfaction is our top priority.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <CardContent>
              <FaCheckCircle className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Efficient Management</h3>
              <p className="text-gray-600">
                Helping restaurants streamline their business operations.
                Making food delivery and management easier than ever.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-red-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Location</h3>
              <p className="text-gray-600">Naxal Bhagwati, Kathmandu</p>
            </div>
            <div className="text-center">
              <FaPhone className="text-3xl text-red-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-gray-600">+977-9860384625</p>
            </div>
            <div className="text-center">
              <FaEnvelope className="text-3xl text-red-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-600">info@snackrush.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;