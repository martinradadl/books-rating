export const formatNumberShort = (n: number) => {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return n.toString();
};

export const numberToLocaleString = (number: number, params?: string) => {
  return number.toLocaleString(params);
};

export const sequentialRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const urlSlugToCapitalizedText = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const textToUrlSlug = (text: string): string =>
  text.toLowerCase().trim().replace(/\s+/g, "-");
