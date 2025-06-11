import markdownStyles from "./markdown-styles.module.css";
import { YouTubeProcessor } from "./youtube-processor";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <YouTubeProcessor>
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </YouTubeProcessor>
    </div>
  );
}
