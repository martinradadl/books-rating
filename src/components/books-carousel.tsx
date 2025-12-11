import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { BookCover } from "./book-cover";
import classNames from "classnames";
import { LabelText } from "./label-text";
import { FaStar } from "react-icons/fa";
import { PillButton } from "./pill-button";
import { format } from 'date-fns';
import type { EditionI } from "../data-structures";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type BooksCarouselProps = {
    editionsList: EditionI[];
    showAllLabel: string;
    title: ReactNode;
    isMoreEditions?: boolean;
    isBooksBySameAuthor?: boolean;
};

const isMoreEditionsStyles = 'md:min-w-1/4 md:max-w-1/4 xl:min-w-1/5 xl:max-w-1/5';
const isRelatedBooksStyles = 'md:min-w-1/3 md:max-w-1/3 lg:min-w-1/4 lg:max-w-1/4';
const isBooksBySameAuthorStyles = 'md:min-w-1/4 md:max-w-1/4 lg:min-w-1/5 lg:max-w-1/5';

export const BooksCarousel = ({ showAllLabel, isMoreEditions, isBooksBySameAuthor, editionsList, title }: BooksCarouselProps) => {
    const [numOfPages, setNumOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasOverflow, setHasOverflow] = useState(false);
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);
    const year = (date: Date) => format(date, 'yyyy')


    useEffect(() => {
        const carousel = scrollRef.current;
        if (!carousel) return;
        const totalPages = Math.ceil(carousel.scrollWidth / carousel.clientWidth);
        setNumOfPages(totalPages);
    }, [scrollRef.current?.scrollWidth])

    useEffect(() => {
        const carousel = scrollRef.current;
        if (!carousel) return;

        const checkOverflow = () => {
            const currentHasOverflow = carousel.scrollWidth > carousel.clientWidth;
            if (hasOverflow !== currentHasOverflow)
                setHasOverflow(currentHasOverflow);
            const totalPages = Math.ceil(carousel.scrollWidth / carousel.clientWidth);
            if (totalPages !== numOfPages) {
                setNumOfPages(totalPages);
            }
        };

        checkOverflow();

        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [editionsList, numOfPages, hasOverflow]);


    const scrollCarousel = (direction: "next" | "prev") => {
        const carousel = scrollRef.current;
        if (!carousel) return;

        if (window.innerWidth < 768) return;

        const carouselWidth = carousel.clientWidth;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        if (direction === "next") {
            const nextPos = carousel.scrollLeft + carouselWidth;
            const target = Math.min(nextPos, maxScroll);
            carousel.scrollTo({ left: target, behavior: "smooth" });
            setCurrentPage(prev => prev + 1);
        } else {
            const prevPos = carousel.scrollLeft - carouselWidth;
            const target = Math.max(prevPos, 0);
            carousel.scrollTo({ left: target, behavior: "smooth" });
            setCurrentPage(prev => prev - 1);
        }

    };

    const handleClickOnBook = (id: string) => {
        navigate(`/edition/${id}`)
    }

    return (
        <div>
            <div className="flex justify-between items-center mr-8">
                {title}

                {hasOverflow && <div className="flex space-x-1 z-20">
                    {Array.from({ length: numOfPages }).map((_, i) => (
                        <div
                            key={i}
                            className={classNames("h-1 rounded transition-all w-4 bg-gray-300",
                                { "bg-gray-700": i === currentPage })}
                        />
                    ))}
                </div>}
            </div>

            <div className={classNames("relative",
                { 'max-w-[95%]': isMoreEditions },
                { 'max-w-[98.3%]': isBooksBySameAuthor },
                { 'max-w-[98%]': !isMoreEditions && !isBooksBySameAuthor },
            )}>
                {hasOverflow && !(currentPage === 0) && (<button
                    onClick={() => scrollCarousel("prev")}
                    className="absolute top-1/2 -translate-y-1/2 left-0 ml-[-25px] rounded-full p-3 bg-gray-200 shadow-lg shadow-gray-800/60 z-10 hidden md:flex cursor-pointer focus:ring-3 focus:ring-offset-3"
                >
                    <MdArrowBackIosNew size={24} />
                </button>)}

                {hasOverflow && !(numOfPages - currentPage === 1) && (<button
                    onClick={() => scrollCarousel("next")}
                    className="absolute top-1/2 -translate-y-1/2 right-0 mr-[-14px] rounded-full p-3 bg-gray-200 shadow-lg shadow-gray-800/60 z-10 hidden md:flex cursor-pointer focus:ring-3 focus:ring-offset-3"
                >
                    <MdArrowForwardIos size={24} />
                </button>)}

                <div
                    ref={scrollRef}
                    className="flex space-between mt-1 mb-2 py-2 overflow-x-auto md:overflow-hidden scroll-smooth">
                    {editionsList
                        .map((edition, i) => (
                            <div key={i} className={classNames("flex flex-col pr-6 cursor-pointer lg:pr-8 min-w-1/3 max-w-1/3 sm:min-w-1/4 sm:max-w-1/4 focus:ring-3 focus:ring-offset-3",
                                { [isMoreEditionsStyles]: isMoreEditions },
                                { [isRelatedBooksStyles]: !isBooksBySameAuthor && !isMoreEditions },
                                { [isBooksBySameAuthorStyles]: isBooksBySameAuthor },
                            )}
                                onClick={() => { handleClickOnBook(edition._id) }} tabIndex={0}
                            >
                                <BookCover key={i} className='rounded' image={edition.cover} />

                                <div className="flex flex-col mt-4">
                                    {isMoreEditions ? (
                                        <div>
                                            <LabelText text={edition.format} />
                                            <LabelText text={year(edition.published)} />
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-lg font-semibold leading-5.5 line-clamp-2">{edition.title}</p>
                                            <p className="text-base">{edition.book.author.name}</p>
                                            <div className="flex">
                                                <FaStar
                                                    className='text-yellow-500'
                                                    size={14}
                                                />
                                                <p className="text-sm font-bold pl-1">4.26</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                </div>

                <PillButton label={showAllLabel} className="md:hidden w-full bg-white !text-black border-2 border-black hover:!bg-gray-200" />

                <div className="hidden md:flex gap-2 items-center cursor-pointer group focus:ring-3 focus:ring-offset-3 rounded w-fit" tabIndex={0}>
                    <p className="font-semibold group-hover:underline">
                        {showAllLabel}
                    </p>
                    <MdArrowForwardIos size={16} />
                </div>
            </div>
        </div>
    );
};
