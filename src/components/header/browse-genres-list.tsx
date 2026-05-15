import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { Loading } from "../loading";
import { useNavigate } from "react-router-dom";
import genresActions from "../../redux/actions/genres";


export const BrowseGenresList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { browseGenresList, browseGenresListStatus, browseGenresListRequested } = useAppSelector((state: RootState) => state.genres)


    useEffect(() => {
        if (!browseGenresListRequested) {
            dispatch(genresActions.getAll({ limit: 29, sortBy: "occurrence", isBrowseGenresList: true }))
        }
    }, [dispatch, browseGenresListRequested])

    const genresList = useMemo(() => {
        const list = [...browseGenresList];

        list.push({
            _id: "",
            name: "More Genres",
            slug: "/",
        });

        return list;
    }, [browseGenresList]);

    const handleClickOnItem = (urlPath: string) => {
        console.log("clicked")
        navigate(urlPath)
    }


    if (browseGenresListStatus === "loading") {
        return <Loading />
    }

    return <div className="hidden lg:block w-full px-6 py-4 bg-[#f6f6f6] border-l border-[#D8D8D8] ">
        <p className="uppercase text-xs mb-2 font-bold leading-4">Genres</p>

        <div className="grid grid-cols-3">
            {genresList.map((item) => {
                return (
                    <p className={"text-sm w-fit p-2 hover:underline cursor-pointer"} key={item.name}
                        onClick={() => { handleClickOnItem(`/genres/${item.slug}`) }}>
                        {item.name}
                    </p>
                )
            })}
        </div>

    </div>
}