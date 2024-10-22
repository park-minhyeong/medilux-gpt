import { NextResponse } from "next/server";

async function GET(req: Request) {
  return new NextResponse("Hello World", { status: 200 });
}
export { GET };
