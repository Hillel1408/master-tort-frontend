import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Modal.module.scss';

function Modal({ active, setActive, children }) {
    useEffect(() => {
        const closeModal = (e) => {
            if (e.keyCode === 27) {
                setActive(false);
            }
        };
        window.addEventListener('keydown', closeModal);
        return () => window.removeEventListener('keydown', closeModal);
    }, []);
    return (
        <div
            className={
                active
                    ? classNames(styles.popup, styles.popupOpen)
                    : styles.popup
            }
            onClick={() => setActive(false)}
        >
            <div className={styles.popup__body}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={
                        active
                            ? classNames(
                                  styles.popup__content,
                                  styles.popup__contentOpen
                              )
                            : styles.popup__content
                    }
                >
                    <span
                        className={styles.popup__close}
                        onClick={() => setActive(false)}
                    ></span>
                    {children}
                </div>
            </div>
        </div>
    );
}

export { Modal };
