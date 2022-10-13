import classNames from 'classnames';
import styles from './Sidebar.module.scss';
import { NavLink } from './NavLink';

function Sidebar() {
    const navItems = [
        {
            href: '/orders',
            name: 'Заказы',
            icon: 'icon-1',
        },
        {
            href: '/',
            name: 'Расчет торта',
            icon: 'icon-2',
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
                <a href="/" className={classNames('text', styles.logoLink)}>
                    <img src="logo.svg" alt="" />
                    Помощник кондитеру
                </a>
            </div>
            <div className={styles.nav}>
                <div className={styles.navIcon}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <NavLink key={item.href} item={item} />
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export { Sidebar };
