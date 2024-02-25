"use server";
import CryptoJS from "crypto-js";

export async function encryptString(string: string) {
  const encryptedString = CryptoJS.AES.encrypt(
    string,
    process.env.JWT_SECRET!
  ).toString();
  return encryptedString;
}

export async function decryptString(string: string) {
  const decryptedBytes = CryptoJS.AES.decrypt(string, process.env.JWT_SECRET!);
  const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedString;
}
