import { useSelector } from "react-redux";
import { Card, CardContent } from "../../components/ui/card";
import { FaCalendarAlt, FaUser, FaComment } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listBlogs } from "../../services/blog";

const BlogPage = () => {
  const user = useSelector((state: any) => state.auth.user); // Fetch user from Redux
  const navigate = useNavigate();
  const { data:blogPosts } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () =>  await listBlogs(),
  });

  console.log(blogPosts, "blog posts data");
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl">Discover the latest in food, dining, and culinary trends</p>
          </div>
        </div>
      </div>

      {/* Add Blog button */}
      {user?.user?.role === "ADMIN" && (
        <div className="flex justify-end p-4">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
            onClick={() => navigate("/blog/create")}
          >
            Add Blog
          </button>
        </div>
      )}

      {/* Featured Post */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Featured Post" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center text-gray-500 mb-4">
                <FaCalendarAlt className="mr-2" />
                <span>March 20, 2024</span>
                <FaUser className="ml-4 mr-2" />
                <span>Admin</span>
                <FaComment className="ml-4 mr-2" />
                <span>25 Comments</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">The Future of Dining Experience</h2>
              <p className="text-gray-600 mb-6">
                Explore how technology and innovation are transforming the way we dine and experience food.
                From virtual reality menus to AI-powered recommendations, the future of dining is here.
              </p>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.map((post:any) => (
            <Card key={post._id} className="overflow-hidden">
              {post.image && (
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <CardContent className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>{post.createdAt}</span>
                  <FaUser className="ml-4 mr-2" />
                  <span>{post.author}</span>
                  <FaComment className="ml-4 mr-2" />
                  <span>0 Comments</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{__html: post.content}} />
                <button className="text-red-600 hover:text-red-700 font-semibold">
                  Read More →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

