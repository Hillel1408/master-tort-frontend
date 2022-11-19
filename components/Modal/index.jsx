import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.scss';

function Modal({ active, setActive, children, closeIcon }) {
    useEffect(() => {
        const closeModalEsc = (e) => {
            if (e.keyCode === 27) {
                closeModal();
            }
        };
        window.addEventListener('keydown', closeModalEsc);
        return () => window.removeEventListener('keydown', closeModalEsc);
    }, []);

    const closeModal = () => {
        setActive(false);
        document.body.classList.remove('lock');
    };

    active ? document.body.classList.add('lock') : '';

    return (
        <div
            className={
                active ? classNames(styles.root, styles.open) : styles.root
            }
            onClick={() => closeModal()}
        >
            <div className={styles.body}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={
                        active
                            ? classNames(styles.content, styles.contentOpen)
                            : styles.content
                    }
                >
                    {closeIcon && (
                        <span
                            className={styles.close}
                            onClick={() => closeModal()}
                        ></span>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}

export { Modal };
