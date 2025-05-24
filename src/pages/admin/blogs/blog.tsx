import  { useState } from "react";
import Input from "../../../components/ui/Input";
import { CiSearch } from "react-icons/ci";
// import CustomButton from "../../../components/ui/CustomButton";
import NavTab from "../../../components/ui/Navtab";
import AllBlogList from "../../../components/ui/admin/AllBlogList";
import { useQuery } from "@tanstack/react-query";
import { listBlogs } from "../../../services/blog";
import { useLocation } from "react-router-dom";

const AdminBlogPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-blog-list", status],
    queryFn: async () => await listBlogs(status || "" as any),
  });

  const tablist = [
    {
      title: {
        id: "",
        name: "All Blogs",
      },
      content: <AllBlogList blogList={data} search={search} />,
    },
    {
      title: {
        id: "PUBLISHED",
        name: "Published",
      },
      content: (
        <AllBlogList
          blogList={data?.filter((blog:any) => blog.status === "PUBLISHED")}
          search={search}
        />
      ),
    },
    {
      title: {
        id: "NOT_PUBLISHED",
        name: "Not Published",
      },
      content: (
        <AllBlogList
          blogList={data?.filter((blog:any) => blog.status !== "PUBLISHED")}
          search={search}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
        <div className="flex items-center gap-4">
          <Input
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search Blog..."
            icon={<CiSearch />}
            className="w-80"
          />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Loading blogs...</p>
        ) : isError ? (
          <p className="text-center text-lg text-red-500">Failed to load blogs.</p>
        ) : (
          <NavTab tabList={tablist} />
        )}
      </div>
    </div>
  );
};

export default AdminBlogPage;

