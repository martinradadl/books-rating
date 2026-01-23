const quotesThemes = [
  "Best quotes",
  "Love quotes",
  "Inspirational quotes",
  "Funny quotes",
  "Motivational quotes",
  "Life quotes",
  "Friends quotes",
  "Positive quotes",
  "More quotes",
];

const awardsCategories = [
  "2025",
  "Fiction",
  "Historical Fiction",
  "Mystery & Thriller",
  "Romance",
  "Romantasy",
  "Fantasy",
  "Science Fiction",
  "Horror",
  "Debut Novel",
  "Audiobook",
  "Young Adult Fantasy & Sci-Fi",
  "Young Adult Fiction",
  "Nonfiction",
  "Memoir",
  "History & Biography",
];

const parsedAwardsCategories = awardsCategories.map(
  (category) => `Readers' Favorite ${category}`
);

const quotesThemesLinksList = quotesThemes.map((quoteTheme) => ({
  name: quoteTheme,
  urlPath: "",
}));

const awardsCategoriesLinksList = parsedAwardsCategories.map((category) => ({
  name: category,
  urlPath: "",
}));

const exampleQuote =
  "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.";
const quoteAuthor = "Albert Einstein";

const CHOICE_AWARDS_IMG_URL =
  "	https://s.gr-assets.com/assets/award/2025/choice-logo-medium-6959385f85ec60264063ec50544ad514.png";

const NEWS_IMG_URL = "https://images.gr-assets.com/blogs/1766018789p7/3052.jpg";

export const HOME_DATA = {
  quotesThemesLinksList,
  awardsCategoriesLinksList,
  exampleQuote,
  quoteAuthor,
  CHOICE_AWARDS_IMG_URL,
  NEWS_IMG_URL,
};
