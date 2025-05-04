// lib/utils/slug.ts
export const generateSlug = (title: string): string =>
  title
    .trim()
    .toLowerCase()
    .replace(/[\s　]/g, '-')
    .replace(/[^\w-]/g, '')
