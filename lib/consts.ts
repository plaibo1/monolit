const removeTrailingSlash = (url: string) => url.replace(/\/$/, "");

export const API_BASE_URL = removeTrailingSlash(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
);
export const WS_URL = removeTrailingSlash(
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000"
);
