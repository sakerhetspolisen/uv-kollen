import {
  extendTheme,
  defineStyleConfig,
  ChakraProvider,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { DefaultSeo } from "next-seo";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Header from "@/components/Header.jsx";

const Input = defineStyleConfig({
  baseStyle: {
    field: {
      background: "black",
      color: "gray.700",
    },
  },
  defaultProps: {
    focusBorderColor: "brand.700",
  },
});

const inter = Inter({ subsets: ["latin"], display: "swap" });
const theme = extendTheme({
  fonts: {
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
  },
  components: {
    Input,
  },
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "sv_SE",
          url: "https://uvkollen.se",
          title: "Dagens UV-Index i din stad | UV-Kollen",
          description:
            "Med UV-Kollen ser du ett detaljerat UV-index för alla svenska städer i realtid. Det är helt gratis, för alltid.",
          siteName: "UV-Kollen",
          images: [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: "UV-kollen thumbnail",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "summary",
          site: "@uvkollen",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
        ]}
      />
      <Head>
        <meta name="google" content="notranslate" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f8b500" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1A202C"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Analytics />
      </ChakraProvider>
    </>
  );
}
