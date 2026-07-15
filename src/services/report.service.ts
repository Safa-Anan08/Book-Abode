import axiosInstance from "@/lib/axios";

export const reportBook = async (
  bookId: string,
  reason: string
) => {
  const res = await axiosInstance.post(
    `/reports/${bookId}`,
    {
      reason,
    }
  );

  return res.data;
};