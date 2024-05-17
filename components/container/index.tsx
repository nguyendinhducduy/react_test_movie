
import styles from './container.module.scss';

interface Props {
    children: React.ReactNode
}


const Container = ({ children }: Props) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}
export default Container;
