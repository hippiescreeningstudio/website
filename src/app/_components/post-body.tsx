import markdownStyles from "./markdown-styles.module.css";
import { YouTubeEmbed } from "./youtube";

type Props = {
  content: string;
};

// Posts mark trailers with <div class="youtube-embed" data-video-id="..." data-title="..."></div>
const EMBED_PATTERN = /<div[^>]*class="youtube-embed"[^>]*><\/div>/g;

function getAttribute(tag: string, name: string) {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
}

export function PostBody({ content }: Props) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  const markdown = (html: string) => (
    <div
      key={parts.length}
      className={markdownStyles["markdown"]}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );

  for (const match of content.matchAll(EMBED_PATTERN)) {
    const start = match.index ?? 0;
    const videoId = getAttribute(match[0], "data-video-id");

    if (start > cursor) {
      parts.push(markdown(content.slice(cursor, start)));
    }
    if (videoId) {
      parts.push(
        <YouTubeEmbed
          key={parts.length}
          videoId={videoId}
          title={getAttribute(match[0], "data-title")}
        />
      );
    }
    cursor = start + match[0].length;
  }

  if (cursor < content.length) {
    parts.push(markdown(content.slice(cursor)));
  }

  return <div className="max-w-2xl mx-auto">{parts}</div>;
}
