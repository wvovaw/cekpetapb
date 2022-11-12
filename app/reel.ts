export async function getReelFileUrl(
  url: string
): Promise<Record<string, string | boolean>> {
  const request_url =
    "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_id?" +
    new URLSearchParams({
      shortcode: url.substring(31, 42),
      response_type: "reels",
    }).toString();

  const keys = [
    Deno.env.get("RAPID_KEY1"),
    Deno.env.get("RAPID_KEY2"),
    Deno.env.get("RAPID_KEY3"),
  ];
  const abc = new AbortController();
  const timeout = setTimeout(() => abc.abort(), 9000);
  try {
    const res = await fetch(request_url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": keys[Math.floor(Math.random() * 2)],
        "X-RapidAPI-Host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
      },
      signal: abc.signal,
    });
    const body = await res.json();

    return {
      video_url: body[0].items[0].video_versions[0].url,
      preview_url: body[0].items[0].image_versions2.candidates[2].url,
      author: body[0].items[0].user.username,
    };
  } catch (e) {
    console.log(e);
    return { timeout: true };
  }
}
