import { useNavigate } from "react-router-dom"
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import editionsActions from "../redux/actions/editions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { EditionI } from "../data-structures";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { editionsList, status } = useAppSelector((state: RootState) => state.editions)

    useEffect(() => {
        dispatch(editionsActions.getAll());
    }, [dispatch])

    const handleEditionClick = (edition: EditionI) => {
        navigate(`/edition/${edition._id}`)
    }

    if (status === "loading") {
        return <p>Loading editions...</p>
    }

    return <div>
        <p className="text-2xl font-bold mb-2">Welcome to the Home Page</p>
        <p className="text-2xl font-bold">Editions List</p>
        {editionsList.map((edition, i) => (
            <div key={i}>
                <p className="text-2xl w-fit" onClick={() => { handleEditionClick(edition) }}>
                    {edition.title} - {edition.book.author.name}
                </p>
            </div>

        ))}
    </div>
}