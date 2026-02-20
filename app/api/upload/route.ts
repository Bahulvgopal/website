import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, folder = "legacy-iedc" } = body;

    if (!image) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 }
      );
    }

    const uploaded = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: "image",

      // ⭐ PERFORMANCE OPTIMIZATION
      transformation: [
        { width: 1200, crop: "limit", quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    return NextResponse.json({
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
