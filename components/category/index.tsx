import List from '../list';
import Search from '../search';
import Link from 'next/link';
interface Props {
    list: [];
    cat: string;
}

const MoviePage: React.FC<Props> = ({ list, cat }) => {
    return (
        <>
            <Link className='brc' href="/">Home</Link>
            <h2 className='c-title1'>{cat == "movie" ? "Movie" : "TV Shows"}</h2>
            <Search />
            <p className="length">{list.length} items</p>
            <List movies={list} search={false} />
        </>

    );
}
export default MoviePage;
