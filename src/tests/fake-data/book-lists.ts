import type { BookListI } from "../../data-structures";
import { fakeEdition, fakeEdition2 } from "./edition";

export const fakeBookList: BookListI = {
  _id: "fakeId",
  title: "fakeTitle",
  description: "fakeDescription",
  books: [fakeEdition, fakeEdition2],
};

export const fakeBookList2: BookListI = {
  _id: "fakeId2",
  title: "fakeTitle2",
  description: "fakeDescription2",
  books: [fakeEdition],
};

export const fakeBookListsList = [fakeBookList, fakeBookList2];
