import { toast } from "react-toastify";

export const beforeUploadImage = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("You can only upload JPG/PNG file!", {
      position: "top-right",
    });
  }
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    toast.error("File must smaller than 3MB!", {
      position: "top-right",
    });
  }
  return isJpgOrPng && isLt3M;
};

export const beforeUpload3M = file => {
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    toast.error("File must smaller than 3MB!", {
      position: "top-right",
    });
  }
  return isLt3M;
};
