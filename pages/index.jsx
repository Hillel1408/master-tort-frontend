import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Layout from '../components/Layout';
import { TabContent } from '../components/pages/index/TabContent';
import AuthService from '../services/AuthService';
import styles from './Home.module.scss';

export default function Home() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');
    const [active, setActive] = useState(0);
    const [items, setItems] = useState([
        {
            data: {
                name: '',
                date: '',
                time: '',
                info: '',
                range: '',
                standWidth: '',
                standLength: '',
                price: '',
                cakeShape: '',
                kindCake: '',
            },
            image: [],
            table: [],
        },
    ]);

    const openTab = (e) => setActive(+e.target.dataset.index);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                setDataUser(response.data.user);
                setIsAuth(true);
            } catch (e) {
                console.log(e.response?.data?.message);
                setIsAuth(false);
            }
        };
        if (localStorage.getItem('token')) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title="Расчет тортов"
        >
            <div className={styles.tab}>
                {items.map((n, i) => (
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
                ))}
                <span
                    className="icon-8"
                    onClick={() => setItems([...items, { ...items[active] }])}
                ></span>
            </div>
            {items.map((n, i) =>
                i === active ? (
                    <TabContent
                        items={items}
                        setItems={setItems}
                        index={active}
                        style={{ display: 'flex' }}
                    />
                ) : (
                    <TabContent
                        items={items}
                        setItems={setItems}
                        index={active}
                        style={{ display: 'none' }}
                    />
                )
            )}
        </Layout>
    );
}
