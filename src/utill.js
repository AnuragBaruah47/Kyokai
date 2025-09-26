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

  // If already <= 400 chars, return as is
  if (text.length <= 400) return text;

  // Otherwise slice and add ellipsis
  return text.slice(0, 400) + "…";
}


export  function extractMinutesPerEpisode(input) {
  if (typeof input !== "string") return null;
  const match = input.match(/\d+/);
  return match ? Number(match[0]) : null;
}