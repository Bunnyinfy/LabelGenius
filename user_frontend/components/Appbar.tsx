"use client";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";

export const Appbar = () => {
  const { publicKey, signMessage } = useWallet();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure the component only mounts on the client
  }, []);

  async function signAndSend() {
    if (!publicKey) return;

    try {
      const message = new TextEncoder().encode("Sign into mechanical turks");
      if (typeof signMessage === "function") {
        const signature = await signMessage(message);
        const response = await axios.post(`${BACKEND_URL}/v1/user/signin`, {
          signature,
          publicKey: publicKey.toString(),
        });
        localStorage.setItem("token", response.data.token);
      } else {
        console.error("Wallet does not support message signing.");
      }
    } catch (error) {
      console.error("Error signing message:", error);
    }
  }

  useEffect(() => {
    if (publicKey) signAndSend();
  }, [publicKey]);

  if (!isMounted) return null; // Prevent SSR mismatch

  return (
    <div className="flex justify-between border-b pb-2 pt-2">
      <div className="text-2xl pl-4 flex justify-center pt-3">LabelGenius</div>
      <div className="text-xl pr-4 pb-2">
        {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
      </div>
    </div>
  );
};
