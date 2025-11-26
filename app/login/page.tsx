"use client";

import { LoginEmbed } from "@/components/LoginEmbed";
import { useAuth } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return null; // Or a loading spinner

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoginEmbed />
    </div>
  );
}
