const appStoreURL = "https://apps.apple.com/app/centergrade-app/id6759246214";

/** Campaign attribution is enabled only with a real App Store Connect provider token. */
export function appStoreLink(campaign: string, providerToken?: string): string {
  if (!providerToken || !/^\d{1,64}$/.test(providerToken) || !/^[A-Za-z0-9_-]{1,40}$/.test(campaign)) return appStoreURL;
  const url = new URL(appStoreURL);
  url.searchParams.set("pt", providerToken);
  url.searchParams.set("ct", campaign);
  url.searchParams.set("mt", "8");
  return url.toString();
}
