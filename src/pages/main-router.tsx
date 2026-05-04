import { Route, Routes } from "react-router-dom"
import { BookEdition } from "./book-edition"
import { Home } from "./home"
import { Genre } from "./genre"
import { BookList } from "./book-list"
import { GenreBookList } from "./genre/book-list"

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edition/:id" element={<BookEdition />} />
            <Route path="/genres/:name" element={<Genre />} />
            <Route path="/genres/:list/:genre" element={<GenreBookList />} />
            <Route path="/list/:title" element={<BookList />} />
        </Routes>
    )
}