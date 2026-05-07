import { useEffect, useMemo } from "react"
import { HomeAuthContainerDesktop } from "../../components/auth/home-auth-desktop"
import { HomeBackgroundImgDesktop } from "../../components/home/background-img-desktop"
import { BookListPreview } from "../../components/home/books-list-preview"
import { DiscoverBooksList, type DiscoverBooksItemProps } from "../../components/home/discover-books-list"
import { LinksListDesktop } from "../../components/home/links-list-desktop"
import { HomeSearchBarDesktop } from "../../components/home/search-bar-desktop"
import { ProfilePic } from "../../components/profile-pic"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import type { RootState } from "../../redux/store"
import editionsActions from "../../redux/actions/editions"
import { HOME_DATA } from "../../data/home"
import { useNavigate } from "react-router-dom"
import { Loading } from "../../components/loading"

const {
    exampleQuote,
    quoteAuthor,
    CHOICE_AWARDS_IMG_URL,
    NEWS_IMG_URL,
    quotesThemesLinksList,
    awardsCategoriesLinksList
} = HOME_DATA;

export const HomeDesktop = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { genresList, status: genresStatus } = useAppSelector((state: RootState) => state.genres)
    const { mostRatedBooks, bestRatedBooks, status: editionsStatus } = useAppSelector((state: RootState) => state.editions)
    const { listOfBookLists, status: bookListsStatus } = useAppSelector((state: RootState) => state.bookLists)
    const bestRatedBooksStringified = JSON.stringify(bestRatedBooks);
    const mostRatedBooksStringified = JSON.stringify(mostRatedBooks);

    const genresLinksList = () => {
        const linksList = genresList.map(genre => (
            {
                name: genre.name,
                urlPath: `genres/${genre.slug}`
            }
        ))
        linksList.push({ name: "More genres", urlPath: "genres" })
        return linksList;
    }


    useEffect(() => {
        dispatch(editionsActions.getAll());
        dispatch(editionsActions.getBestRatedBooks({ enableSuggestion: true, limit: 4 }));
    }, [dispatch])


    const discoverMostRatedBooks: DiscoverBooksItemProps[] = useMemo(() => (
        mostRatedBooks.list.slice(0, 4).map(edition => ({
            img: edition.cover,
            id: edition._id
        }))
    ), [mostRatedBooksStringified]) // eslint-disable-line

    const mostRatedBooksSuggestion = useMemo(() => {

        if (mostRatedBooks.suggestion) {
            const mainSuggestion = mostRatedBooks.suggestion;
            const totalGenresShown = Math.floor(Math.random() * 3) + 1;
            const genres = mainSuggestion.book.relatedGenres.slice(0, totalGenresShown).map(genre => genre.name).join(", ");

            return {
                img: mainSuggestion.cover,
                id: mainSuggestion._id,
                genres
            };
        }
        return { img: "", id: "", genres: "" }
    }, [mostRatedBooksStringified]) // eslint-disable-line

    const discoverBestRatedBooks: DiscoverBooksItemProps[] = useMemo(() => (
        bestRatedBooks.list.slice(0, 4).map(edition => ({
            img: edition.cover,
            id: edition._id
        }))
    ), [bestRatedBooksStringified]) // eslint-disable-line

    const bestRatedBooksSuggestion = useMemo(() => {

        if (bestRatedBooks.suggestion) {
            const mainSuggestion = bestRatedBooks.suggestion;
            const totalGenresShown = Math.floor(Math.random() * 3) + 1;
            const genres = mainSuggestion.book.relatedGenres.slice(0, totalGenresShown).map(genre => genre.name).join(", ");

            return {
                img: mainSuggestion.cover,
                id: mainSuggestion._id,
                genres
            };
        }
        return { img: "", id: "", genres: "" }
    }, [bestRatedBooksStringified]) // eslint-disable-line


    if (editionsStatus === "loading"
        || genresStatus === "loading"
        || bookListsStatus === "loading") {
        return <Loading />
    }

    return (
        <div className="max-w-full mx-auto">
            <HomeBackgroundImgDesktop />

            <div className="max-w-[970px] mx-auto pt-[325px]">
                <div className="relative">
                    <HomeAuthContainerDesktop />
                </div>

                <div className="flex">
                    <div className="w-[625px] mr-2.5 ml-2">
                        <div className="flex">
                            <div className="w-[280px] mr-[40px]">
                                <p className="text-lg">
                                    Deciding what to read next?
                                </p>
                                <p className="text-sm my-[18px]">
                                    You're in the right place. Tell us what titles or genres you've enjoyed in the past, and we'll give you surprisingly insightful suggestions.
                                </p>
                            </div>

                            <div className="w-[280px]">
                                <p className="text-lg">
                                    What are your friends reading?
                                </p>
                                <p className="text-sm my-[18px]">
                                    Chances are your friends are discussing their favorite (and least favorite) books on Goodreads.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#f4f2e9] rounded pt-[15px] pb-5">
                            <p className="text-lg pl-[15px]">What will you discover?</p>

                            <DiscoverBooksList title="Most Rated Books" list={discoverMostRatedBooks} mainSuggestion={mostRatedBooksSuggestion} />
                            <DiscoverBooksList title="Best Rated Books" list={discoverBestRatedBooks} mainSuggestion={bestRatedBooksSuggestion} />
                        </div>

                        <div className="my-[25px] flex flex-col gap-3">
                            <p className="text-lg">Search and browse books</p>

                            <HomeSearchBarDesktop />

                            <LinksListDesktop list={genresLinksList()} columns={4} className="leading-[1.5]" />
                        </div>

                        <div className="my-6">
                            <p className="mb-2.5 text-lg">Quotes</p>

                            <div className="flex">
                                <div className="flex w-2/3">
                                    <div className="w-[56px]">
                                        <ProfilePic />
                                    </div>

                                    <div className="text-sm px-4">
                                        <p>{exampleQuote}</p>
                                        <p className="font-semibold">― {quoteAuthor}</p>
                                    </div>
                                </div>

                                <div className="w-1/3">
                                    <LinksListDesktop list={quotesThemesLinksList} className="leading-[1.5]" />
                                </div>
                            </div>
                        </div>

                        <p className="mb-2.5 text-lg">Goodreads Choice Awards: Readers' Favorite Books 2025</p>

                        <div className="flex">
                            <div className="mt-2.5 mr-5 w-[110px]">
                                <img src={CHOICE_AWARDS_IMG_URL} alt="Choice Awards" className="cursor-pointer" />
                            </div>

                            <div className="flex flex-1">
                                <LinksListDesktop list={awardsCategoriesLinksList} columns={2} className="mb-[0.8em]" />
                            </div>
                        </div>

                    </div>

                    <div className="w-[300px] ml-2 mt-[160px]">
                        <p className="text-base">News & Interviews</p>

                        <p className="text-[#00635d] my-4 text-xs font-semibold cursor-pointer hover:underline">
                            Readers' Most Anticipated Romantasies for 2026
                        </p>

                        <img src={NEWS_IMG_URL} alt="News" className="cursor-pointer" />

                        <p className="text-xs my-2.5 text-[#767676]">120 likes</p>

                        <p className="mt-6 mb-2.5 text-lg">Love lists?</p>

                        {listOfBookLists.map((list) => (
                            <BookListPreview
                                list={list}
                                votersCount={45678}
                                key={list.title}
                            />
                        ))}

                        <p className="my-[18px] text-sm text-[#00635d] cursor-pointer hover:underline"
                            onClick={() => { navigate(`list/more`) }}>More book lists</p>

                        <p className="text-lg">
                            Are you an author or a publisher?
                        </p>

                        <p className="my-[18px] text-sm">
                            Gain access to a massive audience of book lovers.
                            Goodreads is a great place to promote your books.
                        </p>

                        <div className="flex justify-center text-[11px] gap-3.5">
                            <button className="px-3 py-1 bg-[#F4F1EA] rounded border border-[#D6D0C4] cursor-pointer hover:bg-[#D6D2C4]">
                                Author program
                            </button>

                            <button className="px-3 py-1 bg-[#F4F1EA] rounded border border-[#D6D0C4] cursor-pointer hover:bg-[#D6D2C4]">
                                Advertise
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}