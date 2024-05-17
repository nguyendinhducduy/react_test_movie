'use client'
import { useState, useEffect } from 'react';
import List from '@/components/list';
import Search from '@/components/search';
import { useMovieStore } from '@/utils/tmdb';
import style from './page.module.scss';
import Container from '@/components/container';
import { useAuthentication } from '@/providers/AuthenticationProvider'
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const { isAuthenticate } = useAuthentication();
  const router = useRouter();

  enum Tab {
    All = 'all',
    Movie = 'movie',
    TV = 'tv'
  }

  const all = useMovieStore((state) => state.all);
  const fetchAll = useMovieStore((state) => state.fetchAll);

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.All);

  useEffect(() => {
    fetchAll(currentTab);
  }, [currentTab, fetchAll]);

  if (!isAuthenticate) {
    router.push('/signin');
  } else {
    return (
      <main>
        <Container>
          <h2 className='c-title1'>MaileHereko</h2>
          <p className="c-text1">
            List of movies and TV Shows, I, <span>Pramod Poudel</span> have watched till date.
            <br />Explore what I have watched and also feel free to make a suggestion. 😉
          </p>
          <Search />
          <div className={style.tab}>
            <ul>
              <li className={currentTab === Tab.All ? style.current : ''} onClick={() => setCurrentTab(Tab.All)}>All</li>
              <li className={currentTab === Tab.Movie ? style.current : ''} onClick={() => setCurrentTab(Tab.Movie)}>Movies</li>
              <li className={currentTab === Tab.TV ? style.current : ''} onClick={() => setCurrentTab(Tab.TV)}>TV Shows</li>
            </ul>
          </div>
          <p className="length"><span>{currentTab}</span>({all.length})</p>
          <List movies={all} search={false} />
        </Container>
      </main >
    );
  }
}

export default Home;