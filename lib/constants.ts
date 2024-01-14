
export const SEARCH_PRODUCTS_PER_PAGE = 12;

export const SITE_URL = process.env.NODE_ENV === "production" ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000"