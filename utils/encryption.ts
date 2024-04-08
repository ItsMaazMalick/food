import CryptoJS from "crypto-js";

export function encryptString(string: string) {
  const encrypted = CryptoJS.AES.encrypt(
    string,
    process.env.JWT_SECRET!
  ).toString();
  return encrypted;
}

export function decryptString(string: string) {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(
      string,
      process.env.JWT_SECRET!
    );
    const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    return null;
  }
}
