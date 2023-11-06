import { RocketApiResponse } from "./types/index.ts";
import { MediaInfo } from "./types/MediaInfo.ts";
import { getRandomRapidApiKey, removeTimeoutedKey } from "./helpers/index.ts";

/**
 * RocketAPI
 *  https://rapidapi.com/rocketapi/api/rocketapi-for-instagram
 */

/**
 * RocketAPI endpoints
 */
export enum RocketApiEndpoints {
  MEDIA_INFO_BY_SHORTCODE = "/media/get_info_by_shortcode",
  MEDIA_INFO_BY_ID = "/media/get_info",
}
/**
 * Request data generic type that depends on which RocketAPI endpoint is selected
 */
type RocketApiPayloadData<E extends RocketApiEndpoints> = {
  [RocketApiEndpoints.MEDIA_INFO_BY_SHORTCODE]: { shortcode: string };
  [RocketApiEndpoints.MEDIA_INFO_BY_ID]: { id: string };
}[E];
/**
 * Response data generic type that depends on which RocketAPI endpoint is selected
 */
type RocketApiResponseData<E extends RocketApiEndpoints> = {
  [RocketApiEndpoints.MEDIA_INFO_BY_SHORTCODE]: RocketApiResponse<MediaInfo>;
  [RocketApiEndpoints.MEDIA_INFO_BY_ID]: RocketApiResponse<MediaInfo>;
}[E];

export async function rocketAPI<E extends RocketApiEndpoints>(
  endpoint: E,
  payload: RocketApiPayloadData<E>
): Promise<RocketApiResponseData<E> | null> {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 9900);
  const [apiKeyName, apiKeyValue] = getRandomRapidApiKey();
  try {
    const res = await fetch(
      "https://rocketapi-for-instagram.p.rapidapi.com/instagram" + endpoint,
      {
        method: "POST",
        headers: {
          "X-RapidAPI-Key": apiKeyValue,
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "rocketapi-for-instagram.p.rapidapi.com",
        },
        signal: abortController.signal,
        body: JSON.stringify(payload),
      }
    );
    if (res.status === 429) {
      console.warn("Key %s has reached limit", apiKeyName);
      removeTimeoutedKey(apiKeyName);
      return null;
    } else if (res.status === 200) {
      const data: RocketApiResponseData<E> = await res.json();
      return data;
    } else {
      console.error("Unknown status: ", await res.json());
      throw new Error(`Unhandled RocketAPI response status code ${res.status}`);
    }
  } catch (e: unknown) {
    console.error(
      "RocketAPI request failed or aborted because of timeout: ",
      e
    );
    return null;
  }
}
