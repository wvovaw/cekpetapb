import env from "$env";
import { RocketApiResponse } from "./types/index.ts";
import { MediaInfo } from "./types/MediaInfo.ts";

/**
 * RocketAPI 
 *  https://rapidapi.com/rocketapi/api/rocketapi-for-instagram
 */

/**
 * RocketAPI endpoints
 */
export enum RocketApiEndpoints {
  MEDIA_INFO_BY_SHORTCODE = "/media/get_info_by_shortcode",
}
/**
 * Request data generic type that depends on which RocketAPI endpoint is selected
 */
type RocketApiPayloadData<E extends RocketApiEndpoints> = {
  [RocketApiEndpoints.MEDIA_INFO_BY_SHORTCODE]: { shortcode: string };
}[E];
/**
 * Response data generic type that depends on which RocketAPI endpoint is selected
 */
type RocketApiResponseData<E extends RocketApiEndpoints> = {
  [RocketApiEndpoints.MEDIA_INFO_BY_SHORTCODE]: RocketApiResponse<MediaInfo>;
}[E];

export async function rocketAPI<E extends RocketApiEndpoints>(
  endpoint: E,
  payload: RocketApiPayloadData<E>
): Promise<RocketApiResponseData<E> | null> {
  const keys: string[] = [env.RAPID_KEY1, env.RAPID_KEY2, env.RAPID_KEY3];
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 9900);

  try {
    const res = await fetch(
      "https://rocketapi-for-instagram.p.rapidapi.com/instagram" + endpoint,
      {
        method: "POST",
        headers: {
          "X-RapidAPI-Key": keys[Math.floor(Math.random() * 2)],
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "rocketapi-for-instagram.p.rapidapi.com",
        },
        signal: abortController.signal,
        body: JSON.stringify(payload),
      }
    );
    const data: RocketApiResponseData<E> = await res.json();
    return data;
  } catch (e: unknown) {
    console.log(
      "RocketAPI-for-instagram RapidAPI request failed or aborted because of timeout: ",
      e
    );
    return null;
  }
}
