const removeTrailingSlash = (url: string) => url.replace(/\/$/, "");

export const API_BASE_URL = removeTrailingSlash(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
);
export const WS_URL = removeTrailingSlash(
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000"
);

export const TMP_AUTH = {
  Authorization: "35169044-533d-4636-b0f2-2a1d5d56ad45",
};
