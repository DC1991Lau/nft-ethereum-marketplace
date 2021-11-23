import type { AppProps } from "next/app";
import Link from "next/link";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav>
        <img src="" alt="" />
        <div>
          <Link href="/">
            <a></a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
