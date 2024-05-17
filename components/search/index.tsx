
import style from './search.module.scss';
import { useRouter } from 'next/navigation';

const Search: React.FC = () => {
    const router = useRouter();
    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const keyWords = event.currentTarget.value.trim();
            if (keyWords !== '') {
                router.push('/suggest?keyword=' + keyWords);
            }
        }
    };

    return (
        <div className={style.search}>
            <input
                placeholder='Search Movies or TV Shows'
                type="text"
                onKeyDown={handleSearch}
            />
        </div>
    );
};

export default Search;
