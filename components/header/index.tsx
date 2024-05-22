"use client"
import Link from 'next/link';
import style from './header.module.scss';
import Image from 'next/image';
import { useAuthentication } from '@/providers/AuthenticationProvider'
import { useState } from 'react';

const Header: React.FC = () => {
    const { logoutContext, isAuthenticate } = useAuthentication();
    const [menu, setMenu] = useState(false);
    const logout = () => {
        setMenu(!menu)
        logoutContext();
    }

    return (
        <header className={style.header}>
            <div className={style.header__container}>
                <h1 className={style.header__logo}><Link href="/"><Image src="/icon.svg" alt="logo" width={40} height={40} /></Link></h1>
                <div className={`${style.icon00} ${menu ? style.active : ''}`} onClick={() => setMenu(!menu)}><span></span></div>
                <ul className={`${style.header__menu} ${menu ? style.active : ''}`}>
                    {isAuthenticate && <li><button onClick={logout}>Logout</button></li>}
                    <li><Link onClick={() => setMenu(!menu)} href="/movie">Movies</Link></li>
                    <li><Link onClick={() => setMenu(!menu)} href="/tv">TV Shows</Link></li>
                    <li><Link onClick={() => setMenu(!menu)} href="/suggest">Search</Link></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
