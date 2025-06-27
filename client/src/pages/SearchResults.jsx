import { Container, Typography, Box, Grid, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RecipeGridLayout from "../layouts/RecipeGridLayout";

const SearchResults = () => {
  let [params] = useSearchParams();

  const fetchData = async () => {
    try {
      const queryString = params.toString();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes/search?${queryString}`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["search", params],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });

  return <RecipeGridLayout data={data} title={"Search Results"} />;
};

export default SearchResults;
