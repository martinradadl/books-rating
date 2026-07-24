import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { useIsDesktop } from "../../../hooks/is-desktop";
import genresActions from "../../../redux/actions/genres";
import { MoreGenresDesktop } from "./desktop-view";
import { MoreGenresMobile } from "./mobile-view";

export const MoreGenres = () => {
  const dispatch = useAppDispatch();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    dispatch(
      genresActions.getAll({
        limit: isDesktop ? 40 : 30,
        sortBy: "occurrence",
      })
    );
    dispatch(
      genresActions.getDiscoverList({
        genresLimit: 4,
        editionsLimit: isDesktop ? 5 : 3,
      })
    );
  }, [dispatch, isDesktop]);

  return isDesktop ? <MoreGenresDesktop /> : <MoreGenresMobile />;
};
