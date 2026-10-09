"use client";

import { useState } from "react";

// Google Form: "The Lives We Live: Launch List"
// Responses land in the form's Responses tab (and its linked Sheet, if you add one).
const FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSddEpAi0L_zeJRlm-C8ymxB5PBFJ1-QjSeHrxA6VklrhCAWSw/formResponse";
const FIELDS = {
    name: "entry.249852700",
    email: "entry.1672037734",
    updates: "entry.2082125257",
};
const UPDATES_OPTION = "Also keep me posted on One4All events and stories";

export default function LaunchSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [updates, setUpdates] = useState(true);
    const [status, setStatus] = useState("idle"); // idle | sending | done | error

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("sending");
        const body = new URLSearchParams();
        body.append(FIELDS.name, name.trim());
        body.append(FIELDS.email, email.trim());
        if (updates) body.append(FIELDS.updates, UPDATES_OPTION);
        try {
            // Google Forms doesn't send CORS headers, so the response is opaque;
            // a network error is the only failure we can detect.
            await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body });
            setStatus("done");
        } catch {
            setStatus("error");
        }
    }

    if (status === "done") {
        return (
            <div className="text-center py-6">
                <p className="text-3xl font-serif text-[#5c2d12] mb-3">You&apos;re on the list.</p>
                <p className="text-[#5c4a3a]">
                    Thanks{name ? `, ${name.split(" ")[0]}` : ""}! We&apos;ll email you the moment
                    <span className="italic"> The Lives We Live</span> is out.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                    <span className="sr-only">Name</span>
                    <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-[#c9b896] bg-white/80 px-4 py-3 text-[#3b2a1d] placeholder-[#9a8a72] focus:outline-none focus:ring-2 focus:ring-[#4f7a35]"
                    />
                </label>
                <label className="block">
                    <span className="sr-only">Email</span>
                    <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-[#c9b896] bg-white/80 px-4 py-3 text-[#3b2a1d] placeholder-[#9a8a72] focus:outline-none focus:ring-2 focus:ring-[#4f7a35]"
                    />
                </label>
            </div>
            <label className="flex items-center gap-3 text-sm text-[#5c4a3a] cursor-pointer">
                <input
                    type="checkbox"
                    checked={updates}
                    onChange={(e) => setUpdates(e.target.checked)}
                    className="h-4 w-4 accent-[#4f7a35]"
                />
                Also keep me posted on One4All events and stories
            </label>
            <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-[#5c2d12] hover:bg-[#46220d] disabled:opacity-60 text-[#f4ecd8] font-semibold py-3 text-lg transition"
            >
                {status === "sending" ? "Adding you..." : "Notify me at launch"}
            </button>
            {status === "error" && (
                <p className="text-sm text-red-700 text-center">
                    Something went wrong. Please check your connection and try again.
                </p>
            )}
            <p className="text-xs text-[#8a7a62] text-center">One email at launch. No spam, ever.</p>
        </form>
    );
}
