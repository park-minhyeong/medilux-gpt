type Role = "user" | "assistant" | "system";

export interface Message {
  role: Role;
  content: string;
}
export function isMessage(obj: any): obj is Message {
  return (
    typeof obj.role === "string" &&
    ["user", "assistant", "system"].includes(obj.role) &&
    typeof obj.content === "string"
  );
}

export interface CreateGptRequest {
  model: "gpt-3.5-turbo" | "gpt-4";
  messages: Message[];
}

interface Choice {
  index: number;
  message: {
    role: Role;
    content: string;
    refusal: null;
  };
  logprobs: null;
  finish_reason: string;
}

export interface CreateGptResponse {
  choices: Choice[];
}
