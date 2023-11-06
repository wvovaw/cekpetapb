/**
 * Paste a post content inline command
 */

import { Composer } from "Grammy";
import {
  type InlineQueryResultPhoto,
  type InlineQueryResultVideo,
} from "GrammyTypes";
import { getPostByUrl } from "../lib/api/services/getPostByUrl.ts";
import {
  errorInlineArticleBuilder,
  timeoutArticle,
} from "../lib/inline_templates/error_inline_article.ts";

const $ = new Composer();

$.inlineQuery(/https:\/\/(www\.)?instagram\.com\/p.*/, async (ctx) => {
  try {
    const post = await getPostByUrl(ctx.inlineQuery.query);

    if (!post) {
      await ctx.answerInlineQuery([timeoutArticle], {
        cache_time: 0,
      });
    } else {
      const result: (InlineQueryResultPhoto | InlineQueryResultVideo)[] = [];
      for (const item of post.items) {
        if (item.type === "image") {
          result.push({
            id: String(Date.now() + item.index),
            type: "photo",
            title: `Image ${item.index}`,
            description: `by ${post.author}`,
            thumbnail_url: item.preview_url,
            photo_width: item.width,
            photo_height: item.height,
            photo_url: item.url,
          });
        } else if (item.type === "video") {
          result.push({
            id: String(Date.now() + item.index),
            type: "video",
            mime_type: "video/mp4",
            title: `Video ${item.index}`,
            description: `Video by ${post.author}`,
            video_url: item.url,
            thumbnail_url: item.preview_url,
          });
        }
      }
      await ctx.answerInlineQuery(result, { cache_time: 600 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return ctx.answerInlineQuery(
        [
          errorInlineArticleBuilder(
            "Insta post request error",
            e.message,
            e.message
          ),
        ],
        {
          cache_time: 0,
        }
      );
    } else throw e;
  }
});

export default $;
