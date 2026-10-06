import { redirect } from "next/navigation";

// Blogs now live on the combined Stories & Blogs page.
// Individual posts are still served from /blogs/[slug].
export default function BlogsIndex() {
    redirect("/stories#blogs");
}
