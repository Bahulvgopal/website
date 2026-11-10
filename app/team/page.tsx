import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import TeamByYearClient, { TeamMemberItem } from "./TeamByYearClient";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  await connectDB();

  const members = await Member.find({})
    .sort({ year: -1, priority: 1, createdAt: 1 })
    .lean();

  const serializedMembers: TeamMemberItem[] = members.map((member: any) => ({
    _id: member._id.toString(),
    slug: member.slug || "",
    name: member.name || "",
    image: member.image || "",
    role: member.role || "",
    year: member.year || "",
    status: member.status || "current",
    priority: member.priority || 0,
    isMentor: member.isMentor || false,
    bio: member.bio || "",
  }));

  return <TeamByYearClient members={serializedMembers} />;
}
