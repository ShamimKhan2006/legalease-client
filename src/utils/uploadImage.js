import axios from "axios";

export const uploadImageToImgBB = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("image", file);

  // এখানে আপনার আসল imgBB API Key বসাবেন
  const IMGBB_API_KEY = "43787558b3dbd819f29959cd9ee89653"; 

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData
    );
    
    // সফলভাবে আপলোড হলে ছবি'র Direct URL রিটার্ন করবে
    return response.data.data.display_url; 
  } catch (error) {
    console.error("imgBB Upload Error:", error);
    throw new Error("ইমেজ আপলোড করতে সমস্যা হয়েছে।");
  }
};