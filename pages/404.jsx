import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Layout from '../components/Layout';
import AuthService from '../services/AuthService';
import stylesNoAccess from '../components/NoAccess/NoAccess.module.scss';

export default function Home() {
    const [isAuth, setIsAuth] = useState('');
    const [dataUser, setDataUser] = useState('');

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
            title={isAuth && '404'}
        >
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
