import { useDispatch } from "react-redux"
import { HomeDesktop } from "./desktop-view"
import { HomeMobile } from "./mobile-view"
import { useEffect, useState } from "react"
import genresActions from "../../redux/actions/genres"
import bookListsActions from "../../redux/actions/book-lists"
import type { AppDispatch } from "../../redux/store"

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isDesktop, setIsDesktop] = useState(
        window.innerWidth >= 1024
    );

    useEffect(() => {
        const onResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        dispatch(
            genresActions.getAll({
                limit: isDesktop ? 27 : 9,
                sortBy: "occurrence",
            })
        );
        dispatch(bookListsActions.getAll({ limit: isDesktop ? 3 : 5 }));

    }, [dispatch, isDesktop]);

    return isDesktop ? <HomeDesktop /> : <HomeMobile />;
}