import { authApi } from "./axios";

 interface Blog {
  id?: string;
  title: string;
  content: string;  
  image: string;
}
// Service to list blogs
export const listBlogs = async (status?: 'PUBLISHED' | 'NOT_PUBLISHED') => {
  const url = status ? `/blog?status=${status}` : '/blog';
  const res = await authApi.get(url);
  return res?.data?.result;
};

// Service to get a blog by id
export const getBlogById = async (id: string) => {
  return authApi.get(`/blog/${id}`);
};

// Service to create a blog
export const createBlog = async (data: FormData) => {
  return authApi.post('/blog', data);
};

// Service to update a blog
export const updateBlog = async (id: string, data: Blog) => {
  return authApi.put(`/blog/${id}`, { ...data });
};
