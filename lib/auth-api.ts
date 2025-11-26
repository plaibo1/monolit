import { API_BASE_URL } from "./consts";

export const getLoginPayload = async ({
  address,
  chainId,
}: {
  address: string;
  chainId?: number;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/auth/login?address=${address}&chainId=${chainId || ""}`
  );
  return await res.json();
};

export const doLogin = async (params: any) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("Login failed");
};

export const isLoggedIn = async () => {
  const res = await fetch(`${API_BASE_URL}/auth/isLoggedIn`);
  return await res.json();
};

export const doLogout = async () => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
  });
};
