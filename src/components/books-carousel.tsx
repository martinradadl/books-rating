import { MdArrowForwardIos } from "react-icons/md";
import { BookCover } from "./book-cover";
import classNames from "classnames";
import { LabelText } from "./label-text";
import { FaStar } from "react-icons/fa";

type BooksCarouselProps = {
    showAllLabel: string;
    isMoreEditions?: boolean;
};

export const BooksCarousel = ({ showAllLabel, isMoreEditions }: BooksCarouselProps) => {
    return (
        <div>
            <div className="flex space-between my-6 p-2 overflow-x-auto md:overflow-hidden">
                {Array(10)
                    .fill(null)
                    .map((_, i) => (
                        <div className={classNames("flex flex-col mr-6 lg:mr-8 min-w-[28%] sm:min-w-[21%] lg:min-w-[21%] focus:ring-3 focus:ring-offset-3",
                            isMoreEditions ? 'md:min-w-[21%] xl:min-w-[17%]' : 'md:min-w-[30%] xl:min-w-[22%]')}>
                            <BookCover key={i} className='rounded' />

                            <div className="flex flex-col mt-4">
                                {isMoreEditions ? (
                                    <div>
                                        <LabelText text="Paperback" />
                                        <LabelText text="Penguin Books" />
                                        <LabelText text="2008" />
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-lg font-bold">To Kill a Mockingbird</p>
                                        <p className="text-base">Harper Lee</p>
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

            <div className="flex gap-2 items-center cursor-pointer group focus:ring-3 focus:ring-offset-3 rounded w-fit" tabIndex={0}>
                <p className="font-semibold group-hover:underline">
                    {showAllLabel}
                </p>
                <MdArrowForwardIos size={16} />
            </div>
        </div>
    );
};
