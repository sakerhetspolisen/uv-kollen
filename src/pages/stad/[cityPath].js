import { Box, Heading, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import cityPaths from "@/assets/cityPaths";
import citiesFull from "@/assets/cityCoord";

const toTwoDecimals = (str) => Number.parseFloat(str).toFixed(2);

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", "public, s-maxage=3600");
  const { cityPath } = context.query;
  const index = cityPaths.indexOf(decodeURI(cityPath).toLowerCase());
  if (index !== -1) {
    const { lat, long, locality } = citiesFull[index];
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily,alerts&units=metric&lang=sv&appid=${process.env.API_KEY}`;
    const data = await fetch(url);
    const uvData = await data.json();
    return {
      props: {
        cityName: locality,
        data: {
          uv: toTwoDecimals(uvData.current.uvi),
        },
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
    sunsetAt: "",
    sunsetPassed: false,
    maxUVPassed: false,
  });
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
      /* const timesPassed = {
        sunsetPassed: false,
        maxUVPassed: false,
      };
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const utc = localTime + localOffset;
      const offset = 2; // UTC of Stockholm, Sweden is +2
      const se = utc + 3600000 * offset;
      const swedenTimeNow = new Date(se);

      
      if (data.maxUVAt < swedenTimeNow.getHours()) {
        timesPassed.maxUVPassed = true;
      }
      if (parseInt(data.sunsetAt.slice(0, 2), 10) < swedenTimeNow.getHours()) {
        if (
          parseInt(data.sunsetAt.slice(3, 5), 10) < swedenTimeNow.getMinutes()
        ) {
          timesPassed.sunsetPassed = true;
        }
      } */
      setUVData(data);
      setUVDisplay([data.uv.slice(0, 1), data.uv.slice(1)]);
      setBg(bgs[parseInt(data.uv.slice(0, 1), 10)]);
      setFontColor(parseInt(data.uv.slice(0, 1), 10) < 2 ? "white" : "black");
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
            {uvData.maxUV > 0 && (
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
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Text fontWeight="500">
                    Dagens högsta UV-index {uvData.maxUVPassed ? "var" : "är"}{" "}
                    <Text as="span" fontSize="lg" fontWeight="bold" id="maxUV">
                      {uvData.maxUV}
                    </Text>{" "}
                    klockan{" "}
                    <Text
                      as="span"
                      fontSize="lg"
                      fontWeight="bold"
                      id="maxUVAt"
                    >
                      {uvData.maxUVAt}:00
                    </Text>
                    .
                  </Text>
                  <Text fontWeight="500">
                    Solen {uvData.sunsetPassed ? "gick" : "går"} ner klockan{" "}
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      {uvData.sunsetAt}
                    </Text>
                    .
                  </Text>
                </Box>
              </Box>
            )}
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
