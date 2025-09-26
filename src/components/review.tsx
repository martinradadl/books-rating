import { useState } from "react"
import { formatNumberShort } from "../helpers/utils"
import { LabelText } from "./label-text"
import { StarRating } from "./star-rating"
import { ExpandableButton } from "./expandable-button"
import { MdOutlineComment, MdOutlineThumbUp } from "react-icons/md"
import { Separator } from "./separator"
import { PillButton } from "./pill-button"

export const Review = () => {
    const reviewerName = "John Doe";
    const reviewsCount = 99;
    const followersCount = 6543;
    const rating = 4;
    const date = 'February 19, 2017';
    const review = `YOU. ARE. THE. DEAD. Oh my God. I got the chills so many times toward the end of this book. It completely blew my mind. It managed to surpass my high expectations AND be nothing at all like I expected. Or in Newspeak "Double Plus Good."

Let me preface this with an apology. If I sound stunningly inarticulate at times in this review, I can't help it. My mind is completely fried.

This book is like the dystopian Lord of the Rings, with its richly developed culture and economics, not to mention a fully developed language called Newspeak, or rather more of the anti-language, whose purpose is to limit speech and understanding instead of to enhance and expand it. The world-building is so fully fleshed out and spine-tinglingly terrifying that it's almost as if George travelled to such a place, escaped from it, and then just wrote it all down.

I read Fahrenheit 451 over ten years ago in my early teens. At the time, I remember really wanting to read 1984, although I never managed to get my hands on it. I'm almost glad I didn't. Though I would not have admitted it at the time, it would have gone over my head. Or at the very least, I wouldn't have been able to appreciate it fully.`
    const likesCount = 2585;
    const commentsCount = 161;

    const [showFullReview, setShowFullReview] = useState(false);


    return (
        <div className="flex flex-col lg:flex-row py-2">

            {/* Left Column */}
            <div className="flex lg:flex-col gap-2 lg:w-60">
                <div className="w-16 h-16 rounded-full bg-gray-600" /> {/* Reviewer's profile pic*/}

                <div className="flex flex-col flex-1 lg:flex-none">
                    <p className="font-semibold text-lg cursor-pointer hover:underline">{reviewerName}</p>

                    <div className="flex lg:flex-col gap-0.5">
                        <LabelText text={`${reviewsCount} reviews`} />
                        <div className="lg:hidden">
                            <LabelText text={"·"} />
                        </div>
                        <LabelText text={`${formatNumberShort(followersCount)} followers`} />
                    </div>
                </div>

                <PillButton label="Follow" className="px-8 w-fit h-fit py-3" />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex place-content-between items-center pt-2 lg:pt-0">
                    <StarRating rating={rating} />
                    <LabelText text={date} className="cursor-pointer hover:underline" />
                </div>

                <p className="text-base mb-4">
                    {showFullReview
                        ? review
                        : `${review.slice(0, 440)}...`}
                </p>

                <ExpandableButton
                    label="Show more"
                    isExpanded={showFullReview}
                    setIsExpanded={setShowFullReview}
                />

                <div className="flex">
                    <p className="font-semibold text-gray-600 cursor-pointer hover:underline">{likesCount.toLocaleString()} likes</p>
                    <p className="mx-2"> - </p>
                    <p className="font-semibold text-gray-600 cursor-pointer hover:underline">{commentsCount.toLocaleString()} comments</p>
                </div>

                <div className="flex gap-4">
                    <div className="flex gap-2 group">
                        <MdOutlineThumbUp size={20} />
                        <p className="font-semibold cursor-pointer group-hover:underline">Like</p>
                    </div>

                    <div className="flex gap-2 group">
                        <MdOutlineComment size={20} />
                        <p className="font-semibold cursor-pointer group-hover:underline">Comment</p>
                    </div>

                    <p className="font-semibold cursor-pointer hover:underline">Report</p>
                </div>

                <Separator className="my-4" />
            </div>
        </div>
    )
}