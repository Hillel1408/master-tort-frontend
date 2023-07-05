import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './OrdersNav.module.scss';

function OrdersNav({ visibleTabs }) {
    const router = useRouter();

    return (
        <div className={styles.navWrapper}>
            <div className={classNames('text', styles.links)}>
                <Link
                    href="orders"
                    className={
                        router.pathname == '/orders' ||
                        router.pathname == '/calendar-orders'
                            ? styles.linksActive
                            : ''
                    }
                >
                    Активные
                </Link>
                <Link
                    href="archive-orders"
                    className={
                        router.pathname == '/archive-orders'
                            ? styles.linksActive
                            : ''
                    }
                >
                    Архив
                </Link>
            </div>
            {visibleTabs && (
                <div className={classNames('text', styles.tabs)}>
                    <Link
                        href="orders"
                        className={
                            router.pathname == '/orders'
                                ? classNames(styles.tabsActive, 'icon-16')
                                : 'icon-16'
                        }
                    >
                        Доска заказов
                    </Link>
                    <Link
                        href="calendar-orders"
                        className={
                            router.pathname == '/calendar-orders'
                                ? classNames(styles.tabsActive, 'icon-9')
                                : 'icon-9'
                        }
                    >
                        Календарь
                    </Link>
                </div>
            )}
        </div>
    );
}

export { OrdersNav };
