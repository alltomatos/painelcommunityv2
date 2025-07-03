import crypto from "crypto";

export interface LicenseToken {
  pluginId: string;
  user: string;
  expiresAt: string;
  signature: string;
}

const SECRET = "garapa_license_secret";

export function generateLicenseToken(pluginId: string, user: string, expiresInDays = 30): LicenseToken {
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString();
  const payload = `${pluginId}|${user}|${expiresAt}`;
  const signature = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return { pluginId, user, expiresAt, signature };
}

export function validateLicenseToken(token: LicenseToken): boolean {
  const payload = `${token.pluginId}|${token.user}|${token.expiresAt}`;
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  if (expected !== token.signature) return false;
  if (new Date(token.expiresAt) < new Date()) return false;
  return true;
} 