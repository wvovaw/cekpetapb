import getReelByUrl from "./api/services/getReelByUrl.ts";

type ReelContent = {
  video_url: string;
  preview_url: string;
  author: string;
};

/**
 * Runs the request to instagram-bulk-profile-scrapper API hosted on RapidAPI and returns video url, preview and author
 * @param {string} url - reel url
 * @return {Promise<ReelContent | null>} ReelContent - Object with reel url, author and preview
 */
export async function getReelContent(url: string): Promise<ReelContent | null> {
  try {
    const res = await getReelByUrl(url);
    return {
      video_url: res.items[0].video_versions[0].url,
      preview_url: res.items[0].image_versions2.candidates[2].url,
      author: res.items[0].user.username,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}
