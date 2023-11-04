/**
 * Show help inline command
 */

import { Composer, InlineKeyboard } from "Grammy";
import env from "$env";

const $ = new Composer();

$.inlineQuery(
  /help/,
  async (ctx) =>
    await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "help",
          title: "Instagram media in telegram",
          description: "Send posts media, reels and story right in chat",
          input_message_content: {
            message_text: `<b>Hi 👋 I'm ${env.BOT_NAME}!</b> \nYou can use me to embed insta media content (reels, stories, post media) right in telegram chats. Paste a url in the inline mentioning me, wait untill it resolved (around 5s, try again if it fail), tap a corresponding inline result, that's it !\nFormat: <b>@${env.BOT_USERNAME} 'url'</b>`,
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
