import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { slug: string; id: string }; // ✅ NOT Promise
}) {
  await connectDB();

  const { slug, id } = params;

  const oldSlug = `${slug}-${id}`;

  const member = await Member.findOne({ oldSlug }).lean();

  if (member) {
    redirect(`/team/member/${member.slug}`);
  }

  return <div>Member not found</div>;
}