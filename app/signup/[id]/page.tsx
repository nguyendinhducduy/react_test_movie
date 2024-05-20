'use client'
import { useEffect } from 'react';
import Detail from '@/components/detail'
import { useMovieStore } from '@/utils/tmdb';
import styles from './styles.module.scss';
import Link from 'next/link';
import { userType } from '@/utils/interface';

interface Props {
    params: {
        id: string;
    };
}

const DetailPage: React.FC<Props> = ({ params }) => {
    const { id } = params;
    const userList = localStorage.getItem('userList');
    if (userList) {
        const userData: Array<userType> = JSON.parse(userList);
        const userExist = userData.some((user) => user.id == parseInt(id));
        if (userExist) {
            const updatedUserData = userData.map((user) => {
                if (user.id === parseInt(id)) {
                    return { ...user, authentication: true };
                }
                return user;
            });
            localStorage.setItem('userList', JSON.stringify(updatedUserData));
            return (
                <main className={styles.p404}>
                    <h2 className={styles.p404__title}>Successful Authentication</h2>
                    <p className={styles.p404__txt}>Successful Authentication</p>
                    <div className={styles.p404__button}><Link href='/signin'>Signin</Link></div>
                </main >
            );
        } else {
            return (
                <main className={styles.p404}>
                    <h2 className={styles.p404__title}>ERROR</h2>
                    <p className={styles.p404__txt}>ERROR</p>
                </main >
            );
        }
    }
};

export default DetailPage;
