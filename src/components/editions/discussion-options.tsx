import { BsChatRightQuoteFill } from "react-icons/bs";
import { MdArrowForwardIos, MdContactSupport, MdForum } from "react-icons/md"

export const DiscussionOptions = () => {
    const quotesCount = 3223;
    const discussionsCount = 800;
    const questionsCount = 233;

    return (
        <div className="flex flex-col pt-8 md:flex-row">
            <div className="flex p-3 mb-6 items-center focus:ring-2 rounded group cursor-pointer md:flex-1" tabIndex={0}>
                <BsChatRightQuoteFill className="text-yellow-600" size={75} />
                <div className="flex flex-col flex-1 pl-3.5 group-hover:underline">
                    <p className="text-[clamp(36px,4vw,64px)]">{quotesCount}</p>
                    <div className="flex items-center">
                        <p className="text-lg">quotes</p>
                        <MdArrowForwardIos size={16} className="hidden md:block pl-1" />
                    </div>
                </div>
                <MdArrowForwardIos size={24} className="md:hidden" />
            </div>
            <div className="flex p-3 mb-6 items-center focus:ring-2 rounded group cursor-pointer md:flex-1" tabIndex={0}>
                <MdForum className="text-indigo-600" size={100} />
                <div className="flex flex-col flex-1 pl-3.5 group-hover:underline">
                    <p className="text-[clamp(36px,4vw,64px)]">{discussionsCount}</p>
                    <div className="flex items-center">
                        <p className="text-lg">discussions</p>
                        <MdArrowForwardIos size={16} className="hidden md:block pl-1" />
                    </div>
                </div>
                <MdArrowForwardIos size={24} className="md:hidden" />
            </div>
            <div className="flex p-3 mb-6 items-center focus:ring-2 rounded group cursor-pointer md:flex-1" tabIndex={0}>
                <MdContactSupport className="text-rose-600" size={100} />
                <div className="flex flex-col flex-1 pl-3.5 group-hover:underline">
                    <p className="text-[clamp(36px,4vw,64px)]">{questionsCount}</p>
                    <div className="flex items-center">
                        <p className="text-lg">questions</p>
                        <MdArrowForwardIos size={16} className="hidden md:block pl-1" />
                    </div>
                </div>
                <MdArrowForwardIos size={24} className="md:hidden" />
            </div>
        </div>
    )
}