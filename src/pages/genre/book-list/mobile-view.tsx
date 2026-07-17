import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import genresActions from "../../../redux/actions/genres";
import type { RootState } from "../../../redux/store";
import { Loading } from "../../../components/loading";
import { MoreGenresSelect } from "../../../components/genres/more-genres-select";
import type { GenreBookListRouteParams } from ".";
import { GenreBookListItemsMobile } from "../../../components/genres/list-items-mobile";
import { urlSlugToCapitalizedText } from "../../../helpers/utils";
import { useNavigateToGenres } from "../../../hooks/navigateToGenres";
import { useIsMounted } from "../../../hooks/is-mounted";

export const GenreBookListMobile = () => {
  const dispatch = useAppDispatch();
  const params = useParams<GenreBookListRouteParams>();
  const { genresList, status: genresStatus } = useAppSelector(
    (state: RootState) => state.genres
  );
  const {
    latestReleases,
    mostRatedBooks,
    bestRatedBooks,
    status: editionsStatus,
  } = useAppSelector((state: RootState) => state.editions);
  const { handleNavigateToGenres } = useNavigateToGenres();
  const { skipFirstRender } = useIsMounted();

  const bookListsMap = {
    "latest-releases": latestReleases,
    "most-rated": mostRatedBooks.list,
    "best-rated": bestRatedBooks.list,
  };
  const selectedList = (params.list && bookListsMap[params.list]) || [];
  const genreName = useMemo(
    () => urlSlugToCapitalizedText(params.genre || ""),
    [params.genre]
  );
  const listName = useMemo(
    () => urlSlugToCapitalizedText(params.list || ""),
    [params.list]
  );

  useEffect(() => {
    skipFirstRender(() => {
      dispatch(genresActions.getAll({ limit: 20, sortBy: "occurrence" }));
    });
  }, [dispatch, skipFirstRender]);

  if (genresStatus === "loading" || editionsStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="p-3">
      <p className="mb-2 text-sm">
        <span
          className="text-[#00635d] cursor-pointer hover:underline"
          onClick={() => {
            handleNavigateToGenres();
          }}
        >
          Genres
        </span>
        <span>{" > "}</span>
        <span
          className="text-[#00635d] cursor-pointer hover:underline"
          onClick={() => {
            handleNavigateToGenres(params.genre);
          }}
        >
          {genreName}
        </span>
        <span>{" > "}</span>
        <span>{listName}</span>
      </p>

      <p className="font-bold text-2xl mb-2.5">
        {listName !== "Latest Releases"
          ? `${listName} ${genreName} Books`
          : `${genreName} ${listName}`}
      </p>

      <GenreBookListItemsMobile
        editions={selectedList}
        buttonLabel="View all"
      />

      <MoreGenresSelect genresList={genresList} />
    </div>
  );
};
