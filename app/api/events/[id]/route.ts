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

  /* ===========================
     Registration Type
  =========================== */

  const finalRegistrationType =
    body.registrationType === "external"
      ? "external"
      : "internal";

  if (
    finalRegistrationType === "external" &&
    !body.externalRegistrationUrl
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

  /* ===========================
     Event Mode
  =========================== */

  const finalEventMode =
    body.eventMode === "team"
      ? "team"
      : "solo";

  let finalMinMembers = 1;
  let finalMaxMembers = 1;

  if (finalEventMode === "team") {
    finalMinMembers = Number(body.minTeamMembers);
    finalMaxMembers = Number(body.maxTeamMembers);

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
          message: "Minimum team members must be at least 2.",
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

if (finalMaxMembers > 10) {
  return NextResponse.json(
    {
      message: "Maximum team size cannot exceed 10.",
    },
    {
      status: 400,
    }
  );
}
  }

  /* ===========================
     Update Payload
  =========================== */

  const updatePayload = {
    ...body,

    registrationType: finalRegistrationType,

    externalRegistrationUrl:
      finalRegistrationType === "external"
        ? body.externalRegistrationUrl
        : "",

    eventMode: finalEventMode,

    minTeamMembers: finalMinMembers,

    maxTeamMembers: finalMaxMembers,
  };

  const updated = await Event.findByIdAndUpdate(
    id,
    updatePayload,
    {
      new: true,
    }
  );

  if (!updated) {
    return NextResponse.json(
      {
        message: "Event not found",
      },
      {
        status: 404,
      }
    );
  }

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

  await Registration.deleteMany({ eventId });

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