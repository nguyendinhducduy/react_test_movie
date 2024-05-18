// Pagination.tsx
import styles from './pagevation.module.scss';

interface PaginationProps {
    totalPages: number;
    currentPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPages, onPageChange }) => {
    const items = [];
    let start = currentPages - 2;
    if (start < 1) {
        start = 1;
    }
    const end = currentPages + 2;

    for (let i = start; i <= end; i++) {
        items.push(
            <li key={i} className={i === currentPages ? styles.active : ''} onClick={() => onPageChange(i)}>{i}</li>
        );
    }

    const handleNext = () => {
        onPageChange(currentPages + 1);
    };

    const handlePrev = () => {
        onPageChange(currentPages - 1);
    };


    return <ul className={styles.pagination}>
        {currentPages > 1 && <li onClick={handlePrev}>Prev</li>}
        {items}
        <li onClick={handleNext}>Next</li>
    </ul>;
}

export default Pagination;
