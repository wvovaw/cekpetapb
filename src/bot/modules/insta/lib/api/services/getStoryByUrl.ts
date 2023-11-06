import { rocketAPI, RocketApiEndpoints } from "../client.ts";

type Media = {
  type: "video" | "image";
  url: string;
  preview_url: string;
  width: number;
  height: number;
  index: number;
};
type StoryContent = {
  item: Media;
  author: string;
};

/**
 * Runs the request to instagram-bulk-profile-scrapper API hosted on RapidAPI and returns all media from post carousel
 * @param {string} url - post url
 * @return {Promise<StoryContent | null>} PostContent - Object with post media items array and author
 */
export async function getStoryByUrl(url: string): Promise<StoryContent | null> {
  const matches = url.match(/(\/(\d+)\?)/);
  if (!matches) return null;
  const shortId = matches[2];
  const data = await rocketAPI(RocketApiEndpoints.MEDIA_INFO_BY_ID, {
    id: shortId,
  });

  if (!data) return null;

  const statusCode = data?.response.status_code;

  if (statusCode === 200) {
    const story = data.response.body.items[0];
    const author = story.user.username;
    const preview = story.image_versions2.candidates.at(0)!;
    const media = {
      index: 0,
      preview_url: preview.url,
    } as Media;
    if (story.video_versions) {
      const video = story.video_versions.at(0)!;
      media.type = "video";
      media.url = video.url;
      media.width = video.width;
      media.height = video.height;
    } else {
      const image = story.image_versions2.candidates.at(0)!;
      media.type = "image";
      media.url = image.url;
      media.width = image.width;
      media.height = image.height;
    }
    return {
      author,
      item: media,
    };
  } else {
    const error = JSON.parse(data.response.body);
    console.log(error);
    throw new Error(error.message, { cause: statusCode });
  }
}
