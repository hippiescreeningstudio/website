import { getAllPosts } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get all posts for RSS feed
        const allPosts = getAllPosts();

        // Site metadata
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
        const siteTitle = 'Hippie Screening Studio';
        const siteDescription = 'Bringing you Asian arthouse films in Munich';

        // Get the most recent post date for channel pubDate
        const mostRecentPostDate = allPosts.length > 0
            ? new Date(allPosts[0].date).toUTCString()
            : new Date().toUTCString();

        // Generate RSS XML
        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <description>${siteDescription}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${mostRecentPostDate}</pubDate>
    <ttl>60</ttl>
    ${allPosts.map(post => {
            const postUrl = post.language === 'zh'
                ? `${siteUrl}/zh/posts/${post.slug}`
                : `${siteUrl}/posts/${post.slug}`;

            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.author ? `<author>${post.author.name}</author>` : ''}
      <category>${post.language === 'zh' ? 'Chinese' : 'English'}</category>
    </item>`;
        }).join('')}
  </channel>
</rss>`;

        return new NextResponse(rssXml, {
            headers: {
                'Content-Type': 'application/rss+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        return new NextResponse('Error generating RSS feed', { status: 500 });
    }
} 