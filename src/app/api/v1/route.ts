import { NextResponse } from "next/server";

async function GET(req: Request) {
  return new NextResponse("I'm a teapot", { status: 418 });
}
export { GET };
