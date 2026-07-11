import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Authentication
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "admin" &&
      session.user.role !== "mentor")
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  await connectDB();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response("Invalid Event ID", {
      status: 400,
    });
  }

  const event = await Event.findById(id);

  if (!event) {
    return new Response("Event not found", {
      status: 404,
    });
  }

  const registrations = await Registration.find({
    eventId: new mongoose.Types.ObjectId(id),
  }).sort({
    createdAt: -1,
  });

  if (!registrations.length) {
    return new Response(
      "No registrations found",
      {
        status: 404,
      }
    );
  }

  let headers: string[];

  // ===============================
  // SOLO EVENT EXPORT
  // ===============================

  if (event.eventMode === "solo") {

    headers = [
      "Name",
      "Email",
      "Phone",
      "Department",
      "Year",
      "Description",
      "Registered At",
    ];

    const rows = registrations.map(
      (r: any) => [
        r.name,
        r.email,
        r.phone,
        r.department,
        r.year,
        r.description || "",
        new Date(
          r.createdAt
        ).toLocaleString(),
      ]
    );

    const csv =
      [headers, ...rows]
        .map((row) =>
          row
            .map((v) =>
              `"${String(v).replace(/"/g, '""')}"`
            )
            .join(",")
        )
        .join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type":
          "text/csv",

        "Content-Disposition":
          `attachment; filename="${event.title}-registrations.csv"`,
      },
    });
  }

  // ===============================
  // TEAM EVENT EXPORT
  // ===============================

  headers = [
    "Team Name",
    "Leader",
    "Leader Email",
    "Leader Phone",
    "Leader Department",
    "Leader Year",
    "Description",
    "Total Members",
    "Members",
    "Registered At",
  ];

  const rows = registrations.map(
    (r: any) => {

      const memberList =
        (r.members || [])
          .map(
            (m: any) =>
              `${m.name} (${m.department}-${m.year})`
          )
          .join(" | ");

      return [
        r.teamName,

        r.name,

        r.email,

        r.phone,

        r.department,

        r.year,

        r.description || "",

        (r.members?.length || 0) + 1,

        memberList,

        new Date(
          r.createdAt
        ).toLocaleString(),
      ];
    }
  );

  const csv =
    [headers, ...rows]
      .map((row) =>
        row
          .map((v) =>
            `"${String(v).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type":
        "text/csv",

      "Content-Disposition":
        `attachment; filename="${event.title}-registrations.csv"`,
    },
  });
}