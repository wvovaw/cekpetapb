/**
 * Show help inline command
 */

import { Composer, InlineKeyboard } from "Grammy";

const $ = new Composer();

$.inlineQuery(
  /help/,
  async (ctx) =>
    await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "help",
          title: "Reels in telegram",
          description: "Send reels right in telegram",
          input_message_content: {
            message_text:
              "<b>Hi 👋</b> I'm Cekpetapb!.\nYou can use me to embed insta reels right in telegram chats. Paste a reel url in the inline mentioning me, wait untill it resolved (around 10s, try again if it fail), tap a corresponding inline button, that\'s it !\nFormat: <b>@wvovaw_bot 'reel_url'</b>",
            parse_mode: "HTML",
          },
          reply_markup: new InlineKeyboard().url(
            "Source code 🔗",
            "https://github.com/wvovaw/cekpetapb"
          ),
        },
      ],
      { cache_time: 3600 }
    )
);

// Return empty result list for other queries.
$.on("inline_query", (ctx) => ctx.answerInlineQuery([]));

export default $;