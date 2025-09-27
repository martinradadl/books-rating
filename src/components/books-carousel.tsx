import { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

type BooksCarouselProps = {
    showAllLabel: string;
};

export const BooksCarousel = ({ showAllLabel }: BooksCarouselProps) => {
    const [itemsToShow, setItemsToShow] = useState(5);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const calculateItemsToShow = () => {
            if (carouselRef.current) {
                const carouselWidth = carouselRef.current.offsetWidth;

                if (carouselWidth < 400) setItemsToShow(2);
                else if (carouselWidth < 600) setItemsToShow(3);
                else if (carouselWidth < 800) setItemsToShow(4);
                else setItemsToShow(5);
            }
        };

        const resizeObserver = new ResizeObserver(calculateItemsToShow);

        const currentCarouselRef = carouselRef.current;

        if (currentCarouselRef) {
            resizeObserver.observe(currentCarouselRef);
        }

        calculateItemsToShow();

        return () => {
            if (currentCarouselRef) {
                resizeObserver.unobserve(currentCarouselRef);
            }
        };
    }, []);

    return (
        <div ref={carouselRef}>
            <div className="flex gap-4 my-6">
                {Array(itemsToShow)
                    .fill(null)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-600 rounded aspect-[2/3] flex-1"
                        />
                    ))}
            </div>

            <div className="flex gap-2 items-center cursor-pointer group">
                <p className="font-semibold group-hover:underline">
                    {showAllLabel}
                </p>
                <MdArrowForwardIos size={16} />
            </div>
        </div>
    );
};
