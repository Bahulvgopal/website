import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import ExMembersClient from "./ExMembersClient";

export const dynamic = "force-dynamic";

export default async function ExMembersPage() {
  await connectDB();

  const members = await Member.find({ status: "ex" })
    .sort({ year: -1, priority: 1 })
    .lean();

  const serializedMembers = members.map((member: any) => ({
    _id: member._id.toString(),
    name: member.name || "",
    image: member.image || "",
    role: member.role || "",
    year: member.year || "",
    status: member.status || "ex",
    priority: member.priority || 0,
    isMentor: member.isMentor || false,
    bio: member.bio || "",
  }));

  return <ExMembersClient members={serializedMembers} />;
}