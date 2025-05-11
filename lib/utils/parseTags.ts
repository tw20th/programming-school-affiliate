// lib/utils/parseTags.ts
export const parseTags = (input: string): string[] =>
  input
    .split(/,|\n|・/)
    .map((t) => t.trim())
    .filter((t) => t)
