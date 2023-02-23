import NextNprogress from 'nextjs-progressbar';
import { setCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDataUser_2 } from '../redux/cakeSlice';
import AuthService from '../services/AuthService';
import { wrapper } from '../redux/store';
import MainLayout from '../components/MainLayout';
import '../styles/globals.scss';
import 'overlayscrollbars/overlayscrollbars.css';

function MyApp({ Component, pageProps }) {
    const [checkAuth, setCheckAuth] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                //проверяем авторизован ли пользователь
                const response = await AuthService.refresh();
                setCookie(null, 'token', response.data.accessToken, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                dispatch(setDataUser_2(response.data.user));
            } catch (e) {
                console.log(e.response?.data?.message);
            } finally {
                setCheckAuth(true);
            }
        };
        if (parseCookies().token) checkAuth();
        else setCheckAuth(true);
    }, []);
    return (
        <>
            <NextNprogress color="#009998" />
            {checkAuth && (
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            )}
        </>
    );
}

export default wrapper.withRedux(MyApp);
