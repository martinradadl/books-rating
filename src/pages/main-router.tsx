import { Route, Routes } from "react-router-dom"
import { Home } from "./home"
import { BookEdition } from "./book-edition"

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edition/:id" element={<BookEdition />} />
        </Routes>
    )
}