import { useEffect } from "react";
import { GenreDesktop } from "./desktop-view";
import { GenreMobile } from "./mobile-view";
import { useAppDispatch } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import genresActions from "../../redux/actions/genres";
import editionsActions from "../../redux/actions/editions";
import { useIsDesktop } from "../../hooks/is-desktop";

export const Genre = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const isDesktop = useIsDesktop();

    useEffect(() => {
        dispatch(genresActions.getByUrlSlug(params.name || ""))
        dispatch(genresActions.getRelatedGenres({ slug: params.name || "", limit: 10 }))

    }, [dispatch, params.name])

    useEffect(() => {
        dispatch(editionsActions.getLatestReleases({ limit: isDesktop ? 15 : 3, genreSlug: params.name }))
        dispatch(editionsActions.getMostRatedBooks({ limit: isDesktop ? 15 : 3, genreSlug: params.name }))
        dispatch(editionsActions.getBestRatedBooks({ limit: isDesktop ? 15 : 3, genreSlug: params.name }))
    }, [dispatch, isDesktop, params.name])

    return isDesktop ? <GenreDesktop /> : <GenreMobile />;
}