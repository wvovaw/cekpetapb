import { get } from "../client.ts";
import { InstaPost } from "../types.ts";

export default async function getPostByUrl(
  url: string
): Promise<InstaPost.ResponseData> {
  const request_url =
    "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_id?" +
    new URLSearchParams({
      shortcode: url.substring(28, 39),
      response_type: "feeds",
    }).toString();

  const res: InstaPost.ResponseData = await get(request_url);
  return res;
}
