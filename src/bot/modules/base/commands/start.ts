/**
 * Greeting command for newcomers
 */

import env from "$env";

import { Composer } from "Grammy";

const $ = new Composer();

$.command("start", (ctx) =>
  ctx.reply(
    `Hi. I embed insta media right in telegram chats. 
Mention me in any chat using \`@${env.BOT_USERNAME}\` and learn more.
    `,
  ));

export default $;
