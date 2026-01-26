import { useParams } from "react-router-dom";



export const Genre = () => {
    const { name } = useParams<{ name: string }>();

    return <p className="text-xl">{name}</p>
}