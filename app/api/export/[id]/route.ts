import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 🔐 Check authentication
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "admin" &&
      session.user.role !== "mentor")
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();

  const { id } = await params;

  // 🔍 Fetch registrations
  const registrations = await Registration.find({
    eventId: new mongoose.Types.ObjectId(id),
  }).sort({ createdAt: -1 });

  if (!registrations.length) {
    return new Response("No registrations found", {
      status: 404,
    });
  }

  // 📄 Create CSV content
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Department",
    "Year",
    "Registered At",
  ];

  const rows = registrations.map((r: any) => [
    r.name,
    r.email,
    r.phone,
    r.department,
    r.year,
    new Date(r.createdAt).toLocaleString(),
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

  return new Response(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="registrations-${id}.csv"`,
    },
  });
}
