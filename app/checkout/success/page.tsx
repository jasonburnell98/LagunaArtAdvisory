import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ artwork?: string }>;
}) {
  const { artwork } = await searchParams;
  const artworkName = artwork ? decodeURIComponent(artwork) : "your artwork";

  return (
    <section
      style={{
        minHeight: "70vh",
        backgroundColor: "#faf7f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "32rem" }}>
        {/* Icon */}
        <div
          style={{
            width: "5rem",
            height: "5rem",
            border: "1px solid #c9a84c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
          }}
        >
          <span style={{ color: "#c9a84c", fontSize: "1.75rem" }}>✦</span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            color: "#0a0a0a",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Thank You
        </h1>

        {/* Gold divider */}
        <div
          style={{
            width: "3rem",
            height: "1px",
            backgroundColor: "#c9a84c",
            margin: "0 auto 1.5rem",
          }}
        />

        {/* Message */}
        <p
          style={{
            fontFamily: "Jost, system-ui, sans-serif",
            color: "rgba(10,10,10,0.6)",
            fontSize: "0.875rem",
            lineHeight: 1.85,
            marginBottom: "0.75rem",
          }}
        >
          Your purchase of{" "}
          <em
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "#0a0a0a",
            }}
          >
            {artworkName}
          </em>{" "}
          has been confirmed.
        </p>
        <p
          style={{
            fontFamily: "Jost, system-ui, sans-serif",
            color: "rgba(10,10,10,0.5)",
            fontSize: "0.8rem",
            lineHeight: 1.85,
            marginBottom: "2.5rem",
          }}
        >
          You will receive a confirmation email shortly. One of our advisors
          will be in touch within 24 hours to coordinate delivery and
          authentication documentation.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Link
            href="/gallery"
            style={{
              backgroundColor: "#0a0a0a",
              color: "#f5f0e8",
              padding: "0.875rem 2.5rem",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "Jost, system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            Continue Browsing
          </Link>
          <Link
            href="/consultation"
            style={{
              border: "1px solid rgba(10,10,10,0.2)",
              color: "rgba(10,10,10,0.6)",
              padding: "0.875rem 2.5rem",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "Jost, system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
