import { Composer } from "Grammy";
import reel from "./inlines/reel.ts";
import post from "./inlines/post.ts";
import story from "./inlines/story.ts";

const insta = new Composer();

insta.use(reel);
insta.use(story);
insta.use(post);

export default insta;
