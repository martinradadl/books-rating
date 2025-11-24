import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { BookCover } from "./book-cover";
import classNames from "classnames";
import { LabelText } from "./label-text";
import { FaStar } from "react-icons/fa";
import { PillButton } from "./pill-button";
import { format } from 'date-fns';
import type { EditionI } from "../data-structures";
import { useCallback, useRef, useState, type ReactNode } from "react";

type BooksCarouselProps = {
    editionsList: EditionI[];
    showAllLabel: string;
    title: ReactNode;
    isMoreEditions?: boolean;
    isBooksBySameAuthor?: boolean;
};

export const BooksCarousel = ({ showAllLabel, isMoreEditions, isBooksBySameAuthor, editionsList, title }: BooksCarouselProps) => {
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const year = (date: Date) => format(date, 'yyyy')

    const updateScrollState = useCallback(() => {
        const carousel = scrollRef.current;
        if (!carousel) return;

        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        setAtStart(carousel.scrollLeft <= 1);
        setAtEnd(carousel.scrollLeft >= maxScroll - 1);

        const totalPages = Math.ceil(carousel.scrollWidth / carousel.clientWidth);
        setPageCount(totalPages);

        const pageIndex = Math.ceil(carousel.scrollLeft / (carousel.clientWidth + 20));
        setCurrentPage(pageIndex);
    }, []);

    const scrollCarousel = useCallback((direction: "next" | "prev") => {
        const carousel = scrollRef.current;
        if (!carousel) return;

        if (window.innerWidth < 768) return;

        const carouselWidth = carousel.clientWidth + 20;
        const scrollAmount = direction === "next" ? carouselWidth : -carouselWidth;

        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });

        setTimeout(updateScrollState, 350);
    }, [updateScrollState]);

    return (
        <div>
            <div className="flex justify-between items-center mr-8">
                {title}

                <div className="flex space-x-1 z-20">
                    {Array.from({ length: pageCount }).map((_, i) => (
                        <div
                            key={i}
                            className={classNames("h-1 rounded transition-all w-4 bg-gray-300",
                                { "bg-gray-700": i === currentPage })}
                        />
                    ))}
                </div>
            </div>

            <div className="relative max-w-[97.5%]">
                {!atStart && (<button
                    onClick={() => scrollCarousel("prev")}
                    className="absolute top-1/2 -translate-y-1/2 left-0 ml-[-14px] rounded-full p-3 bg-gray-200 shadow-lg shadow-gray-800/60 z-10 hidden md:flex cursor-pointer focus:ring-3 focus:ring-offset-3"
                >
                    <MdArrowBackIosNew size={24} />
                </button>)}

                {!atEnd && (<button
                    onClick={() => scrollCarousel("next")}
                    className="absolute top-1/2 -translate-y-1/2 right-0 mr-[-14px] rounded-full p-3 bg-gray-200 shadow-lg shadow-gray-800/60 z-10 hidden md:flex cursor-pointer focus:ring-3 focus:ring-offset-3"
                >
                    <MdArrowForwardIos size={24} />
                </button>)}

                <div
                    ref={scrollRef}
                    onScroll={updateScrollState}
                    className="flex space-between mt-1 mb-2 py-2 overflow-x-auto md:overflow-hidden scroll-smooth">
                    {editionsList
                        .map((edition, i) => (
                            <div key={i} className={classNames("flex flex-col mr-6 lg:mr-8 min-w-[28%] sm:min-w-[21%] focus:ring-3 focus:ring-offset-3",
                                { 'md:min-w-[21.5%] xl:min-w-[17%]': isMoreEditions },
                                { 'md:min-w-[22.6%] lg:min-w-[17.5%] xl:min-w-[17.8%]': isBooksBySameAuthor && !isMoreEditions },
                                { 'md:min-w-[30%] lg:min-w-[21.5%] xl:min-w-[22%]': !isBooksBySameAuthor && !isMoreEditions },
                            )}>
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
