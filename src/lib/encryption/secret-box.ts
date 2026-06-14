import crypto from "crypto";

function getEncryptionKey() {
  const secret = process.env.OCTO_ENCRYPTION_SECRET || process.env.OCTO_WORKER_SECRET;

  if (!secret) {
    throw new Error("OCTO_ENCRYPTION_SECRET or OCTO_WORKER_SECRET is missing.");
  }

  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptText(value: string) {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decryptText(value: string) {
  const raw = Buffer.from(value, "base64");

  const iv = raw.subarray(0, 12);
  const tag = raw.subarray(12, 28);
  const encrypted = raw.subarray(28);

  const key = getEncryptionKey();
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
