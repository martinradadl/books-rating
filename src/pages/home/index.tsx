import { useDispatch } from "react-redux"
import { HomeDesktop } from "./desktop-view"
import { HomeMobile } from "./mobile-view"
import { useEffect } from "react"
import genresActions from "../../redux/actions/genres"
import bookListsActions from "../../redux/actions/book-lists"
import editionsActions from "../../redux/actions/editions"
import type { AppDispatch } from "../../redux/store"
import { useIsDesktop } from "../../hooks/is-desktop"

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isDesktop = useIsDesktop();

    useEffect(() => {
        dispatch(
            genresActions.getAll({
                limit: isDesktop ? 27 : 9,
                sortBy: "occurrence",
            })
        );
        dispatch(bookListsActions.getAll({ limit: isDesktop ? 3 : 5 }));
        dispatch(editionsActions.getMostRatedBooks({ enableSuggestion: isDesktop, limit: isDesktop ? 4 : 10 }));
    }, [dispatch, isDesktop]);

    return isDesktop ? <HomeDesktop /> : <HomeMobile />;
}