/**
 * Download Insta Reel inline command
 */

import { Composer } from "Grammy";
import { getReelByUrl } from "../lib/api/services/getReelByUrl.ts";
import {
  errorInlineArticleBuilder,
  timeoutArticle,
} from "../lib/inline_templates/error_inline_article.ts";

const $ = new Composer();

$.inlineQuery(/https:\/\/(www\.)?instagram\.com\/reel.*/, async (ctx) => {
  try {
    const reel = await getReelByUrl(ctx.inlineQuery.query);

    if (!reel) {
      await ctx.answerInlineQuery([timeoutArticle], {
        cache_time: 0,
      });
    } else {
      await ctx.answerInlineQuery(
        [
          {
            type: "video",
            mime_type: "video/mp4",
            id: String(Date.now()),
            title: `${reel.title ?? "untitled"}`,
            description: `${reel.author}`,
            video_url: reel.video_url,
            thumbnail_url: reel.preview_url,
          },
        ],
        { cache_time: 600 }
      );
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return ctx.answerInlineQuery(
        [errorInlineArticleBuilder("Insta reel request error", e.message, e.message)],
        {
          cache_time: 0,
        }
      );
    } else throw e;
  }
});

export default $;
