import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(body.eventId)) {
      return NextResponse.json(
        { error: "Invalid Event ID" },
        { status: 400 }
      );
    }

    const event = await Event.findById(
      new mongoose.Types.ObjectId(body.eventId)
    );

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // ==========================
    // Registration Deadline
    // ==========================

    if (
      event.registrationDeadline &&
      new Date(event.registrationDeadline) < new Date()
    ) {
      return NextResponse.json(
        { error: "Registration closed" },
        { status: 400 }
      );
    }

    // ==========================
    // Team Validation
    // ==========================

    if (event.eventMode === "team") {

      if (!body.isTeam) {
        return NextResponse.json(
          {
            error: "This event requires team registration.",
          },
          {
            status: 400,
          }
        );
      }

      if (!body.teamName?.trim()) {
        return NextResponse.json(
          {
            error: "Team name is required.",
          },
          {
            status: 400,
          }
        );
      }

      if (!Array.isArray(body.members)) {
        return NextResponse.json(
          {
            error: "Members are required.",
          },
          {
            status: 400,
          }
        );
      }

      const totalMembers =
        body.members.length + 1;

      if (
        totalMembers <
        event.minTeamMembers
      ) {
        return NextResponse.json(
          {
            error: `Minimum ${event.minTeamMembers} members required.`,
          },
          {
            status: 400,
          }
        );
      }

      if (
        totalMembers >
        event.maxTeamMembers
      ) {
        return NextResponse.json(
          {
            error: `Maximum ${event.maxTeamMembers} members allowed.`,
          },
          {
            status: 400,
          }
        );
      }

      for (const member of body.members) {
        if (
          !member.name ||
          !member.department ||
          !member.year
        ) {
          return NextResponse.json(
            {
              error:
                "All team member details are required.",
            },
            {
              status: 400,
            }
          );
        }
      }
    }

    // ==========================
    // Create Registration
    // ==========================

    const registration =
      await Registration.create({
        eventId:
          new mongoose.Types.ObjectId(
            body.eventId
          ),

        isTeam:
          event.eventMode === "team",

        teamName:
          body.teamName || "",

        name: body.name,
        email: body.email,
        phone: body.phone,
        department: body.department,
        year: body.year,
        description:
          body.description || "",

        members:
          body.members || [],
      });

    return NextResponse.json({
      message:
        "Registration Successful 🚀",
      registration,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Registration Failed",
      },
      {
        status: 500,
      }
    );
  }
}