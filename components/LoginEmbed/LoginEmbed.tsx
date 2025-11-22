"use client";

import { thirdwebClient } from "@/app/client";
import { ConnectEmbed } from "thirdweb/react";

export const LoginEmbed = () => {
  return <ConnectEmbed client={thirdwebClient} theme="light" />;
};
