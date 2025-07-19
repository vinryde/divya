"use client";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      form.reset();
    } else {
      alert("There was an error submitting the form.");
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-self-center gap-4 mb-4" id="formone"> 
    <div className="max-w-3xl md:mt-4 " >
    <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
    <p className="max-w-2xl text-center">Reach out to Senan Education Lab for collaborations, queries, or insights. We're happy to connect with educators, researchers, and partners worldwide.</p>
    </div>
    <form onSubmit={handleSubmit} className=" space-y-4 max-w-2xl border border-slate-400 rounded-lg p-5">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full border border-slate-400 rounded-lg  p-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full border border-slate-400 rounded-lg p-2"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        className="w-full border border-slate-400 rounded-lg p-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full rounded-xl mb-5"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {success && (
        <p className="text-green-600">Thank you! Your message has been saved.</p>
      )}
    </form>
    </div>
  );
}
