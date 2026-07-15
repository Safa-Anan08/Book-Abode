import axiosInstance from "@/lib/axios";


export const checkoutBook = async (
  bookId: string
) => {
  const res = await axiosInstance.post(
    "/payment/checkout",
    {
      bookId,
    }
  );

  return res.data;
};



export const confirmPayment = async (
  bookId: string
) => {
  const res = await axiosInstance.post(
    "/payment/confirm",
    {
      bookId,
    }
  );

  return res.data;
};



export const checkDownload = async (
  bookId: string
) => {
  const res = await axiosInstance.get(
    `/payment/can-download/${bookId}`
  );

  return res.data;
};



export const downloadBook = async (
  bookId: string
) => {
  const res = await axiosInstance.get(
    `/payment/download/${bookId}`
  );

  return res.data;
};