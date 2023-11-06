/**
 * Download Insta Story inline command
 */

import { Composer } from "Grammy";
import {
  type InlineQueryResultPhoto,
  type InlineQueryResultVideo,
} from "GrammyTypes";
import { getStoryByUrl } from "../lib/api/services/getStoryByUrl.ts";
import {
  errorInlineArticleBuilder,
  timeoutArticle,
} from "../lib/inline_templates/error_inline_article.ts";

const $ = new Composer();

$.inlineQuery(/https:\/\/(www\.)?instagram\.com\/stories.*/, async (ctx) => {
  try {
    const story = await getStoryByUrl(ctx.inlineQuery.query);

    if (!story) {
      await ctx.answerInlineQuery([timeoutArticle], {
        cache_time: 0,
      });
    } else {
      const result: (InlineQueryResultPhoto | InlineQueryResultVideo)[] = [];
      const item = story.item;
      if (item.type === "image") {
        result.push({
          id: String(Date.now() + item.index),
          type: "photo",
          title: `${story.author}'s story image`,
          description: `by ${story.author}`,
          thumbnail_url: item.preview_url,
          photo_width: item.width,
          photo_height: item.height,
          photo_url: item.url,
        });
      } else {
        result.push({
          id: String(Date.now() + item.index),
          type: "video",
          mime_type: "video/mp4",
          title: `${story.author}'s story video`,
          description: `by ${story.author}`,
          video_url: item.url,
          thumbnail_url: item.preview_url,
        });
      }
      await ctx.answerInlineQuery(result, { cache_time: 600 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return ctx.answerInlineQuery(
        [
          errorInlineArticleBuilder(
            "Insta story request error",
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
