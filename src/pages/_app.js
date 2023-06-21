/* eslint-disable no-var */
import {
  extendTheme,
  defineStyleConfig,
  ChakraProvider,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { DefaultSeo } from "next-seo";
import React, { useEffect } from "react";
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

const loadAnalytics = async () => {
  const { init } = await import("@/lib/matomoNext.js");
  init({
    url: process.env.NEXT_PUBLIC_MATOMO_URL,
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    jsTrackerFile: "besokare.js",
    phpTrackerFile: "besokare.php",
  });
};

export default function App({ Component, pageProps }) {
  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "sv_SE",
          url: "https://www.uvkollen.se",
          title: "UV-Kollen | Hitta UV-index i alla svenska städer idag",
          description:
            "Med UV-Kollen ser du ett detaljerat UV-index för alla svenska städer i realtid. Det är helt gratis, för alltid. Sidan är skapad av en webbutvecklare med mycket tid över. Kolla in den vetja.",
          siteName: "UV-Kollen",
          images: [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: "UV-Kollen thumbnail",
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
        <link rel="icon" href="/favicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
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
        <meta name="google" content="notranslate" />
      </Head>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
