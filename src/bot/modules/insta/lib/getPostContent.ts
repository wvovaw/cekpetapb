import getPostByUrl from "./api/services/getPostByUrl.ts";

type Media = {
  type: "video" | "image";
  url: string;
  preview_url: string;
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
export async function getPostContent(url: string): Promise<PostContent | null> {
  try {
    const post = await getPostByUrl(url);

    if (!post) return null;

    const content = post.items.at(0)!;
    if (content.carousel_media.length > 1)
      return {
        author: content.user.username,
        items: content.carousel_media.map((item, ix) => {
          const data = {
            index: ix + 1,
            preview_url: item.image_versions2.candidates.at(0)!.url,
          } as Media;

          if (item.video_versions) {
            data.type = "video";
            data.url = item.video_versions.candidates.at(-1)!.url;
          } else {
            data.type = "image";
            data.url = item.image_versions2.candidates.at(-1)!.url;
          }

          return data;
        }),
      };
    else
      return {
        author: content.user.username,
        items: [
          {
            index: 1,
            url: content.image_versions2.candidates.at(-1)!.url,
            preview_url: content.image_versions2.candidates.at(0)!.url,
            type: "image",
          },
        ],
      };
  } catch (e) {
    console.log(e);
    return null;
  }
}
