import Link from "next/link";

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ artwork?: string }>;
}) {
  const { artwork } = await searchParams;
  const artworkName = artwork ? decodeURIComponent(artwork) : "the artwork";

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
            border: "1px solid rgba(10,10,10,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
          }}
        >
          <span style={{ color: "rgba(10,10,10,0.3)", fontSize: "1.75rem" }}>
            ✦
          </span>
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
          Purchase Cancelled
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
          Your checkout for{" "}
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
          was not completed. No payment has been taken.
        </p>
        <p
          style={{
            fontFamily: "Jost, system-ui, sans-serif",
            color: "rgba(10,10,10,0.45)",
            fontSize: "0.8rem",
            lineHeight: 1.85,
            marginBottom: "2.5rem",
          }}
        >
          If you have questions about this work or would like to discuss it
          with an advisor, we are happy to help.
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
            Return to Gallery
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
            Speak to an Advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
