import axiosInstance from "@/lib/axios";

export const getNotifications = async () => {
  const res = await axiosInstance.get("/notifications");
  return res.data;
};

export const markRead = async (id: string) => {
  const res = await axiosInstance.patch(
    `/notifications/${id}/read`
  );

  return res.data;
};