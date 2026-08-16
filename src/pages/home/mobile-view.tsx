import type { RootState } from "../../redux/store";
import { useEffect } from "react";
import editionsActions from "../../redux/actions/editions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaQuoteLeft } from "react-icons/fa";
import { BooksCarousel } from "../../components/books-carousel";
import { MdArrowForwardIos } from "react-icons/md";
import { ProfilePic } from "../../components/profile-pic";
import { GooglePlayButton } from "../../components/buttons/google-play-button";
import { HomeAuthContainerMobile } from "../../components/auth/home-auth-mobile";
import { HomeSearchBarMobile } from "../../components/home/search-bar-mobile";
import { LinksListMobileItem } from "../../components/home/links-list-mobile-item";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { useAutocomplete } from "../../hooks/autocomplete";
import { AutocompleteInput } from "../../components/autocomplete";
import { BookAutocompleteItem } from "../../components/autocomplete/book-results-item";
import bookListsActions from "../../redux/actions/book-lists";

const quotesLists = [
  "Best quotes",
  "Love quotes",
  "Inspirational quotes",
  "Funny quotes",
  "Motivational quotes",
  "Life quotes",
  "Friends quotes",
  "Positive quotes",
  "Birthday quotes",
  "See more quotes",
];

const MOBILE_HOME_INTRO_IMG =
  "https://www.goodreads.com/assets/home/homepage_promos/reading_challenge_2026/HomepageMasthead_Mobile@2x.png";
const MOBILE_CHOICE_AWARDS_IMG =
  "https://s.gr-assets.com/assets/award/2025/signed-out-hp/bottom-placement-mobile-f633ce2277b115cb3cc06838feac9e17.png";

export const HomeMobile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mostRatedBooks,
    latestReleases,
    autocompleteResults,
    status: editionsStatus,
  } = useAppSelector((state: RootState) => state.editions);
  const { listOfBookLists, status: bookListsStatus } = useAppSelector(
    (state: RootState) => state.bookLists
  );
  const { genresList, status: genresStatus } = useAppSelector(
    (state: RootState) => state.genres
  );
  const {
    autocompleteRef,
    debouncedHandleOnChangeSearch,
    searchValue,
    isAutocompleteOpen,
    setIsAutocompleteOpen,
    handleClickOnAllResultsBooks,
  } = useAutocomplete(editionsActions.searchByTitleOrAuthor);

  useEffect(() => {
    dispatch(editionsActions.getAll());
    dispatch(editionsActions.getLatestReleases({ limit: 8 }));
  }, [dispatch]);

  if (
    editionsStatus === "loading" ||
    bookListsStatus === "loading" ||
    genresStatus === "loading"
  ) {
    return <Loading />;
  }

  return (
    <div className="max-w-[424px] mx-auto">
      <div className="mx-auto">
        <img
          src={MOBILE_HOME_INTRO_IMG}
          alt="intro img"
          className="cursor-pointer"
        />

        <HomeAuthContainerMobile />

        <div ref={autocompleteRef}>
          <AutocompleteInput
            inputComponent={
              <HomeSearchBarMobile onChange={debouncedHandleOnChangeSearch} />
            }
            ItemListComponent={BookAutocompleteItem}
            items={autocompleteResults}
            inputValue={searchValue}
            isOpen={isAutocompleteOpen}
            setIsOpen={setIsAutocompleteOpen}
            handleClickOnAllResults={handleClickOnAllResultsBooks}
            resultsListClassName="w-[404px] ml-2.5"
            allResultsItemClassName="border-x"
            itemClassName="w-full border-x md:w-[404px]"
          />
        </div>

        <div className="my-6 flex justify-center">
          <GooglePlayButton />
        </div>

        <BooksCarousel
          title={<p className="font-semibold mb-2">MOST RATED BOOKS</p>}
          editionsList={mostRatedBooks.list}
          isHome
        />

        <BooksCarousel
          title={<p className="font-semibold my-2">LATEST RELEASES</p>}
          editionsList={latestReleases}
          isHome
        />

        <ul className="flex flex-wrap">
          {listOfBookLists.map((bookList, index) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <BooksCarousel
                    title={<p className="font-semibold my-2">LISTS</p>}
                    editionsList={bookList.books || []}
                    isHome
                  />

                  <div
                    className="flex place-content-between w-full cursor-pointer mb-6"
                    onClick={() => navigate(`/list/${bookList.urlPath}`)}
                  >
                    <div className="flex flex-col">
                      <p className="text-base">{bookList.title}</p>
                      <p className="text-sm text-gray-400">
                        {bookList.booksCount} books
                      </p>
                    </div>
                    <div className="font-extrabold">
                      <MdArrowForwardIos className="scale-120" size={16} />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <li key={index} className="w-1/2 flex">
                <LinksListMobileItem
                  title={bookList.title}
                  url={`list/${bookList.urlPath}`}
                />
              </li>
            );
          })}

          <li className="w-1/2 flex">
            <div
              onClick={() => {
                dispatch(bookListsActions.resetStatusToLoading());
              }}
            >
              <LinksListMobileItem title="See more lists" url={`list`} />
            </div>
          </li>
        </ul>

        <p className="font-semibold my-2">GENRES</p>

        <ul className="flex flex-wrap">
          {genresList.map((genre, index) => (
            <li key={index} className="w-1/2 flex">
              <LinksListMobileItem
                title={genre.name}
                url={`genres/${genre.slug}`}
              />
            </li>
          ))}

          <li key="more" className="w-1/2 flex">
            <LinksListMobileItem title="More genres" url="genres" />
          </li>
        </ul>

        <p className="font-semibold my-2">QUOTES</p>

        <div className="flex gap-3 my-4">
          <ProfilePic isHome />
          <FaQuoteLeft size={18} />
          <div className="flex flex-col">
            <p>Be yourself; everyone else is already taken.</p>
            <p>Oscar Wilde</p>
          </div>
        </div>

        <ul className="flex flex-wrap">
          {quotesLists.map((quotesList, index) => (
            <li key={index} className="w-1/2 flex">
              <LinksListMobileItem title={quotesList} url="" />
            </li>
          ))}
        </ul>

        <p className="uppercase text-sm font-semibold my-3">
          Goodreads Choice Awards: The Best Books 2025
        </p>

        <img
          src={MOBILE_CHOICE_AWARDS_IMG}
          alt="Choice Awards"
          className="mr-[30px]"
        />

        <p className="mt-[5px] text-[#00635D] text-sm mb-6 cursor-pointer hover:underline w-fit">
          See the winners
        </p>
      </div>
    </div>
  );
};
