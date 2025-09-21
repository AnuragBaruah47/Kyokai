
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
