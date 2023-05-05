import {
  extendTheme,
  defineStyleConfig,
  ChakraProvider,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { DefaultSeo } from "next-seo";
import React from "react";
import { Analytics } from '@vercel/analytics/react';
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
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Analytics />
      </ChakraProvider>
    </>
  );
}
