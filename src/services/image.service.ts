import axios from "axios";

export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("image", file);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );

  return res.data.data.url;
};