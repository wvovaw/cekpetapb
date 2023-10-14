import env from "$env";

type ReelData = {
  video_url: string;
  preview_url: string;
  author: string;
};

/**
 * Runs the request to instagram-bulk-profile-scrapper API hosted on RapidAPI and returns video url, preview and author
 * @param {string} url - reel url
 * @return {Promise<ReelData | null>} ReelData - Object with reel url, author and preview
 */
export async function getReelFileUrl(url: string): Promise<ReelData | null> {
  const request_url =
    "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/media_by_id?" +
    new URLSearchParams({
      shortcode: url.substring(31, 42),
      response_type: "reels",
    }).toString();

  const keys: string[] = [
    env.RAPID_KEY1,
    env.RAPID_KEY2,
    env.RAPID_KEY3,
  ];
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 9900);
  try {
    const res = await fetch(request_url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": keys[Math.floor(Math.random() * 2)],
        "X-RapidAPI-Host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
      },
      signal: abortController.signal,
    });
    const body = await res.json();

    return {
      video_url: body[0].items[0].video_versions[0].url,
      preview_url: body[0].items[0].image_versions2.candidates[2].url,
      author: body[0].items[0].user.username,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}
