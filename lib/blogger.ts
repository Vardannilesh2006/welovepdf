import { blogArticles } from "../app/data/blog-posts";

export interface UnifiedArticle {
  slug: string;
  title: string;
  desc: string;
  content: string;
  date: string;
  tag: string;
  thumbnail?: string;
  source: "blogger" | "local";
  externalUrl?: string;
}

export async function fetchBloggerPosts(): Promise<UnifiedArticle[]> {
  const bloggerUrl =
    process.env.BLOGGER_BLOG_URL ||
    process.env.NEXT_PUBLIC_BLOGGER_URL ||
    "https://sarkaripixels.blogspot.com";

  const cleanUrl = bloggerUrl.replace(/\/+$/, "");
  const feedUrl = `${cleanUrl}/feeds/posts/default?alt=json&max-results=50`;

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 300 }, // 5 minutes cache
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.warn(`[Blogger API] Failed to fetch feed (${res.status}): ${feedUrl}`);
      return [];
    }

    const data = await res.json();
    const entries = data.feed?.entry || [];

    return entries.map((entry: any) => {
      const title = entry.title?.$t || "Untitled Guide";
      const rawContent = entry.content?.$t || entry.summary?.$t || "";

      // Extract alternate link (original post URL)
      const altLink =
        entry.link?.find((l: any) => l.rel === "alternate")?.href || "";

      // Extract slug from post URL (e.g. https://domain.blogspot.com/2026/09/slug-here.html)
      let slug = "";
      if (altLink) {
        const parts = altLink.split("/");
        const lastPart = parts[parts.length - 1] || "";
        slug = lastPart.replace(/\.html$/, "");
      }
      if (!slug) {
        slug = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 60);
      }

      // Extract plain text snippet
      const strippedDesc = rawContent
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 180) + "...";

      // Extract thumbnail
      let thumbnail = entry.media$thumbnail?.url || "";
      if (thumbnail) {
        // Upgrade Blogger thumbnail size to full quality s1600
        thumbnail = thumbnail.replace(/\/s\d+(-c)?\//, "/s1600/");
      } else {
        const imgMatch = rawContent.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && imgMatch[1]) {
          thumbnail = imgMatch[1];
        }
      }

      const tag = entry.category?.[0]?.term || "Guides";

      const published = entry.published?.$t || "";
      const dateFormatted = published
        ? new Date(published).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Recent";

      return {
        slug,
        title,
        desc: strippedDesc,
        content: rawContent,
        date: dateFormatted,
        tag,
        thumbnail: thumbnail || undefined,
        source: "blogger" as const,
        externalUrl: altLink,
      };
    });
  } catch (error) {
    console.error("[Blogger API Error]", error);
    return [];
  }
}

export async function getCombinedArticles(): Promise<UnifiedArticle[]> {
  const bloggerArticles = await fetchBloggerPosts();

  const localArticles: UnifiedArticle[] = Object.entries(blogArticles).map(
    ([slug, art]) => ({
      slug,
      title: art.title,
      desc: art.desc,
      content: art.content,
      date: art.date,
      tag: art.tag,
      source: "local" as const,
    })
  );

  const slugMap = new Map<string, UnifiedArticle>();

  // Add local first
  for (const art of localArticles) {
    slugMap.set(art.slug, art);
  }

  // Overwrite/add blogger
  for (const art of bloggerArticles) {
    slugMap.set(art.slug, art);
  }

  const all = Array.from(slugMap.values());

  return all.sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });
}

export async function getArticleBySlug(slug: string): Promise<UnifiedArticle | null> {
  const all = await getCombinedArticles();
  return all.find((a) => a.slug === slug) || null;
}
