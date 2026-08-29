import { MdSearch } from "react-icons/md";
import { BooksCarousel } from "../../components/books-carousel";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { Loading } from "../../components/loading";
import type { RootState } from "../../redux/store";
import bookListsActions from "../../redux/actions/book-lists";
import { useNavigate } from "react-router-dom";

export const MoreLists = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { listOfBookLists, relatedGenres, status } = useAppSelector(
    (state: RootState) => state.bookLists
  );

  useEffect(() => {
    dispatch(
      bookListsActions.getAll({
        limit: 4,
        itemLimit: 6,
        carouselData: true,
      })
    );

    dispatch(bookListsActions.getMostCommonRelatedGenres(10));
  }, [dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="w-[91%] max-w-[1260px] mx-auto pt-4 flex gap-8">
      <div className="min-w-[320px] flex-1">
        <p className="text-[22px] pb-4 font-semibold">More Lists</p>

        <div
          className="flex items-center min-h-[46px] px-1 mb-3 text-base rounded-full
         border border-[#707070] focus-within:ring-2 focus-within:ring-black 
         focus-within:border-black focus-within:ring-offset-2"
        >
          <div className="p-2.5">
            <MdSearch size={20} />
          </div>

          <input
            type="text"
            placeholder="Search tags"
            className="mx-2 flex-1 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {relatedGenres.map((genre) => (
            <button
              key={genre.name}
              className="py-2.5 font-semibold cursor-pointer underline underline-offset-4 decoration-3 decoration-green-700"
              onClick={() => {
                dispatch(bookListsActions.resetStatusToLoading());
                navigate(`/list/genre/${genre.slug}`);
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <p className="mt-8 mb-4 text-xl font-semibold">Featured lists</p>

        <div className="space-y-8 pb-8">
          {listOfBookLists.map((list) => (
            <BooksCarousel
              key={list.title}
              editionsList={list.books || []}
              showAllLabel="More books in this list"
              title={<p className="text-[18px] font-semibold">{list.title}</p>}
              isFeaturedList
              handleClickOnShowAll={() => {
                navigate(`/list/${list.urlPath}`);
              }}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block w-[300px]">
        <div className="bg-gray-400 h-[480px]">
          <p className="text-gray-100 ml-2 mr-2">ad</p>
        </div>
      </div>
    </div>
  );
};
