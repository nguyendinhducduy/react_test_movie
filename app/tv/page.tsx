"use client"
import { useEffect } from 'react';
import Category from "@/components/category"
import { useMovieStore } from '@/utils/tmdb';

const MoviePage: React.FC = () => {
    const tv = useMovieStore((state) => state.tv);
    const fetchTV = useMovieStore((state) => state.fetchTV);

    useEffect(() => {
        fetchTV();
    }, [fetchTV]);

    return (
        <Category list={tv} cat={"tv"} />
    );
}

export default MoviePage;
