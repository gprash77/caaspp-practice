import type { Question } from "./questions";

function normalizeForHash(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeForHash);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, entry]) => entry !== undefined)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, normalizeForHash(entry)])
    );
  }
  return value;
}

export function serializeQuestionBank(questions: Question[]): string {
  return JSON.stringify(normalizeForHash(questions));
}

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function computeQuestionBankHash(questions: Question[]): Promise<string> {
  const payload = new TextEncoder().encode(serializeQuestionBank(questions));
  const digest = await globalThis.crypto.subtle.digest("SHA-256", payload);
  return bytesToHex(digest);
}
