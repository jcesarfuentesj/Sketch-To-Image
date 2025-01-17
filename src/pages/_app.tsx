import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import LogRocket from "logrocket";
import { type AppType } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { env } from "@/env";
import { api } from "@/utils/api";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  useEffect(() => {
    if (env.NEXT_PUBLIC_NODE_ENV === `production` && env.LOGROCKET_APP_ID) {
      LogRocket.init(env.LOGROCKET_APP_ID);
    }
  }, []);
  return (
    <main className={GeistSans.className}>
      <Toaster />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
