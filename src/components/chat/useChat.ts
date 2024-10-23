import { useMutation } from "@tanstack/react-query";
import { chatApi } from "@/connection";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Message {
  user: "user" | "bot";
  text: string;
}
interface ChatStoreProps {
  messages: Message[];
  setMessage: (message: Message) => void;
}
const useChatStore = create(
  persist<ChatStoreProps>(
    (set, get) => ({
      messages: [],
      setMessage: (message: Message) => {
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
    mutationFn: (text: string) => {
      const temps = [...messages, { user: "user", text }];
      return chatApi.post({
        messages: temps.map((prop) => ({
          role: prop.user === "user" ? "user" : "assistant",
          content: prop.text,
        })),
      });
    },
    onSuccess: (res) => {
      setMessage({
        user: "bot",
        text: res.choices[0].message.content,
      });
    },
  });
  return { messages, setMessage, postChat };
}
