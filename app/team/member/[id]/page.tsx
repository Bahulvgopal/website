import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import MemberProfile from "@/components/MemberProfile";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  const member = await Member.findById(id).lean();

  if (!member) return notFound();

  return (
    <MemberProfile
      member={JSON.parse(JSON.stringify(member))}
    />
  );
}
