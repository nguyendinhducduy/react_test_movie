import style from './list.module.scss';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ListItem } from '@/utils/interface';
import { API } from '@/utils/api';

interface Props {
    movies: ListItem[];
    search: boolean;
}

const List: React.FC<Props> = ({ movies, search }) => {
    const [watchedList, setWatchedList] = useState<number[]>([]);

    useEffect(() => {
        const watchedListFromStorage = localStorage.getItem('watchedList');
        if (watchedListFromStorage) {
            setWatchedList(JSON.parse(watchedListFromStorage));
        }
    }, []);

    return (
        <>
            <ul className={style.list}>
                {movies.length > 0 && movies.map((movie) => (
                    <li className={style.list__item} key={movie.id}>
                        <Link href={`/${movie.media_type}/${movie.id}`}>
                            {movie.poster_path ? (
                                <figure className={style.list__img}>
                                    <Image
                                        src={API.POSTER_PATH(movie.poster_path)}
                                        alt={movie.title || movie.name}
                                        priority
                                        fill={true}
                                        sizes=" 266px, 100vw"
                                    />
                                </figure>
                            ) : (null)}
                            <h3 className={style.list__title}>
                                {movie.title || movie.name}
                            </h3>
                            {movie.vote_average !== undefined ? (<p className={style.list__start}>{movie.vote_average.toFixed(1)}</p>) : (null)}
                            {search === true ? (
                                watchedList.includes(movie.id) ? (
                                    <p className={style.watched}>Already watched</p>
                                ) : (
                                    <p className={style.suggestthis}>Suggest this</p>
                                )
                            ) : (null)}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default List;
