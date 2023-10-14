import { Composer } from "Grammy";
import reel from "./inlines/reel.ts";
import post from "./inlines/post.ts";

const insta = new Composer();

insta.use(reel);
insta.use(post);

export default insta;
