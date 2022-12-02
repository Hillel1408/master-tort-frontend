import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.scss';
import MainLayout from '../components/MainLayout';

import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NextNprogress color="#009998" height="2" />
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </>
    );
}

export default wrapper.withRedux(MyApp);
