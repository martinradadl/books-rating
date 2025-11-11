import type { GenreI } from "../../data-structures";

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
