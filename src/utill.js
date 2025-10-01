import axios from "axios";
export function getRatingShort(fullRating) {
  switch (fullRating) {
    case "G - All Ages":
      return "G";
    case "PG - Children":
      return "PG";
    case "PG-13 - Teens 13 or older":
      return "PG+";
    case "R - 17+ (violence & profanity)":
      return "R";
    case "R+ - Mild Nudity":
      return "R+";
    case "Rx - Hentai":
      return "Rx";
    default:
      return "";
  }
}

export function first400Chars(text) {
  if (typeof text !== "string") return "";

  if (text.length <= 400) return text;

  // Otherwise slice and add ellipsis
  return text.slice(0, 400) + "…";
}

export function extractMinutesPerEpisode(input) {
  if (typeof input !== "string") return null;

  const hourMatch = input.match(/(\d+)\s*(?:h|hr|hour)s?/i);
  const minMatch = input.match(/(\d+)\s*(?:m|min|minute)s?/i);

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minMatch ? Number(minMatch[1]) : 0;

  if (hours === 0 && minutes === 0) return null;

  return hours * 60 + minutes;
}

export function formatToLocaleDate(
  dateString,
  locale = undefined,
  options = {}
) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date)) return "";
  const defaultOptions = { year: "numeric", month: "short", day: "numeric" };

  return date.toLocaleDateString(locale, { ...defaultOptions, ...options });
}
