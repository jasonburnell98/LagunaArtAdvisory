import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, artworkId, artworkTitle, artist, message } =
      body as {
        name: string;
        email: string;
        phone?: string;
        artworkId: string;
        artworkTitle: string;
        artist: string;
        message?: string;
      };

    if (!name || !email || !artworkId || !artworkTitle || !artist) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // ── Send inquiry email via Resend ─────────────────────────────────────────
    await resend.emails.send({
      from: "Laguna Art Advisory <Info@lagartadvisory.com>",
      to: "Info@lagartadvisory.com",
      replyTo: email,
      subject: `Purchase Inquiry: ${artworkTitle} by ${artist}`,
      html: `
        <h2>New Purchase Inquiry</h2>
        <p><strong>Artwork:</strong> ${artworkTitle} by ${artist} (ID: ${artworkId})</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Inquire Error]", err);
    return NextResponse.json(
      { error: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}
