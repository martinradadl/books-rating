import { useNavigate } from 'react-router-dom';

interface useNavigateToProps {
    genre?: string;
}

export const useNavigateTo = (params: useNavigateToProps) => {
    const navigate = useNavigate();

    const handleClickOnGenresPage = () => {
        navigate("/genres");
    };

    const handleClickOnSelectedGenre = () => {
        if (params.genre) {
            navigate(`/genres/${params.genre}`);
        } else {
            console.warn("Genre is not provided");
        }
    };

    return { handleClickOnGenresPage, handleClickOnSelectedGenre };
};