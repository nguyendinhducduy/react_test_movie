"use client"
import { useEffect } from 'react';
import Category from "@/components/category"
import { useMovieStore } from '@/utils/tmdb';


const MoviePage: React.FC = () => {

    const movies = useMovieStore((state) => state.movies);
    const fetchMovies = useMovieStore((state) => state.fetchMovies);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <Category list={movies} cat={"movie"} />
    );
}

export default MoviePage;
