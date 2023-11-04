# Modular telegram bot

<div align="right">

### Powered by [GrammY](https://github.com/grammyjs/grammY)

</div>

## What can it do now

### Inline queries

All inline requests are made by mentioning the bot in chat via `@botname`.
Read more about [Telegram inline API](https://core.telegram.org/bots/inline)

This bot can embed media content from instagram. Here is how you do it:

- Provide a instagram reel url -> select the result -> get it embeded in current chat
- Provide a instagram post url -> select one of the post's media -> get it embeded in current chat
- Provide a instagram story url -> select the result -> get it embeded in current chat

## Development

Install [Deno](https://docs.deno.com/runtime/manual/getting_started/installation).

1. Copy `.env.example` to to `.env` and fill as required.

2. Run dev

```sh
deno task dev
```

## Hosting

<div align="right">

### Powered by [Deno.com](https://deno.com)

</div>

1. Create new project on deno.com.
2. Select automatic deployment with `master` branch
3. Select `/src/app.ts` as entry
