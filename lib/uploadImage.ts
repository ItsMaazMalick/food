import { put } from "@vercel/blob";
import path from "path";
import { codeGenerator } from "./codeGenerator";

export async function uploadImage(file: File) {
  if (!file.name) {
    const error = {
      status: 401,
      success: false,
      message: "Image is required",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
    return { image: null, error };
  }

  if (file.size > 1000000) {
    const error = {
      status: 401,
      success: false,
      message: "Image size must be less than 1MB",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
    return { image: null, error };
  }

  const extension = path.extname(file.name);
  const filename = codeGenerator(20) + extension;
  const blob = await put(filename, file, {
    access: "public",
  });
  const image = blob.url.split(".com/")[1];
  return { image, error: null };
}

// import { v2 as cloudinary } from "cloudinary";
// import { UploadApiResponse } from "cloudinary";
// import streamifier from "streamifier";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
//   secure: true,
// });

// export async function uploadImage(image: File, folder: string) {
//   const arrayBuffer = await image.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   console.log("Starting Cloudinary upload...");

//   const res: any = await new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: folder }, function (error, result) {
//         if (error) {
//           console.error("Cloudinary upload error:", error);
//           reject(error);
//           return;
//         }
//         console.log("Cloudinary upload successful. Result:", result);
//         resolve(result);
//       })
//       .end(buffer);
//   });
//   console.log(res);
//   const secureUrl = await res.secure_url;
//   if (!secureUrl) {
//     return null;
//   }
//   return secureUrl;
// }

// export async function uploadImage2(
//   buffer: Buffer,
//   folder: string
// ): Promise<UploadApiResponse> {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: folder,
//         upload_preset: "ml_default",
//       },
//       (error, result) => {
//         if (result) resolve(result);
//         else reject(error);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(uploadStream);
//   });
// }
