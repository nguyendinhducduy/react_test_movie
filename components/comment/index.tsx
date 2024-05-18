import { useEffect, useState } from 'react';
import styles from './comment.module.scss';
import { useAuthentication } from '@/providers/AuthenticationProvider'

interface Props {
    id: number;
}

const Comment: React.FC<Props> = ({ id }) => {
    const { username } = useAuthentication();

    const [text, setText] = useState("");
    const [comments, setComments] = useState<string[]>([]);

    const handleComment = () => {
        const storedComments = JSON.parse(localStorage.getItem('comments') || '{}');
        storedComments[id] = storedComments[id] || [];
        storedComments[id].unshift(username + " : " + text);
        localStorage.setItem('comments', JSON.stringify(storedComments));
        setComments(storedComments[id]);
        setText("");
    };

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem('comments') || '{}');
        setComments(storedComments[id] || []);
    }, [id]);

    return (
        <div className={styles.comment}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Comment" />
            <button onClick={handleComment}>Post</button>
            <ul className={styles.list}>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default Comment;
