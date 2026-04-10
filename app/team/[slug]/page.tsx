import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id?: string };
}) {
  await connectDB();

  const { slug } = params;
  const id = searchParams?.id;

  let oldSlug = "";

  // ✅ Case 1: /team/co?id=5
  if (id) {
    oldSlug = `${slug}-${id}`;
  }

  // ❗ Case 2: /team/cmo/2 (handled below)
  // fallback will handle it

  // Try finding member
  let member = await Member.findOne({ oldSlug }).lean();

  // 🔥 Handle /team/cmo/2 format
  if (!member && slug.includes("/")) {
    const parts = slug.split("/");
    if (parts.length === 2) {
      oldSlug = `${parts[0]}-${parts[1]}`;
      member = await Member.findOne({ oldSlug }).lean();
    }
  }

  if (member) {
    redirect(`/team/member/${member.slug}`);
  }

  return <div>Member not found</div>;
}