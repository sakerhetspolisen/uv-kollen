import { Box, Heading, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import cityPaths from "@/assets/cityPaths";
import citiesFull from "@/assets/cityCoord";

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600',
  );
  const { cityPath } = context.query;
  const index = cityPaths.indexOf(decodeURI(cityPath));
  if (index !== -1) {
    const { lat, long, locality } = citiesFull[index];
    const url = `${process.env.API_URL}?lat=${lat}&lng=${long}`;
    const data = await fetch(url);
    const externalUVData = await data.json();
    const maxUVTime = new Date(externalUVData.uv_max_time).getHours() + 1;
    const sunsetTime = new Date(
      externalUVData.sun_info.sun_times.sunset
    ).getHours();
    return {
      props: {
        cityName: locality,
        data: {
          uv: (Math.round(externalUVData.uv * 100) / 100).toString(),
          maxUV: (Math.round(externalUVData.uv_max * 100) / 100).toString(),
          maxUVAt: maxUVTime,
          sunsetAt: sunsetTime,
        }
      },
    };
  }
  return {
    notFound: true,
  };
}

export default function City({ cityName, data }) {
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
          minHeight="100vh"
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
