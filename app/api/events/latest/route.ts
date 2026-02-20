import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find({})
      .sort({ createdAt: -1 }) // 🔥 newest events first
      .limit(5);               // 🔥 show only 5

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
