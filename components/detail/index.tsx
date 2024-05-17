import styles from './detail.module.scss';
import Link from 'next/link';
import useWatched from '@/utils/watched';
import Image from 'next/image';
import { API } from '@/utils/api';
import { MovieDetai, TvDetai } from '@/utils/interface'
import Container from '@/components/container';
import { useAuthentication } from '@/providers/AuthenticationProvider'
import { useRouter } from 'next/navigation';


interface Props {
    id: number;
    movies: MovieDetai | TvDetai,
}

const Detail: React.FC<Props> = ({ id, movies }) => {
    const { isAuthenticate } = useAuthentication();
    const router = useRouter();

    useWatched(id);

    const type = (data: MovieDetai | TvDetai): data is MovieDetai => {
        return 'title' in data
    }

    const title: string = type(movies) ? movies.title : movies.name;
    const slug: string = type(movies) ? "movie" : "tv";
    if (!isAuthenticate) {
        router.push('/signin');
    } else {
        return (
            <main className={styles.detail}>
                <Container>
                    {movies.backdrop_path ? (
                        <figure className={styles.detail__mv}>
                            <Image src={API.BACKDROP_PATH(movies.backdrop_path)} alt={title} width={1200} height={480} priority />
                        </figure>
                    ) : (null)}
                    <div className={styles.detail__head}>
                        <div className={styles.detail__inner}>
                            <ul className={styles.detail__breadcrumb}>
                                <li><Link href='/'>MaileHereko</Link></li>
                                <li><Link href={`/${slug}`}>{slug}</Link></li>
                            </ul>
                            <h2 className={styles.detail__title}>{title}</h2>
                        </div>
                    </div>
                    <div className={styles.detail__content}>
                        {movies.poster_path ? (
                            <figure className={styles.detail__img}>
                                <Image src={API.POSTER_PATH(movies.poster_path)} alt={title} width={480} height={720} priority />
                            </figure>
                        ) : (null)}
                        <div className={styles.detail__info}>
                            {movies.tagline !== "" ? (
                                <h3 className={styles.detail__subtitle}>{movies.tagline}</h3>
                            ) : (null)}
                            <p className={styles.detail__text}>{movies.overview}</p>
                            <p className={styles.detail__start}>{movies.vote_average ? movies.vote_average.toFixed(1) : 'N/A'}</p>
                            <ul className={type(movies) ? styles.detail__list : styles.detail__list2}>
                                <li>
                                    <p>Type</p>
                                    <p>{type(movies) ? "Movie" : "TV Shows"}</p>
                                </li>
                                {
                                    type(movies) ? (
                                        <>
                                            <li>
                                                <p>Release Date:</p>
                                                <p>{movies.release_date}</p>
                                            </li>
                                            <li>
                                                <p>Run time</p>
                                                <p>{movies.runtime} min</p>
                                            </li>
                                        </>
                                    ) :
                                        <>
                                            <li>
                                                <p>Status</p>
                                                <p>{movies.status}</p>
                                            </li>
                                            <li>
                                                <p>First air date</p>
                                                <p>{movies.first_air_date}</p>
                                            </li>
                                            <li>
                                                <p>Last air date</p>
                                                <p>{movies.last_air_date}</p>
                                            </li>
                                            <li>
                                                <p>No. of Seasons</p>
                                                <p>{movies.number_of_seasons}</p>
                                            </li>
                                            <li>
                                                <p>No. of episodes</p>
                                                <p>{movies.number_of_episodes}</p>
                                            </li>
                                            <li>
                                                <p>Episode run time</p>
                                                <p>{movies.episode_run_time && movies.episode_run_time.length ? movies.episode_run_time : 'N/A'}</p>
                                            </li>
                                        </>
                                }
                                <li>
                                    <p>Genres</p>
                                    <p>{movies.genres ? movies.genres.map((genres) => genres.name).join(', ') : 'N/A'}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </main>
        );
    }
};

export default Detail;


