export const api = "http://localhost:5000/api";
export const getPublicURL = (filename) => {
  if (!filename) return "";

  // Encode spaces and special characters
  const encodedFilename = encodeURI(filename);

  // Ensure URL ends with .jpg
  const url = `https://res.cloudinary.com/dnzbpstpf/image/upload/v1760088785/${encodedFilename}`;
  return url.toLowerCase().endsWith(".jpg") ? url : url + ".jpg";
};
