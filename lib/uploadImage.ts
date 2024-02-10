import { v2 as cloudinary } from "cloudinary";

export async function uploadImage(image: File, folder: string) {
  console.log("1st");
  const arrayBuffer = await image.arrayBuffer();
  console.log("2nd");
  const buffer = Buffer.from(arrayBuffer);
  console.log("3rd");

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
  });

  const res: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: folder }, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      })
      .end(buffer);
  });
  console.log("4th");
  console.log(res);
  const secureUrl = await res.secure_url;
  if (!secureUrl) {
    return null;
  }
  return secureUrl;
}
