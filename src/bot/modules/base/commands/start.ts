/**
 * Greeting command for newcomers
 */

import { Composer } from "Grammy";

const $ = new Composer();

$.command("start", (ctx) =>
  ctx.reply(
    `Hi. I embed insta media right in telegram chats. 
Mention me in any chat using \`@wvovaw_bot\` and learn more.
    `
  )
);

export default $;
