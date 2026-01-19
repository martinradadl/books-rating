import { useEffect, useState } from "react"
import { HomeAuthContainerDesktop } from "../../components/auth/home-auth-desktop"
import { HomeBackgroundImgDesktop } from "../../components/home/background-img-desktop"
import { BooksListPreview } from "../../components/home/books-list-preview"
import { DiscoverBooksList, type DiscoverBooksItemProps } from "../../components/home/discover-books-list"
import { LinksListDesktop } from "../../components/home/links-list-desktop"
import { HomeSearchBarDesktop } from "../../components/home/search-bar-desktop"
import { ProfilePic } from "../../components/profile-pic"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import type { RootState } from "../../redux/store"
import editionsActions from "../../redux/actions/editions"

const genres = [
    "Art",
    "Biography",
    "Business",
    "Children's",
    "Christian",
    "Classics",
    "Comics",
    "Cookbooks",
    "Ebooks",
    "Fantasy",
    "Fiction",
    "Graphic Novels",
    "Historical Fiction",
    "History",
    "Horror",
    "Memoir",
    "Music",
    "Mystery",
    "Nonfiction",
    "Poetry",
    "Psychology",
    "Romance",
    "Science",
    "Science Fiction",
    "Self Help",
    "Sports",
    "Thriller",
    "Travel",
    "Young Adult",
    "More genres"
]

const quotesThemes = [
    "Best quotes",
    "Love quotes",
    "Inspirational quotes",
    "Funny quotes",
    "Motivational quotes",
    "Life quotes",
    "Friends quotes",
    "Positive quotes",
    "More quotes"
]

const awardsCategories = [
    "2025",
    "Fiction",
    "Historical Fiction",
    "Mystery & Thriller",
    "Romance",
    "Romantasy",
    "Fantasy",
    "Science Fiction",
    "Horror",
    "Debut Novel",
    "Audiobook",
    "Young Adult Fantasy & Sci-Fi",
    "Young Adult Fiction",
    "Nonfiction",
    "Memoir",
    "History & Biography"
];

const parsedAwardsCategories = awardsCategories.map((category) => `Readers' Favorite ${category}`)

const exampleQuote = "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.";
const quoteAuthor = "Albert Einstein";

const CHOICE_AWARDS_IMG_URL = "	https://s.gr-assets.com/assets/award/2025/choice-logo-medium-6959385f85ec60264063ec50544ad514.png";

const NEWS_IMG_URL = "https://images.gr-assets.com/blogs/1766018789p7/3052.jpg";

export const HomeDesktop = () => {
    const dispatch = useAppDispatch();
    const { editionsList, status } = useAppSelector((state: RootState) => state.editions)

    const [discoverBooksList, setDiscoverBooksList] = useState<DiscoverBooksItemProps[]>([]);
    const [discoverBooksMainSuggestion, setDiscoverBooksMainSuggestion] = useState<DiscoverBooksItemProps>({
        img: "",
        id: ""
    });

    useEffect(() => {
        dispatch(editionsActions.getAll());
    }, [dispatch])

    useEffect(() => {
        const parsedDiscoverBooks: DiscoverBooksItemProps[] = editionsList.slice(0, 4).map(edition => ({
            img: edition.cover,
            id: edition._id
        }))
        setDiscoverBooksList(parsedDiscoverBooks)

        if (editionsList[4]) {
            const mainSuggestion = editionsList[4];
            const genresShown = Math.floor(Math.random() * 3) + 1;
            const genres = mainSuggestion.book.relatedGenres.slice(0, genresShown).map(genre => genre.name).join(", ");

            setDiscoverBooksMainSuggestion({
                img: mainSuggestion.cover,
                id: mainSuggestion._id,
                genres
            });
        }
    }, [editionsList])

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-4xl font-semibold">Loading page...</p>
            </div>
        )
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
                                    You're in the right place. Tell us what titles or genres you've enjoyed in the past, and we'll give you surprisingly insightful recommendations.
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

                            <DiscoverBooksList title="Best Books List" list={discoverBooksList} mainSuggestion={discoverBooksMainSuggestion} />
                            <DiscoverBooksList title="Best Books List" list={discoverBooksList} mainSuggestion={discoverBooksMainSuggestion} />
                        </div>

                        <div className="my-[25px] flex flex-col gap-3">
                            <p className="text-lg">Search and browse books</p>

                            <HomeSearchBarDesktop />

                            <LinksListDesktop list={genres} columns={4} className="leading-[1.5]" />
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
                                    <LinksListDesktop list={quotesThemes} className="leading-[1.5]" />
                                </div>
                            </div>
                        </div>

                        <p className="mb-2.5 text-lg">Goodreads Choice Awards: Readers' Favorite Books 2025</p>

                        <div className="flex">
                            <div className="mt-2.5 mr-5 w-[110px]">
                                <img src={CHOICE_AWARDS_IMG_URL} alt="Choice Awards" className="cursor-pointer" />
                            </div>

                            <div className="flex flex-1">
                                <LinksListDesktop list={parsedAwardsCategories} columns={2} className="mb-[0.8em]" />
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

                        <BooksListPreview
                            title="Best Books of the 20th Century"
                            booksCount={6789}
                            votersCount={45678}
                        />

                        <BooksListPreview
                            title="Best for Book Clubs"
                            booksCount={6789}
                            votersCount={45678}
                        />

                        <BooksListPreview
                            title="Best Crime & Mystery Books"
                            booksCount={6789}
                            votersCount={45678}
                        />

                        <p className="my-[18px] text-sm text-[#00635d] cursor-pointer hover:underline">More book lists</p>

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