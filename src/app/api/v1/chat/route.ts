import { gptApi } from "@/connection";
import { NextRequest, NextResponse } from "next/server";
import { isCreateChat } from "@/interface/Chat";

const apiKey = process.env.OPENAI_API_KEY;
async function POST(request: NextRequest) {
  if (request.headers.get("content-type") !== "application/json") {
    return new NextResponse("Invalid content type", { status: 400 });
  }
  const body = await request.json();
  try {
    if (!apiKey) return new NextResponse("Unauthorized", { status: 401 });
    if (!isCreateChat(body))
      return new NextResponse("Bad Request", { status: 400 });
    const response = await gptApi.post(body.message, apiKey);
    return new NextResponse(JSON.stringify(response.data), {
      status: response.status,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export { POST };
