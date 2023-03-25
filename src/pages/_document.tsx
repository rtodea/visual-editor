import { Head, Html, Main, NextScript } from "next/document";
import { Fonts } from "@/styles/theme/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Fonts />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
