import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";

export const runtime = "edge";

export const metadata = {
    title: "Stories & Blogs | One for All Foundation",
    description: "Stories from our elders and blogs from the One4All team.",
};

const FETCH_TIMEOUT = 8000; // 8 seconds timeout

const postsQuery = (type) => `*[
  _type == "${type}" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  "authorName": author->name,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt
}`;

async function fetchPosts(type) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    try {
        const posts = await client.fetch(
            postsQuery(type),
            {},
            { next: { revalidate: 30 }, signal: controller.signal }
        );
        return { posts: posts || [], error: false };
    } catch (error) {
        console.error(`Failed to fetch ${type} posts:`, error);
        return { posts: [], error: true };
    } finally {
        clearTimeout(timeout);
    }
}

function PostCard({ post, basePath }) {
    return (
        <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/${basePath}/${post.slug?.current}/`} className="block h-full">
                {post.mainImageUrl && (
                    <div className="relative aspect-[5/3] w-full overflow-hidden">
                        <Image
                            src={post.mainImageUrl}
                            alt={post.mainImageAlt || post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}
                <div className="p-6">
                    <div className="mb-4">
                        {post.authorName && (
                            <p className="text-sm font-medium text-slate-900">{post.authorName}</p>
                        )}
                        {post.publishedAt && (
                            <time className="text-xs text-slate-500" dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </time>
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{post.title}</h3>
                    {post.excerpt && (
                        <p className="text-slate-600 line-clamp-3 mb-4">{post.excerpt}</p>
                    )}
                    <div className="text-green-600 font-medium flex items-center">
                        Continue Reading
                        <svg className="w-4 h-4 ml-2 mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </Link>
        </article>
    );
}

function PostSection({ id, title, subtitle, result, basePath, emptyLabel }) {
    return (
        <section id={id} className="scroll-mt-32 mb-24 last:mb-0">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-3 font-serif tracking-tight">{title}</h2>
                <p className="text-lg text-slate-600">{subtitle}</p>
            </div>
            {result.posts.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {result.posts.map((post) => (
                        <PostCard key={post._id} post={post} basePath={basePath} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-slate-500">
                    {result.error
                        ? `We couldn't load ${emptyLabel} right now. Please check back soon.`
                        : `No ${emptyLabel} yet. Check back soon!`}
                </p>
            )}
        </section>
    );
}

export default async function StoriesAndBlogsPage() {
    const [stories, blogs] = await Promise.all([fetchPosts("story"), fetchPosts("blog")]);

    return (
        <main className="min-h-screen bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <h1 className="text-5xl font-bold text-slate-900 mb-4 font-serif tracking-tight">
                        Stories & Blogs
                    </h1>
                    <p className="text-lg text-slate-600">
                        Wisdom from our elders and perspectives from our team
                    </p>
                </div>

                <nav className="flex justify-center gap-4 mb-20">
                    <a href="#stories" className="px-6 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                        Stories
                    </a>
                    <a href="#blogs" className="px-6 py-2 rounded-full bg-white text-green-700 font-semibold border border-green-600 hover:bg-green-50 transition">
                        Blogs
                    </a>
                </nav>

                <PostSection
                    id="stories"
                    title="Stories & Narratives"
                    subtitle="Condensed wisdom and experiences shared by our community"
                    result={stories}
                    basePath="stories"
                    emptyLabel="stories"
                />
                <PostSection
                    id="blogs"
                    title="Blogs & Insights"
                    subtitle="Our perspectives on current trends and issues"
                    result={blogs}
                    basePath="blogs"
                    emptyLabel="blogs"
                />
            </div>
        </main>
    );
}
