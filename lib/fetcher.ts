import { DefaultResponse } from "@/types";

export const fetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })
    .then((response) => response.json() as Promise<DefaultResponse<T>>)
    .then((data) => {
      if (data.status === 200) {
        return data.data;
      }

      console.log("🚀 ~ fetcher ~ ERROR:", data);

      if ("message" in data) {
        throw new Error(data.message as string);
      }

      throw new Error("An error occurred while fetching the data.");
    });
};
