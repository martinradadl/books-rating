import { Route, Routes } from "react-router-dom"
import { BookEdition } from "./book-edition"
import { Home } from "./home"

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edition/:id" element={<BookEdition />} />
        </Routes>
    )
}