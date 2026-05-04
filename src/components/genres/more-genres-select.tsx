import { useNavigate } from "react-router-dom";
import type { GenreI } from "../../data-structures";

interface MoreGenresSelectProps {
    genresList: GenreI[];
}

export const MoreGenresSelect = ({ genresList }: MoreGenresSelectProps) => {
    const navigate = useNavigate();

    const handleChangeGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(`/genres/${e.target.value}`);
    }

    return (
        <div className="my-3 text-sm">
            <select className="w-full border border-[#D6D0C4] pl-2 pr-8 rounded-[3px] h-8"
                name="genre"
                defaultValue=""
                onChange={handleChangeGenre}
            >
                <option value="" disabled>
                    More Genres
                </option>

                {genresList.map((genre) => (
                    <option key={genre.name} value={genre.slug}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    )
}