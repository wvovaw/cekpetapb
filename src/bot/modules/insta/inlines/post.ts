/**
 * Paste a post content inline command
 */

import { Composer } from "Grammy";
import { type InlineQueryResult } from "https://deno.land/x/grammy_types@v3.3.0/inline.ts";
import { getPostContent } from "../lib/getPostContent.ts";

const $ = new Composer();

$.inlineQuery(/https:\/\/www\.instagram\.com\/p.*/, async (ctx) => {
  try {
    const post = await getPostContent(ctx.inlineQuery.query);

    if (!post) {
      await ctx.answerInlineQuery([], {
        cache_time: 0,
      });
    } else {
      const result: InlineQueryResult[] = [];
      for (const item of post.items) {
        if (item.type === "image")
          result.push({
            id: String(Date.now() + item.index),
            type: "photo",
            title: `Image ${item.index}`,
            description: `Image by ${post.author}`,
            thumbnail_url: item.preview_url,
            photo_width: 600,
            photo_height: 600,
            photo_url: item.url,
          });
        else if (item.type === "video")
          result.push({
            id: String(Date.now() + item.index),
            type: "video",
            mime_type: "video/mp4",
            title: `Video (${item.index})`,
            description: `Video by ${post.author}`,
            video_url: item.url,
            thumbnail_url: item.preview_url,
          });
      }

      await ctx.answerInlineQuery(result, { cache_time: 3600 * 24 * 30 });
    }
  } catch (e) {
    throw e;
  }
});

export default $;
