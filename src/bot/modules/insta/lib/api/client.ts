import env from "$env";

export async function get(url: string) {
  const keys: string[] = [env.RAPID_KEY1, env.RAPID_KEY2, env.RAPID_KEY3];
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 9900);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": keys[Math.floor(Math.random() * 2)],
        "X-RapidAPI-Host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
      },
      signal: abortController.signal,
    });
    const data = await res.json();
    return data[0];
  } catch (e: unknown) {
    console.log("Insta Rapid API request failed or aborted because of timeout: ", e);
  }
}
