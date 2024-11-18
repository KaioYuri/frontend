import axios, { AxiosProgressEvent } from "axios";
import toast from "react-hot-toast";

export const uploadImageLocally = async (
  formData: FormData,
  id: string,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/atividades/${id}/foto`, // Substituir :id pelo valor real
      formData,
      {
        onUploadProgress,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Image uploaded successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error uploading image");
    console.error(error);
  }
};
