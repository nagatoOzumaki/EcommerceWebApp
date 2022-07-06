import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import ThemeProvider from '../components/Providers/ThemeProvider';
import StoreProvider from '../components/Providers/StoreProvider';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      {' '}
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default MyApp;
