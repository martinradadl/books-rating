import { useNavigate } from 'react-router-dom';


export const useNavigateToGenres = () => {
    const navigate = useNavigate();

    const handleNavigateToGenres = (genre?: string) => {
        navigate(genre ? `/genres/${genre}` : "/genres");
    };

    const handleViewFullContent = (titleSlug: string, genreSlug?: string, isRandomGenre?: boolean) => {
        if (isRandomGenre) {
            navigate(`/genres/${titleSlug}`)
        } else {
            navigate(`/genres/${titleSlug}/${genreSlug}`);
        }
    }

    return { handleNavigateToGenres, handleViewFullContent };
};