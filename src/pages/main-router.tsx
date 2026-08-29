import { Route, Routes } from "react-router-dom";
import { BookEdition } from "./book-edition";
import { Home } from "./home";
import { Genre } from "./genre";
import { BookList } from "./book-list";
import { GenreBookList } from "./genre/book-list";
import { MoreGenres } from "./genre/more-genres";
import { GenresSearch } from "./genre/search";
import { MoreLists } from "./book-list/more-lists";
import { BookListsByGenre } from "./book-list/by-genre";

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edition/:id" element={<BookEdition />} />
      <Route path="/genres" element={<MoreGenres />} />
      <Route path="/genres/search" element={<GenresSearch />} />
      <Route path="/genres/:name" element={<Genre />} />
      <Route path="/genres/:list/:genre" element={<GenreBookList />} />
      <Route path="/list" element={<MoreLists />} />
      <Route path="/list/genre/:genre" element={<BookListsByGenre />} />
      <Route path="/list/:title" element={<BookList />} />
    </Routes>
  );
};
