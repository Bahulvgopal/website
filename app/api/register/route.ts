import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const event = await Event.findById(
      new mongoose.Types.ObjectId(body.eventId)
    );

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    const now = new Date();

    // 🚨 Deadline check
    if (
      event.registrationDeadline &&
      new Date(event.registrationDeadline) < now
    ) {
      return NextResponse.json(
        { error: "Registration closed" },
        { status: 400 }
      );
    }

    const registration = await Registration.create({
      ...body,
      eventId: new mongoose.Types.ObjectId(body.eventId),
    });

    return NextResponse.json({
      message: "Registration Successful 🚀",
      registration,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Registration Failed" },
      { status: 500 }
    );
  }
}
