// app/api/contact/route.ts

import { writeClient } from "@/sanity/lib/writeclient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sanity write error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
