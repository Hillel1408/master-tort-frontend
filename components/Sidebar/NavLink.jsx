import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import styles from './Sidebar.module.scss';

function NavLink({ item, setNavActive }) {
    const { href, icon, name } = item;

    const router = useRouter();

    const clickHandler = () => {
        setNavActive(false);
        document.body.classList.remove('lock');
    };

    return (
        <li className={styles.navItem}>
            <Link
                href={href}
                className={
                    router.pathname == `${href}`
                        ? classNames(
                              'text',
                              styles.navLink,
                              styles.navLinkActive
                          )
                        : classNames('text', styles.navLink)
                }
                onClick={() => clickHandler()}
            >
                <i className={icon}></i>
                {name}
            </Link>
        </li>
    );
}

export { NavLink };
