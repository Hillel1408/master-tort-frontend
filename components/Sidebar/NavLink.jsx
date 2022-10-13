import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';

function NavLink({ item }) {
    const { href, icon, name } = item;
    const router = useRouter();
    return (
        <li className={styles.navItem}>
            <Link href={href}>
                <a
                    className={
                        router.pathname == `${href}`
                            ? classNames(
                                  'text',
                                  styles.navLink,
                                  styles.navLinkActive
                              )
                            : classNames('text', styles.navLink)
                    }
                >
                    <i className={icon}></i>
                    {name}
                </a>
            </Link>
        </li>
    );
}

export { NavLink };
