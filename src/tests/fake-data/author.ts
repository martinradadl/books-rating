import type { AuthorI } from "../../data-structures";

export const fakeAuthor: AuthorI = {
  _id: "fakeId",
  name: "fakeName",
  profilePic: "fakeProfilePic",
  description: "fakeDescription",
  birthplace: "fakeBirthPlace",
  birthdate: new Date(),
};

export const fakeAuthor2: AuthorI = {
  _id: "fakeId2",
  name: "fakeName2",
  profilePic: "fakeProfilePic2",
  description: "fakeDescription2",
  birthplace: "fakeBirthPlace2",
  birthdate: new Date(),
};

export const fakeAuthorsList = [fakeAuthor, fakeAuthor2];
