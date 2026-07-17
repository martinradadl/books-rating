import { useEffect } from "react";
import { GenreBookListDesktop } from "./desktop-view";
import { GenreBookListMobile } from "./mobile-view";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import editionsActions from "../../../redux/actions/editions";
import { useIsDesktop } from "../../../hooks/is-desktop";
import { useIsMounted } from "../../../hooks/is-mounted";

export type GenreBookListRouteParams = {
  list: "latest-releases" | "most-rated" | "best-rated";
  genre: string;
};

export const GenreBookList = () => {
  const params = useParams<GenreBookListRouteParams>();
  const dispatch = useAppDispatch();
  const isDesktop = useIsDesktop();
  const { skipFirstRender } = useIsMounted();

  useEffect(() => {
    if (!params.list) return;

    const actionMap = {
      "latest-releases": editionsActions.getLatestReleases,
      "most-rated": editionsActions.getMostRatedBooks,
      "best-rated": editionsActions.getBestRatedBooks,
    };

    const action = actionMap[params.list];

    skipFirstRender(() => {
      dispatch(
        action({
          limit: isDesktop ? 30 : 24,
          genreSlug: params.genre,
        })
      );
    });
  }, [isDesktop, params.list, params.genre, dispatch, skipFirstRender]);

  return isDesktop ? <GenreBookListDesktop /> : <GenreBookListMobile />;
};
