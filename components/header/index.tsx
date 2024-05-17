import Link from 'next/link';
import style from './header.module.scss';
import Image from 'next/image';

const Header: React.FC = () => {


    return (
        <header className={style.header}>
            <div className={style.header__container}>
                <h1 className={style.header__logo}><Link href="/"><Image src="/icon.svg" alt="logo" width={40} height={40} /></Link></h1>
                <ul className={style.header__menu}>
                    <li><Link href="/movie">Movies</Link></li>
                    <li><Link href="/tv">TV Shows</Link></li>
                    <li><Link href="/suggest">Suggest me</Link></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
