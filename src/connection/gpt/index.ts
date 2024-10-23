import httpRequest from "../axios";
import { CreateGptRequest } from "@/interface/Gpt";

const api = httpRequest.gpt("v1");

async function postChat(message: string, apiKey: string) {
  return await api.post<CreateGptRequest>(
    "/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: message,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
}

const gptApi = {
  post: postChat,
};

export default gptApi;
