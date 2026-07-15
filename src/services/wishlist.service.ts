import axiosInstance from "@/lib/axios";

export const getWishlist = async () => {
  const res = await axiosInstance.get("/wishlist");
  return res.data;
};

export const addWishlist = async (id: string) => {
  const res = await axiosInstance.post(`/wishlist/${id}`);
  return res.data;
};

export const removeWishlist = async (id: string) => {
  const res = await axiosInstance.delete(`/wishlist/${id}`);
  return res.data;
};

export const checkWishlist = async (id: string) => {
  const res = await axiosInstance.get(`/wishlist/check/${id}`);
  return res.data;
};