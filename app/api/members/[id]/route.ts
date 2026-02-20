import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";

type Context = {
  params: Promise<{ id: string }>;
};

/* ================= GET ================= */
export async function GET(req: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const member = await Member.findById(id).lean();

    if (!member) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Fetch failed" },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
export async function PUT(req: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const oldMember = await Member.findById(id);

    if (!oldMember) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    // ⭐ DELETE OLD CLOUDINARY IMAGE IF CHANGED
    if (
      oldMember.imagePublicId &&
      body.imagePublicId &&
      oldMember.imagePublicId !== body.imagePublicId
    ) {
      await cloudinary.uploader.destroy(
        oldMember.imagePublicId
      );
    }

    const updated = await Member.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const member = await Member.findById(id);

    if (!member) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    // ⭐ DELETE IMAGE FROM CLOUDINARY
    if (member.imagePublicId) {
      await cloudinary.uploader.destroy(
        member.imagePublicId
      );
    }

    await Member.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
