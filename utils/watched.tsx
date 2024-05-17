import { useEffect } from 'react';

const useWatched = (id: number): void => {
    useEffect(() => {
        const watchedList = localStorage.getItem('watchedList');
        if (watchedList) {
            const watchedIds: number[] = JSON.parse(watchedList);
            if (!watchedIds.includes(id)) {
                localStorage.setItem('watchedList', JSON.stringify([...watchedIds, id]));
            }
        } else {
            localStorage.setItem('watchedList', JSON.stringify([id]));
        }
    }, [id]);
}

export default useWatched;
