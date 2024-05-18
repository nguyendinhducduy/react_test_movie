"use client"
import { useEffect, useState } from 'react';
import Category from "@/components/category"
import { useMovieStore } from '@/utils/tmdb';
import Pagination from '@/components/pagination/';
import { useAuthentication } from '@/providers/AuthenticationProvider'
import { useRouter } from 'next/navigation';
import Container from '@/components/container';

const MoviePage: React.FC = () => {

    const movies = useMovieStore((state) => state.movies);
    const fetchMovies = useMovieStore((state) => state.fetchMovies);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchMovies(1);
    }, [fetchMovies]);


    const paginal = (page: number) => {
        fetchMovies(page);
        setCurrentPage(page);
        document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const { isAuthenticate } = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticate) {
            router.push('/signin');
        }
    }, [isAuthenticate, router]);

    if (!isAuthenticate) {
        return null;
    }



    return (
        <main>
            <Container>
                <Category list={movies} cat={"movie"} />
                <Pagination totalPages={5} currentPages={currentPage} onPageChange={paginal} />
            </Container>
        </main>
    );
}

export default MoviePage;
