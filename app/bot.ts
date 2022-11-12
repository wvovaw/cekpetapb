import { getReelFileUrl } from "./reel.ts";
import {
  Bot,
  GrammyError,
  HttpError,
  InlineKeyboard,
} from "https://deno.land/x/grammy@v1.12.0/mod.ts";

export const bot = new Bot(Deno.env.get("TELEGRAM_API_KEY") as string);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.command("start", (ctx) =>
  ctx.reply("Heeello everyone! This is... running on empty... The ASSISTANT!")
);

bot.inlineQuery(/https:\/\/www\.instagram\.com\/reel.*/, async (ctx) => {
  try {
    const { video_url, preview_url, author, timeout } = await getReelFileUrl(
      ctx.inlineQuery.query as string
    );

    if (timeout) {
      await ctx.answerInlineQuery(
        [
          {
            type: "article",
            id: "timeout",
            title: "Timeout",
            description:
              "Please retry again. Previous request has reached a timeout.",
            input_message_content: {
              message_text:
                "<b>Heeello everyone 👋</b> This is... running on empty... The ASSISTANT!.\nSend a reel url, wait untill it will be resolved (around 10s) and it will be sent in the channel!\nFormat: <b>@wvovaw_bot 'reel_url'</b>",
              parse_mode: "HTML",
            },
            reply_markup: new InlineKeyboard().url(
              "My page 🔗",
              "https://wvovaw.github.io/"
            ),
          },
        ],
        { cache_time: 0 }
      );
    } else {
      console.log("User input: ", ctx.inlineQuery.query);
      console.log("Result URL: ", video_url);
      await ctx.answerInlineQuery(
        [
          {
            type: "video",
            mime_type: "video/mp4",
            id: String(Date.now()),
            title: author as string,
            description: `${author}\'s reel`,
            video_url: video_url as string,
            thumb_url: preview_url as string,
          },
        ],
        { cache_time: 3600 * 24 * 30 }
      );
    }
  } catch (error) {
    throw new Error(error);
  }
});

bot.on(
  "inline_query",
  async (ctx) =>
    await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "info",
          title: "Reels in telegram",
          description: "Send reels right in telegram",
          input_message_content: {
            message_text:
              "<b>Heeello everyone 👋</b> This is... running on empty... The ASSISTANT!.\nSend a reel url, wait untill it will be resolved (around 10s) and it will be sent in the channel!\nFormat: <b>@wvovaw_bot 'reel_url'</b>",
            parse_mode: "HTML",
          },
          reply_markup: new InlineKeyboard().url(
            "My page 🔗",
            "https://wvovaw.github.io/"
          ),
        },
      ],
      { cache_time: 3600 }
    )
);
