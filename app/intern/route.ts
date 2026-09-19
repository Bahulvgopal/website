import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    "https://forms.gle/QkhLhpXYreS2omjL7",
    307
  );
}