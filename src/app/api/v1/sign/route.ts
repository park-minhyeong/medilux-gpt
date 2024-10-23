import { NextRequest, NextResponse } from "next/server";

const username = process.env.USERNAME ?? "";
const password = process.env.PASSWORD ?? "";
if (!username || !password) throw new Error("username or password is not set");

async function POST(request: NextRequest) {
  if (request.headers.get("content-type") !== "application/json")
    return new NextResponse("Invalid content type", { status: 400 });
  const body = await request.json();
  try {
    if (body.username !== username || body.password !== password)
      return new NextResponse("Unauthorized", { status: 401 });
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export { POST };
