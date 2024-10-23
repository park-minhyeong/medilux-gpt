import { signApi } from "@/connection";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SignStoreProps {
  isSignIn: boolean;
  signIn: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
const useSignStore = create(
  persist<SignStoreProps>(
    (set) => ({
      isSignIn: false,
      signIn: () => set({ isSignIn: true }),
      isLoading: true,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "signStorage",
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(true);
      },
    }
  )
);

export default function useSign() {
  const router = useRouter();
  const {
    isSignIn,
    isLoading,
    setIsLoading,
    signIn: signInPersist,
  } = useSignStore();
  const { mutate: signIn } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) =>
      signApi.signIn({
        username,
        password,
      }),
    onError: () => {
      alert("회원 정보가 일치하지 않습니다.");
    },
    onSuccess: () => {
      signInPersist();
      router.push("/chat");
    },
  });
  useEffect(() => {
    setIsLoading(false);
  }, [isSignIn]);
  return {
    isSignIn,
    isLoading,
    signIn,
  };
}
