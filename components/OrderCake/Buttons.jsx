import { updateKanban } from './helpers';

import styles from './OrderCake.module.scss';

function Buttons({ board, boards, updateStatusOrder, setBoards, item }) {
    const update = (index) => {
        updateKanban(index, board, boards, updateStatusOrder, setBoards, item);
    };

    const prev = () => {
        let index = '';
        switch (board.title) {
            case 'Закупка':
                index = 0;
                break;
            case 'В работе':
                index = 1;
                break;
            case 'Готово':
                index = 2;
                break;
        }
        update(index);
    };

    const next = () => {
        let index = '';
        switch (board.title) {
            case 'Предстоящие':
                index = 1;
                break;
            case 'Закупка':
                index = 2;
                break;
            case 'В работе':
                index = 3;
                break;
        }
        update(index);
    };

    return (
        <div className={styles.contentButton}>
            <button
                title="Назад"
                className="small-text"
                disabled={board.title === 'Предстоящие'}
                onClick={(e) => {
                    e.preventDefault();
                    prev();
                }}
            >
                ←
            </button>
            <button
                title="Вперед"
                className="small-text"
                disabled={board.title === 'Готово'}
                onClick={(e) => {
                    e.preventDefault();
                    next();
                }}
            >
                →
            </button>
        </div>
    );
}

export { Buttons };
