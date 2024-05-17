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

    const tvDetail = useMovieStore((state) => state.tvDetail);
    const fetchTvDetail = useMovieStore((state) => state.fetchTvDetail);


    useEffect(() => {
        fetchTvDetail(parseInt(id));
    }, [fetchTvDetail, id]);

    return (
        <>
            {tvDetail && <Detail id={parseInt(id)} movies={tvDetail} />}
        </>
    );
};

export default DetailPage;
