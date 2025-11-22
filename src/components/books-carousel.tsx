import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { BookCover } from "./book-cover";
import classNames from "classnames";
import { LabelText } from "./label-text";
import { FaStar } from "react-icons/fa";
import { PillButton } from "./pill-button";
import { format } from 'date-fns';
import type { EditionI } from "../data-structures";

type BooksCarouselProps = {
    editionsList: EditionI[];
    showAllLabel: string;
    isMoreEditions?: boolean;
    isBooksBySameAuthor?: boolean;
};

export const BooksCarousel = ({ showAllLabel, isMoreEditions, isBooksBySameAuthor, editionsList }: BooksCarouselProps) => {
    const year = (date: Date) => format(date, 'yyyy')

    return (
        <div className="relative md:overflow-hidden">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 ml-[-14px] rounded-full p-3 bg-gray-200 shadow-lg shadow-gray-800/60 z-10">
                <MdArrowBackIosNew size={24} />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 mr-[-14px] rounded-full p-3 bg-gray-200 shadow-lg shadow-gray-800/60 z-10">
                <MdArrowForwardIos size={24} />
            </div>

            <div className="flex space-between my-6 p-2 overflow-x-auto md:overflow-hidden">
                {editionsList
                    .map((edition, i) => (
                        <div key={i} className={classNames("flex flex-col mr-6 lg:mr-8 min-w-[28%] sm:min-w-[21%] focus:ring-3 focus:ring-offset-3",
                            { 'md:min-w-[21%] xl:min-w-[17%]': isMoreEditions },
                            { 'md:min-w-[22.6%] lg:min-w-[17.5%] xl:min-w-[17.8%]': isBooksBySameAuthor && !isMoreEditions },
                            { 'md:min-w-[30%] lg:min-w-[21%] xl:min-w-[22%]': !isBooksBySameAuthor && !isMoreEditions },
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
                                        <p className="text-lg font-bold">{edition.title}</p>
                                        <p className="text-base">{edition.book.author.name}</p>
                                        <div className="flex">
                                            <FaStar
                                                className='text-yellow-500'
                                                size={20}
                                            />
                                            <p className="text-base font-bold pl-1">4.26</p>
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
    );
};
