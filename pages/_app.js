import NextNprogress from 'nextjs-progressbar';
import { parseCookies } from 'nookies';
import '../styles/globals.scss';
import 'overlayscrollbars/overlayscrollbars.css';
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

MyApp.getInitialProps = wrapper.getInitialAppProps(
    (store) =>
        async ({ ctx, Component }) => {
            try {
                const { token } = parseCookies(ctx);
                if (token) {
                }
            } catch (err) {
                console.log(err);
            }
            return {
                pageProps: Component.getInitialProps
                    ? await Component.getInitialProps({ ...ctx, store })
                    : {},
            };
        }
);

export default wrapper.withRedux(MyApp);
