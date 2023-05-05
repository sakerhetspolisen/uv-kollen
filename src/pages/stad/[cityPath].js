import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import cityPaths from "@/assets/cityPaths";
import cityFull from "@/assets/cityCoord";

export async function getStaticPaths() {
  const paths = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const p of cityPaths) {
    paths.push({
      params: {
        cityPath: p,
      },
    });
  }
  return {
    paths,
    fallback: true,
  };
}

async function getWeatherData(lat, long) {
  const url = `${process.env.API_URL}?lat=${lat}&lng=${long}`;
  const res = await fetch(url);
  const uvData = await res.json();
  return uvData;
}

export async function getStaticProps(context) {
  const { cityPath } = context.params;
  const { lat, long, locality } =
    cityFull[cityPaths.indexOf(decodeURI(cityPath))];
  const weather = await getWeatherData(lat, long);
  const maxUVTime = new Date(weather.uv_max_time).getHours();
  const sunsetTime = new Date(weather.sun_info.sun_times.sunset).getHours();
  return {
    // Passed to the page component as props
    props: {
      cityName: locality,
      data: {
        uv: (Math.round(weather.uv * 100) / 100).toString(),
        maxUV: (Math.round(weather.uv_max * 100) / 100).toString(),
        maxUVAt: maxUVTime,
        sunsetAt: sunsetTime,
      },
    },
  };
}

export default function City({ cityName, data }) {
  const router = useRouter();
  const [uvData, setUVData] = useState({
    uv: 0,
    maxUV: 0,
    maxUVAt: "",
    sunsetAt: ""
  })
  const [uvDisplay, setUVDisplay] = useState(["", ""]);
  const [bg, setBg] = useState("white");
  const [fontColor, setFontColor] = useState("white");

  const bgs = [
    "radial-gradient(circle at bottom center, #972f52 0%, #142143 60%, #0e0e0e 100%)",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(24,30,82,.9) 60%, #191f4e)",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at bottom center, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
  ];

  useEffect(() => {
    if (data) {
      setUVData(data)
      setUVDisplay([data.uv.slice(0, 1), data.uv.slice(1)]);
      setBg(bgs[parseInt(data.uv.slice(0, 1),10)]);
      setFontColor(parseInt(data.uv.slice(0, 1),10) < 2 ? "white" : "black");
    }
  }, [data]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NextSeo
        title={`UV-index i ${cityName} just nu | UV-Kollen`}
        description={`Spara UV-kollen som bokmärke på din mobil och dator för att alltid veta UV-indexet i ${cityName}.`}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `${cityName.toLowerCase()}, uv-index ${cityName.toLowerCase()}, uv-index ${cityName.toLowerCase()}, uv just nu i ${cityName.toLowerCase()}, strålsäkerhet, solkräm, hur varmt ska det vara, sommar`,
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
        <meta name="theme-color" content="#e47228" />
      </Head>
      <main>
        <Box
          pt="50px"
          display="flex"
          justifyContent="center"
          height="100vh"
          alignItems="center"
          color={fontColor}
          bg={bg}
        >
          <Box
            maxWidth="1100"
            width="100%"
            m={6}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Box maxWidth="500px" width="100%" height="1px" mb={12} />
            <Heading as="h1" textAlign="center">
              <Heading
                as="span"
                display="block"
                fontSize="2xl"
                fontWeight="500"
                opacity={0.7}
              >
                I {cityName} är UV-index
              </Heading>
              <Heading as="span" display="block">
                <Heading as="span" fontSize={["200px", "300px"]} pl={16}>
                  {uvDisplay[0]}
                </Heading>
                <Heading
                  as="span"
                  fontSize="50px"
                  fontWeight="900"
                  ml={-2}
                  opacity={0.5}
                >
                  {uvDisplay[1] || ".00"}
                </Heading>
              </Heading>
              <Heading
                as="span"
                display="block"
                fontSize="2xl"
                fontWeight="500"
                opacity={0.7}
              >
                just nu.
              </Heading>
            </Heading>
            <Box
              maxWidth="500px"
              width="100%"
              bg="rgba(255,255,255,.2)"
              rounded="md"
              mt={12}
              p={6}
            >
              <Text fontWeight="600" fontSize="xl" mb="2">
                Prognos
              </Text>
              <Box display="flex" alignItems="center">
                <Text fontWeight="500">
                  Dagens högsta UV-index är{" "}
                  <Text as="span" fontSize="lg" fontWeight="bold">
                    {uvData.maxUV}
                  </Text>{" "}
                  klockan{" "}
                  <Text as="span" fontSize="lg" fontWeight="bold">
                    {uvData.maxUVAt}:00
                  </Text>
                  .
                </Text>
              </Box>
            </Box>
            <Box
              maxWidth="500px"
              width="100%"
              bg="rgba(255,255,255,.1)"
              rounded="md"
              mt={4}
              p={6}
            >
              <Text fontWeight="600" fontSize="xl" mb="2">
                Tips!
              </Text>
              <Box display="flex" alignItems="center">
                <Text fontWeight="500">
                  Spara den här sidan som bokmärke för att alltid veta
                  UV-indexet i din stad.
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
}
