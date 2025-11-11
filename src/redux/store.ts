import { configureStore } from "@reduxjs/toolkit";
import authorsReducer from "./reducers/authors";
import genresReducer from "./reducers/genres";
import charactersReducer from "./reducers/characters";
import settingsReducer from "./reducers/settings";
import booksReducer from "./reducers/books";
import editionsReducer from "./reducers/editions";

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    genres: genresReducer,
    characters: charactersReducer,
    settings: settingsReducer,
    books: booksReducer,
    editions: editionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
