import env from "$env";

export function getRandomRapidApiKey(): [string, string] {
  const keys: [string, string][] = Object.entries(env).filter((v) =>
    v[0].startsWith("RAPID_KEY")
  );
  if (keys.length < 1) {
    throw new Error("All api keys have reached query limits");
  }
  return keys[Math.floor(Math.random() * keys.length)];
}

export function removeTimeoutedKey(keyName: string) {
  delete env[keyName];
}
