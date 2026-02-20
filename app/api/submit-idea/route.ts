import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongodb";
import StartupIdea from "@/models/StartupIdea";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      email,
      phone,
      department,
      year,
      ideaTitle,
      ideaDescription,
    } = body;

    // ✅ Validation
    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !year ||
      !ideaTitle ||
      !ideaDescription
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Save to DB
    await StartupIdea.create({
      name,
      email,
      phone,
      department,
      year,
      ideaTitle,
      ideaDescription,
    });

    // ✅ Send confirmation mail to student
    await resend.emails.send({
      from: "Legacy IEDC <onboarding@resend.dev>",
      to: email,
      subject: "🚀 We Received Your Startup Idea",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for submitting your startup idea to Legacy IEDC.</p>

        <h3>Your Submission Details:</h3>
        <p><strong>Idea Title:</strong> ${ideaTitle}</p>
        <p><strong>Description:</strong></p>
        <blockquote>${ideaDescription}</blockquote>

        <p>We will review your idea and contact you soon.</p>

        <br/>
        <p>— Legacy IEDC Team</p>
      `,
    });

    // ✅ Send mail to Admin
    await resend.emails.send({
      from: "Legacy IEDC <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: "📥 New Startup Idea Submission",
      html: `
        <h2>New Startup Idea Submitted 🚀</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Year:</strong> ${year}</p>

        <hr/>

        <p><strong>Idea Title:</strong> ${ideaTitle}</p>
        <p><strong>Description:</strong></p>
        <blockquote>${ideaDescription}</blockquote>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit Idea Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
