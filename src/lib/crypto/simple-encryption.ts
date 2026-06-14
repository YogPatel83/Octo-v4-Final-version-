import { encryptText, decryptText } from "@/lib/encryption/secret-box";

export function encryptSecret(value: string) {
  return encryptText(value);
}

export function decryptSecret(value: string) {
  try {
    return decryptText(value);
  } catch {
    return "";
  }
}
