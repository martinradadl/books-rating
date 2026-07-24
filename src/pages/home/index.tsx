import { HomeDesktop } from "./desktop-view";
import { HomeMobile } from "./mobile-view";
import { useEffect } from "react";
import { useIsDesktop } from "../../hooks/is-desktop";
import { useAppDispatch } from "../../redux/hooks";
import genresActions from "../../redux/actions/genres";
import bookListsActions from "../../redux/actions/book-lists";
import editionsActions from "../../redux/actions/editions";

export const Home = () => {
  const isDesktop = useIsDesktop();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      genresActions.getAll({
        limit: isDesktop ? 27 : 9,
        sortBy: "occurrence",
      })
    );

    dispatch(bookListsActions.getAll({ limit: isDesktop ? 3 : 5 }));

    dispatch(
      editionsActions.getMostRatedBooks({
        enableSuggestion: isDesktop,
        limit: isDesktop ? 4 : 10,
      })
    );
  }, [isDesktop, dispatch]);

  return isDesktop ? <HomeDesktop /> : <HomeMobile />;
};
