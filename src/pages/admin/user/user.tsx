// import React from "react";
// import Input from "../../../components/ui/Input";
// import { CiSearch } from "react-icons/ci";
// import CustomButton from "../../../components/ui/CustomButton";
// import { useQuery } from "@tanstack/react-query";
// import { listUsers } from "../../../services/user"; // Assume this is the service to fetch users

// const UserListPage = () => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["user-list"],
//     queryFn: async () => await listUsers(),
//   });
  
//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">User List</h1>
//         <div className="flex items-center gap-4">
//           <Input
//             name="search"
//             onChange={() => {}}
//             type="search"
//             placeholder="Search User..."
//             icon={<CiSearch />}
//             className="w-80"
//           />
//           {/* <CustomButton
//             type="button"
//             label={"Search"}
//             icon={<CiSearch />}
//             showIcon
//             className="bg-blue-600 text-white hover:bg-blue-700"
//           /> */}
//         </div>
//       </div>

//       <table className="table-auto w-full">
//         <thead className="text-left border-b bg-blue-500 text-white">
//           <tr>
//             <th className="p-5">Full Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* User List Section */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             {isLoading ? (
//               <p className="text-center text-lg text-gray-500">Loading users...</p>
//             ) : isError ? (
//               <p className="text-center text-lg text-red-500">Failed to load users.</p>
//             ) : (
//               <ul>
//                 {data?.data?.result?.map((user) => (
//                   <li key={user._id} className="border-b py-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-medium">{user.fullName}</p>
//                         <p className="text-sm text-gray-600">{user.email}</p>
//                       </div>
//                       <p className="text-sm text-gray-600">{user.role}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
            
//           </div>
//       </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserListPage;

import React, {useMemo, useState} from "react";
import Input from "../../../components/ui/Input";
import { CiSearch } from "react-icons/ci";
import CustomButton from "../../../components/ui/CustomButton";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../../../services/user";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-list"],
    queryFn: async () => await listUsers(),
  });

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredUsers = useMemo(() => {
    if (!data?.data?.result) return [];
    return data.data.result.filter((user: any) =>
      `${user.fullName} ${user.email}`.toLowerCase().includes(searchText)
    );
  }, [data, searchText]);

  const handleViewClick = (id: string) => {
    navigate(`/admin/users/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User List</h1>
        <div className="flex items-center gap-4">
          <Input
            name="search"
            value={searchText}
            onChange={handleSearch}
            type="search"
            placeholder="Search by name or email..."
            icon={<CiSearch />}
            className="w-80"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <p className="text-center text-lg text-gray-500 py-10">Loading users...</p>
        ) : isError ? (
          <p className="text-center text-lg text-red-500 py-10">Failed to load users.</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-lg text-gray-500 py-10">No users found.</p>
        ) : (
          <table className="table-auto w-full">
            <thead className="text-left border-b bg-blue-500 text-white">
              <tr>
                <th className="p-5">Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any) => (
                <tr key={user._id} className="border-b">
                  <td className="p-5 font-medium text-slate-700">{user.fullName}</td>
                  <td className="py-5">{user.email}</td>
                  <td className="py-5 capitalize">{user.role}</td>
                  <td className="py-5">
                    <CustomButton
                      icon={<LuEye />}
                      showIcon
                      type="button"
                      label="View"
                      onClick={() => handleViewClick(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserListPage;

