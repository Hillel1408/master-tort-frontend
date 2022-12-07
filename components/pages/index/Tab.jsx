import classNames from 'classnames';
import styles from '../../../pages/Home.module.scss';

function Tab({ setActive, i, active }) {
    const openTab = (e) => setActive(+e.target.dataset.index);

    return (
        <div
            className={classNames(
                'text',
                styles.tabItem,
                i === active ? styles.tabActive : ''
            )}
            onClick={openTab}
            data-index={i}
        >
            Вариант {i + 1}
        </div>
    );
}

export { Tab };
