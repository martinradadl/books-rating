import { useParams } from "react-router-dom";



export const BookList = () => {
    const { name } = useParams<{ name: string }>();

    return <p className="text-xl">{name}</p>
}