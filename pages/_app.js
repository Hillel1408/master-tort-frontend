import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NextNprogress color="#009998" height="2" />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
