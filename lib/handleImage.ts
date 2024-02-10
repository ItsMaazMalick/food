"use server";
import { put } from "@vercel/blob";
import path from "path";
import { codeGenerator } from "./codeGenerator";

export async function uploadImage(file: File) {
  try {
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
  } catch (error) {
    return {
      image: null,
      error: { status: 500, success: false, message: "Internal server error" },
    };
  }
}
