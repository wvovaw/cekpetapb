import { rocketAPI, RocketApiEndpoints } from "../client.ts";

type Media = {
  type: "video" | "image";
  url: string;
  preview_url: string;
  width: number;
  height: number;
  index: number;
};
type PostContent = {
  items: Media[];
  author: string;
};

/**
 * Runs the request to instagram-bulk-profile-scrapper API hosted on RapidAPI and returns all media from post carousel
 * @param {string} url - post url
 * @return {Promise<PostContent | null>} PostContent - Object with post media items array and author
 */
export async function getPostByUrl(url: string): Promise<PostContent | null> {
  const matches = url.match(/\/p\/([\S]+)\//);
  if (!matches) return null;
  const shortcode = matches[1];
  const data = await rocketAPI(RocketApiEndpoints.MEDIA_INFO_BY_SHORTCODE, {
    shortcode,
  });
  if (!data) return null;

  const statusCode = data?.response.status_code;

  if (statusCode === 200) {
    const post = data.response.body.items[0];
    const author = post.user.username;
    if (post.carousel_media && post.carousel_media.length > 0) {
      return {
        author,
        items: post.carousel_media.map((item, ix) => {
          const preview = item.image_versions2.candidates.at(-1)!;
          const data = {
            index: ix + 1,
            preview_url: preview.url,
          } as Media;

          if (item.video_versions) {
            const video = item.video_versions.at(0)!;
            data.type = "video";
            data.url = video.url;
            data.width = video.width;
            data.height = video.height;
          } else {
            const image = item.image_versions2.candidates.at(0)!;
            data.type = "image";
            data.url = image.url;
            data.width = image.width;
            data.height = image.height;
          }

          return data;
        }),
      };
    } else {
      const image = post.image_versions2.candidates.at(0)!;
      const preview = post.image_versions2.candidates.at(-1)!;
      return {
        author,
        items: [
          {
            type: "image",
            index: 1,
            url: image.url,
            preview_url: preview.url,
            width: image.width,
            height: image.height,
          },
        ],
      };
    }
  } else {
    const error = JSON.parse(data.response.body);
    console.log(error);
    throw new Error(error.message, { cause: statusCode });
  }
}
