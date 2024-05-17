import List from '../list';
import Search from '../search';
import Link from 'next/link';
import Container from '../container';
import { useAuthentication } from '@/providers/AuthenticationProvider'
import { useRouter } from 'next/navigation';

interface Props {
    list: [];
    cat: string;
}

const MoviePage: React.FC<Props> = ({ list, cat }) => {
    const { isAuthenticate } = useAuthentication();
    const router = useRouter();
    if (!isAuthenticate) {
        router.push('/signin');
    } else {
        return (
            <main>
                <Container>
                    <Link className='brc' href="/">MaileHereko</Link>
                    <h2 className='c-title1'>{cat == "movie" ? "Movie" : "TV Shows"}</h2>
                    <Search />
                    <>
                        <p className="length">{list.length} items</p>
                        <List movies={list} search={false} />
                    </>
                </Container>
            </main>
        );
    }
}
export default MoviePage;
