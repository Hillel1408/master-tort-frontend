import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Tooltip.module.scss';

function Tooltip({ children, visiblePopup, style, setVisiblePopup, close }) {
    useEffect(() => {
        if (setVisiblePopup) {
            const clickHandler = (e) => {
                if (e.target === visiblePopup.target) return;
                setVisiblePopup('');
            };
            window.addEventListener('click', clickHandler);
            return () => window.removeEventListener('click', clickHandler);
        }
    }, []);

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            id={style}
            className={classNames(
                styles.tooltiptext,
                visiblePopup && styles.tooltipActive
            )}
        >
            {close && (
                <i className="icon-11" onClick={() => setVisiblePopup('')}></i>
            )}
            {children}
        </div>
    );
}

export { Tooltip };
