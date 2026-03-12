"use client";

import { useState } from "react";

const services = [
  {
    icon: "✦",
    title: "Private Collector Consultations",
    description:
      "One-on-one sessions with a senior advisor to define your collecting strategy, budget, and aesthetic direction.",
  },
  {
    icon: "✦",
    title: "Residential Art Placement",
    description:
      "We assess your home's architecture, lighting, and décor to recommend and place works that integrate beautifully.",
  },
  {
    icon: "✦",
    title: "Corporate & Office Art",
    description:
      "Curated programs for offices, lobbies, and boardrooms that reflect brand identity and inspire creativity.",
  },
  {
    icon: "✦",
    title: "Hospitality & Hotel Curation",
    description:
      "Full-service art programs for boutique hotels, resorts, and spas — from concept to installation.",
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
      <div className="bg-[#0a0a0a] pt-36 pb-20 px-6 text-center">
        <p
          className="text-[#c9a84c] tracking-[0.5em] text-xs uppercase mb-4"
          style={{ fontFamily: "Jost, system-ui, sans-serif" }}
        >
          Personal Service
        </p>
        <h1
          className="text-[#f5f0e8] font-light"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          }}
        >
          Book a Consultation
        </h1>
        <div className="h-px w-16 bg-[#c9a84c] mx-auto mt-6 mb-6" />
        <p
          className="text-[#f5f0e8]/50 max-w-lg mx-auto text-sm leading-relaxed"
          style={{ fontFamily: "Jost, system-ui, sans-serif" }}
        >
          Connect with one of our senior advisors to discuss your vision. All
          consultations are private, complimentary, and tailored to your needs.
        </p>
      </div>

      <section className="bg-[#faf7f2] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Services column */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p
                  className="text-[#c9a84c] tracking-[0.4em] text-xs uppercase mb-3"
                  style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                >
                  Our Services
                </p>
                <h2
                  className="text-[#0a0a0a] font-light text-3xl"
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                  }}
                >
                  How We Can Help
                </h2>
                <div className="h-px w-10 bg-[#c9a84c] mt-4" />
              </div>

              <div className="space-y-8">
                {services.map((service) => (
                  <div key={service.title} className="flex gap-4">
                    <span className="text-[#c9a84c] text-xs mt-1 shrink-0">
                      {service.icon}
                    </span>
                    <div>
                      <h3
                        className="text-[#0a0a0a] font-light text-lg mb-1"
                        style={{
                          fontFamily: "Cormorant Garamond, Georgia, serif",
                        }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="text-[#0a0a0a]/50 text-sm leading-relaxed"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div className="pt-4 border-t border-[#0a0a0a]/10">
                <p
                  className="text-[#c9a84c] tracking-[0.3em] text-xs uppercase mb-4"
                  style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                >
                  Direct Contact
                </p>
                <div
                  className="space-y-2 text-sm text-[#0a0a0a]/60"
                  style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                >
                  <p>(949) 555-0192</p>
                  <p>hello@lagunaartadvisory.com</p>
                  <p>Mon – Sat, 9am – 6pm PST</p>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="h-full flex items-center justify-center min-h-[500px]">
                  <div className="text-center px-8">
                    <div className="w-16 h-16 border border-[#c9a84c] flex items-center justify-center mx-auto mb-6">
                      <span className="text-[#c9a84c] text-2xl">✦</span>
                    </div>
                    <h2
                      className="text-[#0a0a0a] font-light text-3xl mb-4"
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                      }}
                    >
                      Thank You, {form.name.split(" ")[0]}
                    </h2>
                    <div className="h-px w-12 bg-[#c9a84c] mx-auto mb-6" />
                    <p
                      className="text-[#0a0a0a]/60 text-sm leading-relaxed max-w-sm mx-auto"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
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
                      className="mt-8 border border-[#0a0a0a]/20 text-[#0a0a0a]/60 px-8 py-3 text-xs tracking-[0.2em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 cursor-pointer"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-xs tracking-[0.2em] uppercase text-[#0a0a0a]/50"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
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
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-3 text-sm text-[#0a0a0a] outline-none focus:border-[#c9a84c] transition-colors duration-300 placeholder:text-[#0a0a0a]/20"
                        placeholder="Alexandra Whitmore"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-[0.2em] uppercase text-[#0a0a0a]/50"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
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
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-3 text-sm text-[#0a0a0a] outline-none focus:border-[#c9a84c] transition-colors duration-300 placeholder:text-[#0a0a0a]/20"
                        placeholder="your@email.com"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-xs tracking-[0.2em] uppercase text-[#0a0a0a]/50"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-3 text-sm text-[#0a0a0a] outline-none focus:border-[#c9a84c] transition-colors duration-300 placeholder:text-[#0a0a0a]/20"
                        placeholder="(555) 000-0000"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      />
                    </div>

                    {/* Space Type */}
                    <div className="space-y-2">
                      <label
                        htmlFor="spaceType"
                        className="block text-xs tracking-[0.2em] uppercase text-[#0a0a0a]/50"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        Space Type *
                      </label>
                      <select
                        id="spaceType"
                        name="spaceType"
                        required
                        value={form.spaceType}
                        onChange={handleChange}
                        className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-3 text-sm text-[#0a0a0a] outline-none focus:border-[#c9a84c] transition-colors duration-300 cursor-pointer appearance-none"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        <option value="" disabled>
                          Select a space type
                        </option>
                        <option value="home">Private Residence</option>
                        <option value="office">Office / Corporate</option>
                        <option value="hotel">Hotel / Hospitality</option>
                        <option value="collection">
                          Private Collection (no placement)
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-2">
                    <label
                      htmlFor="date"
                      className="block text-xs tracking-[0.2em] uppercase text-[#0a0a0a]/50"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    >
                      Preferred Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-3 text-sm text-[#0a0a0a] outline-none focus:border-[#c9a84c] transition-colors duration-300"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-xs tracking-[0.2em] uppercase text-[#0a0a0a]/50"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    >
                      Message & Notes
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-3 text-sm text-[#0a0a0a] outline-none focus:border-[#c9a84c] transition-colors duration-300 resize-none placeholder:text-[#0a0a0a]/20"
                      placeholder="Tell us about your space, your aesthetic preferences, budget range, or any specific works you have in mind..."
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0a0a0a] text-[#f5f0e8] py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-400 cursor-pointer mt-4"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    Request Consultation
                  </button>

                  <p
                    className="text-xs text-[#0a0a0a]/30 text-center"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    All consultations are private and complimentary. We respond
                    within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
