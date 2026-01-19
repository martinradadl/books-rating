import type { RootState } from "../../redux/store";
import { useEffect } from "react";
import editionsActions from "../../redux/actions/editions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaQuoteLeft } from "react-icons/fa"
import { BooksCarousel } from "../../components/books-carousel";
import { MdArrowForwardIos } from "react-icons/md";
import { ProfilePic } from "../../components/profile-pic";
import { GooglePlayButton } from "../../components/buttons/google-play-button";
import { HomeAuthContainerMobile } from "../../components/auth/home-auth-mobile";
import { HomeSearchBarMobile } from "../../components/home/search-bar-mobile";
import { LinksListMobile } from "../../components/home/links-list-mobile";


const mainLists = [
    "Fiction book lists",
    "Best audiobooks ever",
    "Best children’s books",
    "Best novels of all time",
    "Romance book lists",
    "See more lists"
]
const genres = [
    "Fiction",
    "Ebook",
    "Comics",
    "Christian",
    "Cookbooks",
    "Children's",
    "Memoir",
    "Young Adult",
    "Nonfiction",
    "More genres"
]
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
    "See more quotes"
]

const MOBILE_HOME_INTRO_IMG = "https://www.goodreads.com/assets/home/homepage_promos/reading_challenge_2026/HomepageMasthead_Mobile@2x.png"
const MOBILE_CHOICE_AWARDS_IMG = "https://s.gr-assets.com/assets/award/2025/signed-out-hp/bottom-placement-mobile-f633ce2277b115cb3cc06838feac9e17.png"

export const HomeMobile = () => {
    const dispatch = useAppDispatch();
    const { editionsList, status } = useAppSelector((state: RootState) => state.editions)

    useEffect(() => {
        dispatch(editionsActions.getAll());
    }, [dispatch])

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-4xl font-semibold">Loading page...</p>
            </div>
        )
    }

    return (
        <div className="max-w-[424px] mx-auto">
            <div className="mx-auto">
                <img src={MOBILE_HOME_INTRO_IMG} alt="intro img" className="cursor-pointer" />

                <HomeAuthContainerMobile />

                <HomeSearchBarMobile />

                <div className="my-6 flex justify-center">
                    <GooglePlayButton />
                </div>

                <BooksCarousel
                    title={<p className="font-semibold mb-2">MOST READ THIS WEEK</p>}
                    editionsList={editionsList}
                    isHome
                />

                <BooksCarousel
                    title={<p className="font-semibold my-2">NEW RELEASES THIS MONTH</p>}
                    editionsList={editionsList}
                    isHome
                />

                <BooksCarousel
                    title={<p className="font-semibold my-2">LISTS</p>}
                    editionsList={editionsList}
                    isHome
                />

                <div className="flex place-content-between w-full cursor-pointer">
                    <div className="flex flex-col">
                        <p className="text-base">Best Books of the 20th Century</p>
                        <p className="text-sm text-gray-400">7,807 books</p>
                    </div>
                    <div className="font-extrabold">
                        <MdArrowForwardIos className="scale-120" size={16} />
                    </div>
                </div>

                <LinksListMobile list={mainLists} className="pt-6" />

                <p className="font-semibold my-2">GENRES</p>

                <LinksListMobile list={genres} />

                <p className="font-semibold my-2">QUOTES</p>

                <div className="flex gap-3 my-4">
                    <ProfilePic isHome />
                    <FaQuoteLeft size={18} />
                    <div className="flex flex-col">
                        <p>Be yourself; everyone else is already taken.</p>
                        <p>Oscar Wilde</p>
                    </div>
                </div>

                <LinksListMobile list={quotesLists} />

                <p className="uppercase text-sm font-semibold my-[12px]">
                    Goodreads Choice Awards: The Best Books 2025
                </p>

                <img src={MOBILE_CHOICE_AWARDS_IMG} alt="Choice Awards" className="mr-[30px]" />

                <p className="mt-[5px] text-[#00635D] text-sm mb-[24px] cursor-pointer hover:underline w-fit">See the winners</p>
            </div>
        </div>
    )
}