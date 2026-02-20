import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import Registration from "@/models/Registration";
import mongoose from "mongoose";

/* ================= GET SINGLE EVENT ================= */

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ID" },
      { status: 400 }
    );
  }

  const event = await Event.findById(id);

  if (!event) {
    return NextResponse.json(
      { message: "Event not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}

/* ================= UPDATE EVENT ================= */

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ID" },
      { status: 400 }
    );
  }

  const updated = await Event.findByIdAndUpdate(
    id,
    body,
    { returnDocument: "after" }
  );

  return NextResponse.json(updated);
}

/* ================= DELETE EVENT ================= */

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ID" },
      { status: 400 }
    );
  }

  const eventId = new mongoose.Types.ObjectId(id);

  // Delete registrations first
  await Registration.deleteMany({ eventId });

  // Delete event
  const deleted = await Event.findByIdAndDelete(eventId);

  if (!deleted) {
    return NextResponse.json(
      { message: "Event not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Deleted successfully",
  });
}
