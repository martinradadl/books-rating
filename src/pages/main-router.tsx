import { Route, Routes } from "react-router-dom"
import { BookEdition } from "./book-edition"
import { Home } from "./home"
import { Genre } from "./genre"

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edition/:id" element={<BookEdition />} />
            <Route path="/genres/:name" element={<Genre />} />
        </Routes>
    )
}