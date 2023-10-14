import { get } from "../client.ts";
import { InstaReel } from "../types.ts";

export default async function getPostByUrl(
  url: string
): Promise<InstaReel.ResponseData> {
  const request_url =
    "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_id?" +
    new URLSearchParams({
      shortcode: url.substring(31, 42),
      response_type: "reels",
    }).toString();

  const post: InstaReel.ResponseData = await get(request_url);
  return post;
}
