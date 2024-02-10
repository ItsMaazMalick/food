import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";

export async function uploadImage(image: File, folder: string) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log("Starting Cloudinary upload...");
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
          console.error("Cloudinary upload error:", error);
          reject(error);
          return;
        }
        console.log("Cloudinary upload successful. Result:", result);
        resolve(result);
      })
      .end(buffer);
  });
  console.log(res);
  const secureUrl = await res.secure_url;
  if (!secureUrl) {
    return null;
  }
  return secureUrl;
}

export async function uploadImage2(
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
  });
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        upload_preset: "ml_default",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}
