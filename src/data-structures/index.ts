export interface AuthorI {
  _id: string;
  name: string;
  profilePic: string;
  description: string;
}

export interface GenreI {
  _id: string;
  name: string;
  description?: string;
  slug?: string;
}

export interface CharacterI {
  _id: string;
  name: string;
}

export interface SettingI {
  _id: string;
  name: string;
}

export interface BookI {
  _id: string;
  originalTitle: string;
  author: AuthorI;
  relatedGenres: GenreI[];
  firstPublished: Date;
  characters: CharacterI[];
  settings: SettingI[];
}

export interface EditionI {
  _id: string;
  title: string;
  cover: string;
  book: BookI;
  description: string;
  published: Date;
  pagesCount: number;
  format: string;
  ISBN: string;
  ASIN: string;
  language: string;
  ratingCount?: number;
  averageRating?: number;
}

export interface EditionPreviewI {
  _id: string;
  title: string;
  cover: string;
  book: BookI;
}

export interface BookListI {
  _id: string;
  title: string;
  description?: string;
  books?: EditionI[];
  urlPath?: string;
  booksCount?: number;
}

export interface RatingI {
  _id?: string;
  book: string;
  score: number;
}
