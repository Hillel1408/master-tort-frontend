import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import classNames from 'classnames';
import Layout from '../components/Layout';
import stylesNoAccess from '../components/NoAccess/NoAccess.module.scss';

export default function Home() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');

    const { dataUser_2 } = useSelector((state) => state.cakes);

    useEffect(() => {
        //проверяем авторизован ли пользователь
        const checkAuth = () => {
            setDataUser(dataUser_2);
            setIsAuth(true);
        };
        if (dataUser_2) checkAuth();
        else setIsAuth(false);
    }, []);

    return (
        <Layout
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            dataUser={dataUser}
            title={isAuth && '404'}
        >
            <Head>
                <title>404</title>
            </Head>
            <h2
                className={classNames(
                    'title',
                    stylesNoAccess.noOrders,
                    stylesNoAccess.title
                )}
            >
                Такой страницы не существует
            </h2>
        </Layout>
    );
}
