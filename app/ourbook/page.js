import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import LaunchSignup from "@/components/book/LaunchSignup";

export const metadata = {
    title: "The Lives We Live by Cyrus Andaz | One for All Foundation",
    description:
        "The Lives We Live: Four People, Two Years, and Everything I Never Thought to Ask. True stories from four elders, retold by Cyrus Andaz. Proceeds go to the Alzheimer's Fund. Join the launch list.",
};

const people = [
    { who: "A former nanny & art teacher", note: "who spent a lifetime raising other people's children and teaching them to see." },
    { who: "My father", note: "whose story I thought I knew, until I finally asked." },
    { who: "A chemistry professor", note: "who chose to stay anonymous, and let the stories speak for him." },
    { who: "A Vermont skiing legend & architect", note: "who carved trails and buildings into the mountains he loved." },
];

const Leaf = () => (
    <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
        <span className="h-px w-16 bg-[#5c2d12]/40" />
        <svg width="18" height="12" viewBox="0 0 18 12" fill="#5c2d12">
            <path d="M9 12C9 6 5 1 0 0c1 5 4 10 9 12zM9 12c0-6 4-11 9-12-1 5-4 10-9 12z" />
        </svg>
        <span className="h-px w-16 bg-[#5c2d12]/40" />
    </div>
);

function Section({ eyebrow, title, children }) {
    return (
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-[#4f7a35] mb-3">{eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#5c2d12]">{title}</h2>
            <Leaf />
            <div className="text-lg leading-relaxed text-[#4a3b2e] space-y-5">{children}</div>
        </section>
    );
}

export default function OurBook() {
    return (
        <div className="bg-[#efe7d3] font-serif">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#e9e0c8] via-[#ddd3b4] to-[#b9c08f]">
                <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center order-1 md:order-none">
                        <Image
                            src="/book/cover.jpg"
                            alt="Cover of The Lives We Live by Cyrus Andaz: a tree with a caterpillar climbing the trunk and a chrysalis hanging from a branch"
                            width={900}
                            height={1350}
                            priority
                            className="w-64 sm:w-72 md:w-80 h-auto rounded-sm shadow-[0_25px_50px_-12px_rgba(60,35,15,0.55)] rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[#4f7a35] mb-4">
                            A One4All book · Coming soon
                        </p>
                        <h1 className="text-5xl md:text-6xl text-[#5c2d12] leading-tight mb-4">The Lives We Live</h1>
                        <p className="text-xl md:text-2xl italic text-[#6b4a2f] mb-6">
                            Four People, Two Years, and Everything I Never Thought to Ask
                        </p>
                        <p className="text-lg text-[#5c4a3a] mb-8">by Cyrus Andaz</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                            <a
                                href="#signup"
                                className="inline-block rounded-lg bg-[#5c2d12] hover:bg-[#46220d] text-[#f4ecd8] font-semibold px-8 py-3 text-lg transition shadow-md font-sans"
                            >
                                Join the launch list
                            </a>
                            <a
                                href="#about"
                                className="inline-block rounded-lg border border-[#5c2d12] text-[#5c2d12] hover:bg-[#5c2d12]/10 font-semibold px-8 py-3 text-lg transition font-sans"
                            >
                                About the book
                            </a>
                        </div>
                        <p className="mt-6 text-sm text-[#5c4a3a] font-sans">
                            All proceeds go to the Alzheimer&apos;s Fund.
                        </p>
                    </div>
                </div>
            </section>

            {/* What the book is */}
            <div id="about" className="scroll-mt-28">
                <Section eyebrow="The book" title="What it is">
                    <p>
                        <span className="italic">The Lives We Live</span> is built from two years of conversations with
                        four people who had lived long, full lives and had stories nobody had thought to ask for.
                        I sat down with each of them, listened, and retold what they shared as narrative, from my side of
                        the table.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 pt-4 text-left">
                        {people.map((p) => (
                            <div key={p.who} className="bg-[#f7f1e1] border border-[#d9cba8] rounded-lg p-5">
                                <p className="font-semibold text-[#5c2d12]">{p.who}</p>
                                <p className="text-base text-[#5c4a3a]">{p.note}</p>
                            </div>
                        ))}
                    </div>
                </Section>
            </div>

            {/* Why I wrote it */}
            <div className="bg-[#e4dbc3]">
                <Section eyebrow="Why I wrote it" title="The questions I never thought to ask">
                    <p>
                        Through One4All, I spent a lot of time with elders, and I kept noticing the same thing: their
                        stories were right there, and almost nobody was asking for them.
                    </p>
                    <p>
                        So I started asking. What began as a few interviews turned into two years of conversations that
                        changed how I see my family, my community, and getting older. This book is my attempt to hold on
                        to those stories, and to nudge readers to go ask their own.
                    </p>
                    <p className="italic text-[#6b4a2f]">— Cyrus Andaz</p>
                </Section>
            </div>

            {/* Who it supports */}
            <Section eyebrow="Who it supports" title="Every copy gives back">
                <p>
                    <span className="font-semibold text-[#5c2d12]">All proceeds go to the Alzheimer&apos;s Fund</span>,
                    supporting people living with Alzheimer&apos;s and the families who care for them. Memory is what this
                    book is about, so it felt right for it to help protect it.
                </p>
                <p>
                    It&apos;s written for anyone with a grandparent, parent, or neighbor whose story they haven&apos;t
                    heard yet, and for the elders whose lives deserve to be remembered.
                </p>
            </Section>

            {/* How to get it */}
            <div className="bg-[#e4dbc3]">
                <Section eyebrow="How to get it" title="Launching soon">
                    <p>
                        The book isn&apos;t out yet. Join the launch list below and you&apos;ll be the first to know when
                        it&apos;s available, with details on where to buy a copy.
                    </p>
                    <a
                        href="https://www.instagram.com/onefourall2024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#4f7a35] hover:text-[#3b5c27] font-semibold font-sans"
                    >
                        <FaInstagram className="text-xl" /> Follow @onefourall2024 for updates
                    </a>
                </Section>
            </div>

            {/* Email signup */}
            <section id="signup" className="scroll-mt-28 px-6 py-20 bg-gradient-to-b from-[#efe7d3] to-[#cdd3a6]">
                <div className="max-w-xl mx-auto bg-[#f7f1e1] border border-[#d9cba8] rounded-2xl shadow-xl p-8 md:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl text-[#5c2d12] mb-3">Be the first to read it</h2>
                        <p className="text-[#5c4a3a]">
                            Get an email the day <span className="italic">The Lives We Live</span> launches.
                        </p>
                    </div>
                    <div className="font-sans">
                        <LaunchSignup />
                    </div>
                </div>
            </section>
        </div>
    );
}
