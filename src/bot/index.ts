import { Bot, GrammyError, HttpError } from "Grammy";
import env from "$env";
import base from "$modules/base";
import insta from "$modules/insta";

console.log(env);
const bot = new Bot(env.TELEGRAM_API_KEY);
bot.use(insta);
bot.use(base);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("GrammyError: Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("HttpError: Could not contact Telegram:", e.message);
  } else {
    console.error("Unknown error:", e);
  }
});

Deno.addSignalListener("SIGINT", () => bot.stop());
Deno.addSignalListener("SIGTERM", () => bot.stop());

export default bot;
