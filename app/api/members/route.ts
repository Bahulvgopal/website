import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

// GET all members
export async function GET() {
  await connectDB();

  const members = await Member.find().sort({ createdAt: -1 });

  return NextResponse.json(members);
}

// CREATE new member
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newMember = await Member.create(body);

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create member" },
      { status: 500 }
    );
  }
}
