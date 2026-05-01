import { useNavigate } from 'react-router-dom';


export const useNavigateToGenres = () => {
    const navigate = useNavigate();

    const handleNavigateToGenres = (genre?: string) => {
        navigate(genre ? `/genres/${genre}` : "/genres");
    };

    return { handleNavigateToGenres };
};