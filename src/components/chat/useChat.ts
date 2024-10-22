import { useMutation } from "@tanstack/react-query";
import { chatApi } from "@/connection";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatStoreProps {
  messages: string[];
  setMessage: (message: string) => void;
}
const useChatStore = create(
  persist<ChatStoreProps>(
    (set, get) => ({
      messages: [],
      setMessage: (message: string) => {
        set((state) => {
          return {
            ...state,
            messages: [...state.messages, message],
          };
        });
      },
    }),
    { name: "chatStorage" },
  ),
);

export default function useChat() {
  const { messages, setMessage } = useChatStore();
  const { mutate: postChat } = useMutation({
    mutationKey: ["postChat"],
    mutationFn: (message: string) =>
      chatApi.post({
        message,
      }),
    onSuccess: (res) => {
      setMessage(res.choices[0].message.content);
    },
  });
  return { messages, postChat };
}
