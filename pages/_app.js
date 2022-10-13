import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NextNprogress
                color="#009998"
                startPosition="0.3"
                stopDelayMs="200"
                height="3"
            />
            <Component {...pageProps} />;
        </>
    );
}

export default MyApp;
