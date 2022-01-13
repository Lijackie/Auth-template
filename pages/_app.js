import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from '../components/Header';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Header session={session} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
