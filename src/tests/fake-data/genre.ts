import type { GenreI } from "../../data-structures";
import { fakeEdition, fakeEdition2 } from "./edition";

export const fakeGenre: GenreI = {
  _id: "fakeId",
  name: "fakeName",
  description: "fakeDescription",
};

export const fakeGenre2: GenreI = {
  _id: "fakeId2",
  name: "fakeName2",
  description: "fakeDescription2",
};

export const fakeGenresList = [fakeGenre, fakeGenre2];

export const fakeDiscoverList = [
  { genre: fakeGenre, editions: [fakeEdition] },
  { genre: fakeGenre2, editions: [fakeEdition2] },
];
