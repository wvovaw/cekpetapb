/**
 * Download Insta Reel inline command
 */

import { Composer } from "Grammy";
import { getReelContent } from "../lib/getReelContent.ts";

const $ = new Composer();

$.inlineQuery(/https:\/\/www\.instagram\.com\/reel.*/, async (ctx) => {
  try {
    const reel = await getReelContent(ctx.inlineQuery.query);

    if (!reel) {
      await ctx.answerInlineQuery([], {
        cache_time: 0,
      });
    } else {
      await ctx.answerInlineQuery(
        [
          {
            type: "video",
            mime_type: "video/mp4",
            id: String(Date.now()),
            title: `Reel by ${reel.author}`,
            description: `${reel.author}`,
            video_url: reel.video_url,
            thumbnail_url: reel.preview_url,
          },
        ],
        { cache_time: 3600 * 24 * 30 }
      );
    }
  } catch (e) {
    throw e;
  }
});

export default $;
