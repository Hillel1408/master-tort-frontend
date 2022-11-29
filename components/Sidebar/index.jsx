import Link from 'next/link';
import { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from './NavLink';
import { Modal } from '../Modal';
import styles from './Sidebar.module.scss';

function Sidebar() {
    const [navActive, setNavActive] = useState(false);

    const clickHandler = () => {
        setNavActive(!navActive);
        navActive && document.body.classList.remove('lock');
    };

    const navItems = [
        {
            href: '/',
            name: 'Расчет торта',
            icon: 'icon-2',
        },
        {
            href: '/orders',
            name: 'Заказы',
            icon: 'icon-1',
        },
        {
            href: '/products',
            name: 'Продукты',
            icon: 'icon-3',
        },
        {
            href: '/purchase',
            name: 'Закупка',
            icon: 'icon-4',
        },
        {
            href: '/recipes',
            name: 'Мои рецепты',
            icon: 'icon-5',
        },
        {
            href: '/settings',
            name: 'Настройки',
            icon: 'icon-7',
        },
    ];

    return (
        <aside className={styles.root}>
            <div className={styles.logo}>
                <Link href="/" className={classNames('text', styles.logoLink)}>
                    <img src="/logo.svg" alt="" />
                    Помощник кондитеру
                </Link>
            </div>
            <div className={styles.nav}>
                <div
                    className={
                        navActive
                            ? classNames(styles.navIconActive, styles.navIcon)
                            : styles.navIcon
                    }
                    onClick={() => clickHandler()}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul
                    className={
                        navActive
                            ? classNames(styles.navListActive, styles.navList)
                            : styles.navList
                    }
                >
                    {navItems.map((item) => (
                        <NavLink key={item.href} item={item} />
                    ))}
                </ul>
            </div>
            <Modal
                active={navActive}
                setActive={setNavActive}
                closeIcon={false}
            ></Modal>
        </aside>
    );
}

export { Sidebar };
