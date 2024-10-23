import httpRequest from "../axios";
import { CreateGptRequest, Message } from "@/interface/Gpt";

const api = httpRequest.gpt("v1");

async function postChat(messages: Message[], apiKey: string) {
  return await api.post<CreateGptRequest>(
    "/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );
}

const gptApi = {
  post: postChat,
};

export default gptApi;
