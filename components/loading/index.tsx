
import React from 'react';
import Image from 'next/image';

const Loading: React.FC = () => {
    const numberOfItems = 20;
    return (
        <>
            <ul className="loading">
                {[...Array(numberOfItems)].map((_, index) => (
                    <li key={index}>
                        <Image src="/loading.svg" alt="" width={282} height={512} />
                    </li>
                ))}
            </ul>
        </>
    );
}
export default Loading;
