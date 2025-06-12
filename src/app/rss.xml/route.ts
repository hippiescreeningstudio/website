import { getAllPosts } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get all posts for RSS feed
        const allPosts = getAllPosts();

        // Site metadata
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hss-munich.com';
        const siteTitle = 'Hippie Screening Studio';
        const siteDescription = 'Sinophone & Asian film screenings in Munich since 2022';

        // Get the most recent post date for channel pubDate
        const mostRecentPostDate = allPosts.length > 0
            ? (() => {
                const date = new Date(allPosts[0].date);
                return isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString();
            })()
            : new Date().toUTCString();

        // Generate RSS XML
        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <description>${siteDescription}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${mostRecentPostDate}</pubDate>
    <ttl>60</ttl>
    ${allPosts.map(post => {
            const postUrl = post.language === 'zh'
                ? `${siteUrl}/zh/posts/${post.slug}`
                : `${siteUrl}/posts/${post.slug}`;

            // Handle invalid dates
            const parseDate = (dateString: string) => {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) {
                    // If the date string ends with just "T", append time
                    if (dateString.endsWith('T')) {
                        return new Date(dateString + '00:00:00.000Z');
                    }
                    // Fallback to current date if still invalid
                    return new Date();
                }
                return date;
            };

            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${parseDate(post.date).toUTCString()}</pubDate>
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