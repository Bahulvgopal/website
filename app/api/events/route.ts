import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      description,
      image,
      location,
      eventDate,
      registrationDeadline,

      // Registration
      registrationType,
      externalRegistrationUrl,

      // Team Event
      eventMode,
      minTeamMembers,
      maxTeamMembers,
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

    // ===========================
    // Registration Type
    // ===========================

    const finalRegistrationType =
      registrationType === "external"
        ? "external"
        : "internal";

    if (
      finalRegistrationType === "external" &&
      !externalRegistrationUrl
    ) {
      return NextResponse.json(
        {
          message: "External Registration URL is required",
        },
        {
          status: 400,
        }
      );
    }

    // ===========================
    // Event Mode
    // ===========================

    const finalEventMode =
      eventMode === "team"
        ? "team"
        : "solo";

    let finalMinMembers = 1;
    let finalMaxMembers = 1;

    if (finalEventMode === "team") {
      finalMinMembers = Number(minTeamMembers);
      finalMaxMembers = Number(maxTeamMembers);

      if (
        isNaN(finalMinMembers) ||
        isNaN(finalMaxMembers)
      ) {
        return NextResponse.json(
          {
            message: "Invalid team size.",
          },
          {
            status: 400,
          }
        );
      }

      if (finalMinMembers < 2) {
        return NextResponse.json(
          {
            message:
              "Minimum team members must be at least 2.",
          },
          {
            status: 400,
          }
        );
      }

      if (finalMaxMembers < finalMinMembers) {
        return NextResponse.json(
          {
            message:
              "Maximum team members cannot be less than minimum team members.",
          },
          {
            status: 400,
          }
        );
      }
    }

    // ===========================
    // Create Event
    // ===========================

    const data = {
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

  eventMode: finalEventMode,
  minTeamMembers: finalMinMembers,
  maxTeamMembers: finalMaxMembers,
};

console.log("DATA TO SAVE:", data);

const newEvent = await Event.create(data);

console.log("DOCUMENT AFTER SAVE:", newEvent);

return NextResponse.json(newEvent);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Event creation failed",
      },
      {
        status: 500,
      }
    );
  }
}