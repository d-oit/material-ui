import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
  // Your edge function content here
  return new NextResponse("Hello, world!");
}
