import { useEffect, useState } from "react";
import { GenreBookListDesktop } from "./desktop-view";
import { GenreBookListMobile } from "./mobile-view";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import editionsActions from "../../../redux/actions/editions";

export type GenreBookListRouteParams = {
    list: "latest-releases" | "most-rated" | "best-rated";
    genre: string;
};


export const GenreBookList = () => {
    const params = useParams<GenreBookListRouteParams>();
    const dispatch = useAppDispatch();

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
        if (!params.list) return;

        const actionMap = {
            "latest-releases": editionsActions.getLatestReleases,
            "most-rated": editionsActions.getMostRatedBooks,
            "best-rated": editionsActions.getBestRatedBooks,
        };

        const action = actionMap[params.list];

        dispatch(
            action({
                limit: isDesktop ? 30 : 24,
                genreSlug: params.genre,
            })
        );
    }, [isDesktop, params.list, params.genre, dispatch]);

    return isDesktop ? <GenreBookListDesktop /> : <GenreBookListMobile />;
}