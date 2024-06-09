export const stripHtmlTags = (str: string): string => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};
