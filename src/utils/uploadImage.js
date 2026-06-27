import axios from "axios";

export const uploadImageToImgBB = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("image", file);

  const NEXT_PUBLIC_IMGBB_API_KEY=process.env.NEXT_PUBLIC_IMGBB_API_KEY
  

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${NEXT_PUBLIC_IMGBB_API_KEY}`,
      formData
    );
    

    return response.data.data.display_url; 
  } catch (error) {
    console.error("imgBB Upload Error:", error);
    throw new Error("This image is problem");
  }
};