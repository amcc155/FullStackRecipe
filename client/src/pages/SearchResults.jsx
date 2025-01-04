import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
    const [data, setData] = useState([]);
    let [params] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Convert the URLSearchParams to a query string
                const queryString = params.toString();

                const response = await fetch(`http://localhost:3001/api/recipes/search?${queryString}`);
                const data = await response.json();
                setData(data);
                console.log(data);
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
