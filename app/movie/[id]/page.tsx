'use client'
import { useEffect } from 'react';
import Detail from '@/components/detail'
import { useMovieStore } from '@/utils/tmdb';
interface Props {
    params: {
        id: string;
    };
}

const DetailPage: React.FC<Props> = ({ params }) => {

    const { id } = params;

    const movieDetail = useMovieStore((state) => state.movieDetail);
    const fetchMovieDetail = useMovieStore((state) => state.fetchMovieDetail);

    useEffect(() => {
        fetchMovieDetail(parseInt(id));
    }, [fetchMovieDetail, id]);

    return (
        <>
            {movieDetail && <Detail id={parseInt(id)} movies={movieDetail} />}
        </>
    );
};

export default DetailPage;
