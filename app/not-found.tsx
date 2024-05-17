'use client'
import styles from './not-found.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const NotFound: React.FC = () => {
    return (
        <main className={styles.p404}>
            <figure className={styles.p404__img}><Image src="/404.svg" alt="" width={400} height={320} priority={true} /></figure>
            <h2 className={styles.p404__title}>Lost your way?</h2>
            <p className={styles.p404__txt}>
                Oops! This is awkward. You are looking for something that doesn&apos;t actually exist.
            </p>
            <div className={styles.p404__button}><Link href='/'>Go Home</Link></div>
        </main >
    );
}

export default NotFound;
