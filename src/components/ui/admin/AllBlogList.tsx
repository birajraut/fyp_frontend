import React, { useMemo } from "react";
import CustomButton from "../CustomButton";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// import blog from "../../../../src/assets/";

interface IProps {
  blogList: any;
  search?: string;
}

const AllBlogList = ({ blogList, search }: IProps) => {
  const navigate = useNavigate();

  const handleCLick = (id: string) => {
    navigate(`/admin/blog/${id}`);
  };

  const filteredBlogs = useMemo(() => {
    if (!search?.trim()) return blogList;
    const lowerSearch = search.toLowerCase();

    return blogList?.filter((item) => {
      const title = item?.title?.toLowerCase() || "";
      const author = item?.creator?.fullName?.toLowerCase() || "";
      return title.includes(lowerSearch) || author.includes(lowerSearch);
    });
  }, [search, blogList]);

  return (
    <div className="bg-white rounded-md overflow-hidden">
      <table className="table-auto w-full">
        <thead className="text-left border-b bg-blue-500 text-white">
          <tr>
            <th className="p-5">Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs?.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img
                      src={item.image }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-5">{item?.author }</td>
              <td className="py-5">
                <button
                  type="button"
                  className={`py-2 px-6 text-xs rounded-full capitalize ${
                    item.isPublished === true
                      ? "bg-green-100 text-green-700"
                      :       item.isPublished === false
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {  item.isPublished ? "Published" : "Unpublished"}
                </button>
              </td>
              <td className="py-5">
                {item.createdAt && moment(item.createdAt).fromNow()}
              </td>
              <td className="py-5">
                <CustomButton
                  icon={<LuEye />}
                  showIcon
                  type="button"
                  onClick={() => handleCLick(item._id)}
                  label={"View"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBlogList;

