
"use client"
import { useState, useEffect } from 'react';
import List from '@/components/list';
import style from './suggest.module.scss';
import Loading from '@/components/loading';
import { useMovieStore } from '@/utils/tmdb';
import { useRouter } from 'next/navigation';
import Container from '@/components/container';
import { useAuthentication } from '@/providers/AuthenticationProvider'

interface Props {
    searchParams: {
        keyword: string
    }
}

const SuggestPage: React.FC<Props> = ({ searchParams }) => {
    const { isAuthenticate } = useAuthentication();
    const router = useRouter();

    const { keyword } = searchParams;
    const [text, setText] = useState("");
    const [results, setResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const search = useMovieStore((state) => state.search);
    const fetchSearch = useMovieStore((state) => state.fetchSearch);


    useEffect(() => {
        if (keyword !== undefined) {
            setIsLoading(true)
            setResults(true);
            fetchSearch(keyword);
        }
    }, [fetchSearch, keyword]);

    useEffect(() => {
        setIsLoading(false)
    }, [search]);

    const handleSearch = async () => {
        router.push("/suggest?keyword=" + text);
        setText("");
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    if (!isAuthenticate) {
        router.push('/signin');
    } else {
        return (
            <main>
                <Container>
                    <h2 className='c-title1'>Suggest Page</h2>
                    <p className="c-text1">I will really appericiate it if you take time to suggest me something good to watch.</p>
                    <div className={style.search}>
                        <div className={style.search__inner}>
                            {text !== "" ? (<p className={style.search__placeholder}>Search Movies or TV Shows</p>) : (null)}
                            <input type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyPress} placeholder="Search Movies or TV Shows" />
                        </div>
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    {isLoading ? (
                        <Loading />
                    ) : results && search.length === 0 ? (
                        <div className={style.none}>
                            <h3>Sorry, No results found</h3>
                            <p>There are no movies or TV shows matching your search terms. </p>
                        </div>
                    ) : results && search.length !== 0 ? (
                        <List movies={search} search={true} />
                    ) : (null)}
                </Container>
            </main>
        );
    }
};

export default SuggestPage;


