import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
    const [data, setData] = useState([]);
    let [params] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryString = params.toString();
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/search?${queryString}`);
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [params]);

    return (
        <div>
            {data?.results?.map((recipe) => (
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.image} alt={recipe.title} />
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
