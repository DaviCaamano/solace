import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store";
import "@styles/global.css";
import styles from "@styles/shared/shared.module.css";
import { poppinsFont } from "@fonts/poppins/poppins.font";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${styles.background} ${poppinsFont.className} bg-primary w-full h-full`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </div>
  );
}

export default MyApp;
