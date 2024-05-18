"use client"
import { useEffect, useState } from 'react';
import Category from "@/components/category"
import { useMovieStore } from '@/utils/tmdb';
import Pagination from '@/components/pagination/';
import { useAuthentication } from '@/providers/AuthenticationProvider'
import { useRouter } from 'next/navigation';
import Container from '@/components/container';

const MoviePage: React.FC = () => {
    const tv = useMovieStore((state) => state.tv);
    const fetchTV = useMovieStore((state) => state.fetchTV);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchTV(1);
    }, [fetchTV]);

    const paginal = (page: number) => {
        fetchTV(page);
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
                <Category list={tv} cat={"tv"} />
                <Pagination totalPages={5} currentPages={currentPage} onPageChange={paginal} />
            </Container>
        </main>
    );
}

export default MoviePage;
