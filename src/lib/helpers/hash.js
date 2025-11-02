import crypto from "crypto";

export function sha256(value) {
  const safeValue =
    value
      ?.trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") ?? "";

  return crypto.createHash("sha256").update(safeValue, "utf8").digest("hex");
}
