import type { EditionI } from "../../data-structures";
import { fakeBook, fakeBook2 } from "./book";

export const fakeEdition: EditionI = {
  _id: "fakeId",
  title: "fakeTitle",
  cover: "fakeCover",
  book: fakeBook,
  description: "fakedescription",
  published: new Date(),
  pagesCount: 100,
  format: "fakeformat",
  ISBN: "fakeISBN",
  ASIN: "fakeASIN",
  language: "fakelanguage",
};

export const fakeEdition2: EditionI = {
  _id: "fakeId2",
  title: "fakeTitle2",
  cover: "fakeCover2",
  book: fakeBook2,
  description: "fakedescription2",
  published: new Date(),
  pagesCount: 200,
  format: "fakeformat2",
  ISBN: "fakeISBN2",
  ASIN: "fakeASIN2",
  language: "fakelanguage2",
};

export const fakeEditionsList = [fakeEdition, fakeEdition2];
