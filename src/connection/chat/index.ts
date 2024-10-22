import httpRequest from "../axios";
import { CreateGptResponse } from "@/interface/Gpt";

const api = httpRequest.api("v1");

interface CreateChat {
  message: string;
  prompt?: string;
}

async function postChat(body: CreateChat) {
  const response = await api.post<CreateChat, CreateGptResponse>("/chat", body);
  return response.data;
}

const chatApi = {
  post: postChat,
};

export default chatApi;
