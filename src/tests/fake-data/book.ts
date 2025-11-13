import type { BookI } from "../../data-structures";
import { fakeAuthor, fakeAuthor2 } from "./author";
import { fakeCharacter, fakeCharacter2 } from "./character";
import { fakeGenre, fakeGenre2 } from "./genre";
import { fakeSetting, fakeSetting2 } from "./setting";

export const fakeBook: BookI = {
  _id: "fakeId",
  originalTitle: "fakeTitle",
  author: fakeAuthor,
  relatedGenres: [fakeGenre],
  firstPublished: new Date(),
  characters: [fakeCharacter],
  settings: [fakeSetting],
};

export const fakeBook2: BookI = {
  _id: "fakeId2",
  originalTitle: "fakeTitle2",
  author: fakeAuthor2,
  relatedGenres: [fakeGenre2],
  firstPublished: new Date(),
  characters: [fakeCharacter2],
  settings: [fakeSetting2],
};

export const fakeBooksList = [fakeBook, fakeBook2];
