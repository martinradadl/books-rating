import type { AuthorI } from "../../data-structures";

export const fakeAuthor: AuthorI = {
  _id: "fakeId",
  name: "fakeName",
  profilePic: "fakeProfilePic",
  description: "fakeDescription",
};

export const fakeAuthor2: AuthorI = {
  _id: "fakeId2",
  name: "fakeName2",
  profilePic: "fakeProfilePic2",
  description: "fakeDescription2",
};

export const fakeAuthorsList = [fakeAuthor, fakeAuthor2];
