import { rocketAPI, RocketApiEndpoints } from "../client.ts";
type ReelContent = {
  video_url: string;
  preview_url: string;
  author: string;
  title?: string;
};

/**
 * Runs the request to RocketAPI instagram api hosted on RapidAPI and returns reel data: image preview url, author, video url
 * @param {string} url - reel url
 * @return {Promise<ReelContent | null>} ReelContent - Object with reel url, author and preview
 */
export async function getReelByUrl(url: string): Promise<ReelContent | null> {
  const matches = url.match(/\/reel\/([\S]+)\//);
  if (!matches) return null;
  const shortcode = matches[1];
  const data = await rocketAPI(RocketApiEndpoints.MEDIA_INFO_BY_SHORTCODE, {
    shortcode,
  });
  if (!data) return null;

  const statusCode = data?.response.status_code;
  if (statusCode === 200) {
    const reel = data.response.body.items[0];
    return {
      author: reel.user.username,
      preview_url: reel.image_versions2.candidates[0].url,
      video_url: reel.video_versions!.at(-1)!.url,
      title: reel.caption && reel.caption.text ? reel.caption.text : undefined,
    };
  } else {
    const error = JSON.parse(data.response.body);
    console.log(error)
    throw new Error(error.message, { cause: statusCode });
  }
}
