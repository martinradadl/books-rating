export const BookListItemSkeleton = () => {
    return (
        <div className="lg:flex border-t border-[#CCCCCC] animate-pulse">
            <div className="p-[5px] w-10">
                <div className="h-4 w-4 bg-gray-300 rounded" />
            </div>

            <div className="flex flex-1 mt-[5px]">
                <div className="mx-[5px]">
                    <div className="w-[50px] h-[75px] bg-gray-300 rounded" />
                </div>

                <div className="flex flex-1">
                    <div className="p-[5px] flex-1">
                        <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />

                        <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />

                        <div className="flex items-center gap-2">
                            <div className="h-4 w-20 bg-gray-200 rounded" />
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>
                    </div>

                    <div className="w-[140px] p-[5px] flex flex-col items-center justify-center">
                        <div className="h-8 w-[110px] bg-gray-300 rounded mb-2" />

                        <div className="h-3 w-20 bg-gray-200 rounded mb-1" />

                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-3 w-3 bg-gray-200 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};