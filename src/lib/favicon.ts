export const favicon = (pageUrl: string, size: number = 24) => {
  const url = new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`);
  url.searchParams.append("pageUrl", pageUrl);
  url.searchParams.append("size", size.toString());

  return url.href;
};
