// lib/utils/slug.ts
export const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50)
