import { configureStore } from "@reduxjs/toolkit";
import authorsReducer from "./reducers/authors";
import genresReducer from "./reducers/genres";
import charactersReducer from "./reducers/characters";
import settingsReducer from "./reducers/settings";
import booksReducer from "./reducers/books";
import editionsReducer from "./reducers/editions";
import bookListsReducer from "./reducers/book-list";
import RatingsReducer from "./reducers/ratings";

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    genres: genresReducer,
    characters: charactersReducer,
    settings: settingsReducer,
    books: booksReducer,
    editions: editionsReducer,
    bookLists: bookListsReducer,
    ratings: RatingsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
