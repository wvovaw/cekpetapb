import { Composer, InlineKeyboard } from "Grammy";
import start from "./commands/start.ts"
import help from "./inlines/help.ts";

const base = new Composer();

base.use(help);
base.use(start);

export default base;
