import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './OrdersNav.module.scss';

function OrdersNav({ visibleTabs }) {
    const router = useRouter();
    return (
        <div className={styles.navWrapper}>
            <div className={classNames('text', styles.links)}>
                <Link href="orders">
                    <a
                        className={
                            router.pathname == '/orders' ||
                            router.pathname == '/calendar-orders'
                                ? styles.linksActive
                                : ''
                        }
                    >
                        Активные
                    </a>
                </Link>
                <Link href="archive-orders">
                    <a
                        className={
                            router.pathname == '/archive-orders'
                                ? styles.linksActive
                                : ''
                        }
                    >
                        Архив
                    </a>
                </Link>
            </div>
            {visibleTabs && (
                <div className={classNames('text', styles.tabs)}>
                    <Link href="orders">
                        <a
                            className={
                                router.pathname == '/orders'
                                    ? classNames(styles.tabsActive, 'icon-16')
                                    : 'icon-16'
                            }
                        >
                            Доска заказов
                        </a>
                    </Link>
                    <Link href="calendar-orders">
                        <a
                            className={
                                router.pathname == '/calendar-orders'
                                    ? classNames(styles.tabsActive, 'icon-9')
                                    : 'icon-9'
                            }
                        >
                            Календарь
                        </a>
                    </Link>
                </div>
            )}
        </div>
    );
}

export { OrdersNav };
