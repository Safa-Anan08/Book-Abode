import axiosInstance from "@/lib/axios";

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/admin/dashboard");
  return res.data;
};


export const getUsers = async () => {
  const res = await axiosInstance.get(
    "/admin/users"
  );

  return res.data;
};

export const updateRole = async (
  id: string,
  role: string
) => {
  const res =
    await axiosInstance.patch(
      `/admin/users/${id}/role`,
      {
        role,
      }
    );

  return res.data;
};

export const deleteUser = async (
  id: string
) => {
  const res =
    await axiosInstance.delete(
      `/admin/users/${id}`
    );

  return res.data;
};

export const getBooks = async () => {
  const res = await axiosInstance.get(
    "/admin/books"
  );

  return res.data;
};

export const deleteBook = async (
  id: string
) => {
  const res =
    await axiosInstance.delete(
      `/admin/books/${id}`
    );

  return res.data;
};

export const reportBook = async (
  id: string,
  reason: string
) => {
  const res =
    await axiosInstance.post(
      `/admin/books/${id}/report`,
      {
        reason,
      }
    );

  return res.data;
};

export const getWishlists = async () => {
  const res = await axiosInstance.get("/admin/wishlists");
  return res.data;
};

export const getReports =
  async () => {
    const res =
      await axiosInstance.get(
        "/admin/reports"
      );

    return res.data;
  };

export const resolveReport =
  async (id: string) => {
    const res =
      await axiosInstance.patch(
        `/admin/reports/${id}/resolve`
      );

    return res.data;
  };

export const deleteReport =
  async (id: string) => {
    const res =
      await axiosInstance.delete(
        `/admin/reports/${id}`
      );

    return res.data;
  };

  export const getRecentActivity =
  async () => {
    const res =
      await axiosInstance.get(
        "/admin/activity"
      );

    return res.data;
  };

  export const notifyBookOwner =
  async (
    id: string,
    message: string
  ) => {
    const res =
      await axiosInstance.post(
        `/admin/books/${id}/notify`,
        { message }
      );

    return res.data;
  };

