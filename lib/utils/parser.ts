export const parseTags = (input: string): string[] =>
  input
    .split(/,|\n|・/)
    .map((t) => t.trim())
    .filter(Boolean)

export const parseInternalLinks = (input: string): string[] =>
  input
    .split(/\s|\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith('/'))
