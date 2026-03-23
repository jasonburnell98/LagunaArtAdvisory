import { NextRequest, NextResponse } from "next/server";

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

    // ── Log the inquiry (replace with email service when ready) ──────────────
    console.log("=== New Purchase Inquiry ===");
    console.log(`Artwork:  ${artworkTitle} by ${artist} (${artworkId})`);
    console.log(`From:     ${name} <${email}>`);
    if (phone) console.log(`Phone:    ${phone}`);
    if (message) console.log(`Message:  ${message}`);
    console.log("============================");

    // TODO: Integrate an email service here (e.g. Resend, SendGrid, Nodemailer)
    // Example with Resend:
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "gallery@lagunaartadvisory.com",
    //   to: "hello@lagunaartadvisory.com",
    //   subject: `Purchase Inquiry: ${artworkTitle} by ${artist}`,
    //   html: `<p><strong>${name}</strong> (${email}) is interested in purchasing <em>${artworkTitle}</em> by ${artist}.</p><p>${message ?? ""}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Inquire Error]", err);
    return NextResponse.json(
      { error: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}
