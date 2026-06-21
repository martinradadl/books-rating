import { HomeDesktop } from "./desktop-view"
import { HomeMobile } from "./mobile-view"
import { useEffect } from "react"
import { useIsDesktop } from "../../hooks/is-desktop"
import { useAppDispatch } from "../../redux/hooks"
import genresActions from "../../redux/actions/genres"
import debounce from "lodash.debounce"
import bookListsActions from "../../redux/actions/book-lists"
import editionsActions from "../../redux/actions/editions"

export const Home = () => {
    const isDesktop = useIsDesktop();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            debounce(genresActions.getAll({
                limit: isDesktop ? 27 : 9,
                sortBy: "occurrence",
            }),
                2000)
        );
        dispatch(debounce(bookListsActions.getAll({ limit: isDesktop ? 3 : 5 }), 2000));
        dispatch(debounce(editionsActions.getMostRatedBooks({ enableSuggestion: isDesktop, limit: isDesktop ? 4 : 10 }), 2000));
    }, [isDesktop, dispatch]);

    return isDesktop ? <HomeDesktop /> : <HomeMobile />;
}