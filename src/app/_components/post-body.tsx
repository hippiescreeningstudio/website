import markdownStyles from "./markdown-styles.module.css";
import { YouTubeProcessor } from "./youtube";

type Props = {
  content: string;
  enableYouTube?: boolean;
};

export function PostBody({ content, enableYouTube = true }: Props) {
  const body = (
    <div
      className={markdownStyles["markdown"]}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  return (
    <div className="max-w-2xl mx-auto">
      {enableYouTube ? (
        <YouTubeProcessor>{body}</YouTubeProcessor>
      ) : (
        body
      )}
    </div>
  );
}
