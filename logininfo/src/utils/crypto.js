// src/utils/crypto.js
export async function hashPassword(password) {
  if (!password) return "";
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
