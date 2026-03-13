"use client";

import { useState } from "react";

const services = [
  {
    icon: "✦",
    title: "Collector Advisory",
    description:
      "Private consultations to define your collecting strategy, budget, and aesthetic direction. Whether you are acquiring your first serious work or refining an existing collection, we provide guidance rooted in curatorial insight and market awareness.",
  },
  {
    icon: "✦",
    title: "Artwork Placement",
    description:
      "We work directly in your space — private residence, office, or hotel — to assess architecture, lighting, and environment, recommending and placing works that integrate meaningfully.",
  },
  {
    icon: "✦",
    title: "Artist Introductions",
    description:
      "Gain access to artists before their work reaches the broader market. We facilitate studio visits and direct introductions so collectors can discover emerging voices early and build lasting relationships with the artists they champion.",
  },
  {
    icon: "✦",
    title: "Private Sales & Projects",
    description:
      "Discreet acquisition and placement of works outside public exhibitions, including access to works held in private collections, commissions, and special projects for corporate or hospitality clients.",
  },
];

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: "",
    date: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Page header */}
      <div
        className="page-hero"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="page-container">
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              color: "#c9a84c",
              letterSpacing: "0.5em",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Personal Service
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              color: "#f5f0e8",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            Book a Consultation
          </h1>
          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#c9a84c",
              margin: "1.5rem auto",
            }}
          />
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              color: "rgba(245,240,232,0.5)",
              maxWidth: "32rem",
              margin: "0 auto",
              fontSize: "0.875rem",
              lineHeight: 1.75,
            }}
          >
            Connect with us to discuss your collecting goals or an upcoming
            project. All consultations are private, complimentary, and tailored
            entirely to your vision.
          </p>
        </div>
      </div>

      {/* Main content */}
      <section style={{ backgroundColor: "#faf7f2", padding: "5rem 0" }}>
        <div className="page-container">
          <div className="consult-grid">
            {/* Services column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div>
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    color: "#c9a84c",
                    letterSpacing: "0.4em",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  Our Services
                </p>
                <h2
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    color: "#0a0a0a",
                    fontWeight: 300,
                    fontSize: "1.875rem",
                    marginBottom: "1rem",
                  }}
                >
                  How We Work With You
                </h2>
                <div
                  style={{
                    width: "2.5rem",
                    height: "1px",
                    backgroundColor: "#c9a84c",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {services.map((service) => (
                  <div
                    key={service.title}
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <span
                      style={{
                        color: "#c9a84c",
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                        flexShrink: 0,
                      }}
                    >
                      {service.icon}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: "Cormorant Garamond, Georgia, serif",
                          color: "#0a0a0a",
                          fontWeight: 300,
                          fontSize: "1.125rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {service.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          color: "rgba(10,10,10,0.5)",
                          fontSize: "0.875rem",
                          lineHeight: 1.75,
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div
                style={{
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(10,10,10,0.1)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    color: "#c9a84c",
                    letterSpacing: "0.3em",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Direct Contact
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    fontFamily: "Jost, system-ui, sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(10,10,10,0.6)",
                  }}
                >
                  <p>(949) 303-3673</p>
                  <p>hello@lagunaartadvisory.com</p>
                  <p>Mon – Sat, 9am – 6pm PST</p>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div>
              {submitted ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "500px",
                  }}
                >
                  <div style={{ textAlign: "center", padding: "0 2rem" }}>
                    <div
                      style={{
                        width: "4rem",
                        height: "4rem",
                        border: "1px solid #c9a84c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                      }}
                    >
                      <span style={{ color: "#c9a84c", fontSize: "1.5rem" }}>✦</span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                        color: "#0a0a0a",
                        fontWeight: 300,
                        fontSize: "1.875rem",
                        marginBottom: "1rem",
                      }}
                    >
                      Thank You, {form.name.split(" ")[0]}
                    </h2>
                    <div
                      style={{
                        width: "3rem",
                        height: "1px",
                        backgroundColor: "#c9a84c",
                        margin: "0 auto 1.5rem",
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        color: "rgba(10,10,10,0.6)",
                        fontSize: "0.875rem",
                        lineHeight: 1.75,
                        maxWidth: "22rem",
                        margin: "0 auto 2rem",
                      }}
                    >
                      Your consultation request has been received. One of our
                      senior advisors will be in touch within 24 hours to
                      confirm your appointment.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          spaceType: "",
                          date: "",
                          message: "",
                        });
                      }}
                      className="hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 cursor-pointer"
                      style={{
                        border: "1px solid rgba(10,10,10,0.2)",
                        color: "rgba(10,10,10,0.6)",
                        padding: "0.75rem 2rem",
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "Jost, system-ui, sans-serif",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  <div className="form-two-col">
                    {/* Full Name */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="name"
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.75rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(10,10,10,0.5)",
                          display: "block",
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="focus:border-[#c9a84c] transition-colors duration-300"
                        placeholder="Alexandra Whitmore"
                        style={{
                          width: "100%",
                          borderBottom: "1px solid rgba(10,10,10,0.2)",
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          backgroundColor: "transparent",
                          padding: "0.75rem 0",
                          fontSize: "0.875rem",
                          color: "#0a0a0a",
                          outline: "none",
                          fontFamily: "Jost, system-ui, sans-serif",
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="email"
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.75rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(10,10,10,0.5)",
                          display: "block",
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="focus:border-[#c9a84c] transition-colors duration-300"
                        placeholder="your@email.com"
                        style={{
                          width: "100%",
                          borderBottom: "1px solid rgba(10,10,10,0.2)",
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          backgroundColor: "transparent",
                          padding: "0.75rem 0",
                          fontSize: "0.875rem",
                          color: "#0a0a0a",
                          outline: "none",
                          fontFamily: "Jost, system-ui, sans-serif",
                        }}
                      />
                    </div>

                    {/* Phone */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="phone"
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.75rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(10,10,10,0.5)",
                          display: "block",
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="focus:border-[#c9a84c] transition-colors duration-300"
                        placeholder="(555) 000-0000"
                        style={{
                          width: "100%",
                          borderBottom: "1px solid rgba(10,10,10,0.2)",
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          backgroundColor: "transparent",
                          padding: "0.75rem 0",
                          fontSize: "0.875rem",
                          color: "#0a0a0a",
                          outline: "none",
                          fontFamily: "Jost, system-ui, sans-serif",
                        }}
                      />
                    </div>

                    {/* Space Type */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="spaceType"
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.75rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(10,10,10,0.5)",
                          display: "block",
                        }}
                      >
                        Space Type *
                      </label>
                      <select
                        id="spaceType"
                        name="spaceType"
                        required
                        value={form.spaceType}
                        onChange={handleChange}
                        className="focus:border-[#c9a84c] transition-colors duration-300"
                        style={{
                          width: "100%",
                          borderBottom: "1px solid rgba(10,10,10,0.2)",
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          backgroundColor: "transparent",
                          padding: "0.75rem 0",
                          fontSize: "0.875rem",
                          color: "#0a0a0a",
                          outline: "none",
                          cursor: "pointer",
                          appearance: "none",
                          fontFamily: "Jost, system-ui, sans-serif",
                        }}
                      >
                        <option value="" disabled>Select a space type</option>
                        <option value="home">Private Residence</option>
                        <option value="office">Office / Corporate</option>
                        <option value="hotel">Hotel / Hospitality</option>
                        <option value="collection">Private Collection (no placement)</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label
                      htmlFor="date"
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(10,10,10,0.5)",
                        display: "block",
                      }}
                    >
                      Preferred Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="focus:border-[#c9a84c] transition-colors duration-300"
                      style={{
                        width: "100%",
                        borderBottom: "1px solid rgba(10,10,10,0.2)",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        backgroundColor: "transparent",
                        padding: "0.75rem 0",
                        fontSize: "0.875rem",
                        color: "#0a0a0a",
                        outline: "none",
                        fontFamily: "Jost, system-ui, sans-serif",
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label
                      htmlFor="message"
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(10,10,10,0.5)",
                        display: "block",
                      }}
                    >
                      Message & Notes
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="focus:border-[#c9a84c] transition-colors duration-300"
                      placeholder="Tell us about your space, your aesthetic preferences, budget range, or any specific works you have in mind..."
                      style={{
                        width: "100%",
                        borderBottom: "1px solid rgba(10,10,10,0.2)",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        backgroundColor: "transparent",
                        padding: "0.75rem 0",
                        fontSize: "0.875rem",
                        color: "#0a0a0a",
                        outline: "none",
                        resize: "none",
                        fontFamily: "Jost, system-ui, sans-serif",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer"
                    style={{
                      width: "100%",
                      backgroundColor: "#0a0a0a",
                      color: "#f5f0e8",
                      padding: "1rem",
                      fontSize: "0.75rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      fontFamily: "Jost, system-ui, sans-serif",
                      border: "none",
                      cursor: "pointer",
                      marginTop: "1rem",
                    }}
                  >
                    Request Consultation
                  </button>

                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(10,10,10,0.3)",
                      textAlign: "center",
                    }}
                  >
                    All consultations are private and complimentary. We respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .form-two-col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          .form-two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
