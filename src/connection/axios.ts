import { handler } from "axios-wizard";

const httpRequest = handler({
  api: "/api",
  gpt: "https://api.openai.com",
});

export default httpRequest;
