import { getReelFileUrl } from "./app/reel.ts";
import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.12.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

function run() {
  const bot = new Bot(config().TELEGRAM_API_KEY);
  bot.command("start", (ctx) =>
    ctx.reply("Heeello everyone! This is... running on empty... The ASSISTANT!")
  );

  bot.inlineQuery(/https:\/\/www\.instagram\.com\/reel.*/, async (ctx) => {
    try {
      const { video_url, preview_url, author } = await getReelFileUrl(
        ctx.inlineQuery.query as string
      );
      console.log("User input: ", ctx.inlineQuery.query);
      console.log("Result URL: ", video_url);
      console.log("Result preview: ", preview_url);
      console.log("Result author: ", author);

      await ctx.answerInlineQuery(
        [
          {
            type: "video",
            mime_type: "video/mp4",
            id: String(Date.now()),
            title: author,
            description: `${author}\'s reel`,
            video_url,
            thumb_url: preview_url,
          },
        ],
        { cache_time: 60 }
      );
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

  bot.start();
}

run();
