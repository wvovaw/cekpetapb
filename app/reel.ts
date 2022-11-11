import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

export async function getReelFileUrl(
  url: string
): Promise<Record<string, string>> {
  const request_url =
    "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_id?" +
    new URLSearchParams({
      shortcode: url.substring(31, 42),
      response_type: "reels",
    }).toString();

  const res = await fetch(request_url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": config().RAPID_KEY,
      "X-RapidAPI-Host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
    },
  });
  const body = await res.json();

  return {
    video_url: body[0].items[0].video_versions[0].url,
    preview_url: body[0].items[0].image_versions2.candidates[2].url,
    author: body[0].items[0].user.username,
  };
}
