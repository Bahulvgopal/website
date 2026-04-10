import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  await connectDB();

  const { slug } = await params;
  const { id } = await searchParams;

  // recreate old slug format → co-5
  const oldSlug = id ? `${slug}-${id}` : slug;

  const member = await Member.findOne({ oldSlug }).lean();

  if (member) {
    redirect(`/team/member/${member.slug}`);
  }

  return <div>Member not found</div>;
}