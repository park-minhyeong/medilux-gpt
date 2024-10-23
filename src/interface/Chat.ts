import { Message } from "@/interface/Gpt";

export interface CreateChat {
  messages: Message[];
}

export function isCreateChat(obj: any): obj is CreateChat {
  return (
    obj.messages &&
    Array.isArray(obj.messages) &&
    obj.messages.every(
      (message: any) =>
        message &&
        typeof message === "object" &&
        (message.role === "user" ||
          message.role === "assistant" ||
          message.role === "system") &&
        message.content &&
        typeof message.content === "string",
    )
  );
}
