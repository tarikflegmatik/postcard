export const copyUrlToClipboard = async (url: string) => {
  await navigator.clipboard.writeText(url);
};
