import { useMutation } from "@tanstack/react-query";
import { chatApi } from "@/connection";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message } from "@/interface/Gpt";
import defaultText from "@/asset/sample";
interface ChatStoreProps {
  messages: Message[];
  clearMessages: () => void;
  setMessage: (message: Message) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
}
const useChatStore = create(
  persist<ChatStoreProps>(
    (set, get) => ({
      messages: [],
      clearMessages: () => {
        set((state) => {
          return {
            ...state,
            messages: [],
          };
        });
      },
      setMessage: (message: Message) => {
        set((state) => {
          return {
            ...state,
            messages: [...state.messages, message],
          };
        });
      },
      prompt: defaultText,
      setPrompt: (prompt: string) => set({ prompt }),
    }),
    { name: "chatStorage" },
  ),
);

export default function useChat() {
  const { messages, setMessage, prompt, setPrompt, clearMessages } =
    useChatStore();
  const { mutate: postChat } = useMutation({
    mutationKey: ["postChat"],
    mutationFn: (content: string) => {
      const temps: Message[] = [
        ...messages,
        { role: "user", content },
        { role: "system", content: prompt },
      ];
      return chatApi.post({
        messages: temps.map((prop) => ({
          role: prop.role,
          content: prop.content,
        })),
      });
    },
    onSuccess: (res) => {
      setMessage({
        role: "assistant",
        content: res.choices[0].message.content,
      });
    },
  });
  return {
    prompt,
    setPrompt,
    messages,
    setMessage,
    postChat,
    clearMessages,
  };
}
