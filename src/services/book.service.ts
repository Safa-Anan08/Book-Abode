import axiosInstance from "@/lib/axios";

export const getBooks = async (params = {}) => {
  const res = await axiosInstance.get("/books", {
    params,
  });

  return res.data;
};

export const getBook = async (id: string) => {
  const res = await axiosInstance.get(`/books/${id}`);

  return res.data;
};

export const createBook = async (data: any) => {
  const res = await axiosInstance.post("/books", data);

  return res.data;
};

export const updateBook = async (
  id: string,
  data: any
) => {
  const res = await axiosInstance.put(
    `/books/${id}`,
    data
  );

  return res.data;
};

export const deleteBook = async (id: string) => {
  const res = await axiosInstance.delete(`/books/${id}`);

  return res.data;
};

export const getMyBooks = async () => {
  const res = await axiosInstance.get("/books/manage");

  return res.data;
};