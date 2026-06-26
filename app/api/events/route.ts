import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json(); // ✅ JSON not formData

    const {
      title,
      description,
      image,
      location,
      eventDate,
      registrationDeadline,
      registrationType,
      externalRegistrationUrl,
    } = body;

    if (
      !title ||
      !description ||
      !image ||
      !location ||
      !eventDate ||
      !registrationDeadline
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔥 Normalize registration type (defaults to internal)
    const finalRegistrationType =
      registrationType === "external" ? "external" : "internal";

    if (
      finalRegistrationType === "external" &&
      !externalRegistrationUrl
    ) {
      return NextResponse.json(
        { message: "External Registration URL is required" },
        { status: 400 }
      );
    }

    const newEvent = await Event.create({
      title,
      description,
      image,
      location,
      eventDate,
      registrationDeadline,
      registrationType: finalRegistrationType,
      externalRegistrationUrl:
        finalRegistrationType === "external"
          ? externalRegistrationUrl
          : "",
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Event creation failed" },
      { status: 500 }
    );
  }
}