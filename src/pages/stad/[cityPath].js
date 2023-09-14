import { Box, Heading, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import cityPaths from "@/assets/cityPaths";
import citiesFull from "@/assets/cityCoord";
import ForecastWidget from "@/features/ForecastWidget";
import TanningTimeWidget from "@/features/TanningTimeWidget";
import { TanningProvider } from "@/contexts/tanningContext";

const toTwoDecimals = (str) => Number.parseFloat(str).toFixed(2);

const minUntilMidnight = (dateTimeStr) => {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.floor(
    (midnight.getTime() - new Date(dateTimeStr).getTime()) / 1000 / 60
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", "public, s-maxage=3600");
  const { cityPath } = context.query;
  const index = cityPaths.indexOf(decodeURI(cityPath).toLowerCase());
  if (index !== -1) {
    const { lat, long, locality } = citiesFull[index];
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,daily,alerts&units=metric&lang=sv&appid=${process.env.API_KEY}`;
    const data = await fetch(url);
    const uvData = await data.json();
    const rn = new Date();

    const uv = toTwoDecimals(uvData.current.uvi);
    const hourlyUV = [];
    let maxUV = [undefined, 0];
    const start = rn.getMinutes() < 30 ? 0 : 1;
    uvData.hourly.slice(start, 24 - start).forEach((hour) => {
      const uvVal = start
        ? hour.uvi
        : toTwoDecimals((parseFloat(hour.uvi) + parseFloat(uv)) / 2);
      const d = new Date(hour.dt * 1000).toLocaleString("sv", {
        timeZone: "Europe/Berlin",
      });
      const el = [d.split(" ")[1].split(":")[0], uvVal];
      hourlyUV.push(el);
      if (uvVal > maxUV[1]) maxUV = el;
    });

    const sunsetTimeObj = new Date(uvData.current.sunset * 1000);
    const sunsetHasPassed = rn.getTime() > sunsetTimeObj.getTime();
    const sunsetTimeReadable = sunsetTimeObj
      .toLocaleString("sv", {
        timeZone: "Europe/Berlin",
      })
      .split(" ")[1]
      .slice(0, -3);

    return {
      props: {
        cityName: locality,
        cityPath,
        data: {
          uv,
          hourly: hourlyUV,
          maxUV,
          sunset: sunsetTimeReadable,
          sunsetHasPassed,
          swedishDateTimeStr: rn.toLocaleString("sv", {
            timeZone: "Europe/Berlin",
          }),
        },
      },
    };
  }
  return {
    notFound: true,
  };
}

export default function City({ cityName, cityPath, data }) {
  const [uvData, setUVData] = useState({
    uv: 0,
    maxUV: ["", 0],
    hourly: [],
    hourlyCollapsed: [],
    sunset: "",
    sunsetHasPassed: false,
    maxUVIsTomorrow: false,
    swedishDateTimeStr: "",
  });
  const [bg, setBg] = useState("white");
  const [fontColor, setFontColor] = useState("white");

  const bgs = [
    "radial-gradient(circle at center right, #972f52 0%, #142143 60%, #0e0e0e 100%)",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(24,30,82,.9) 60%, #191f4e)",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
    "radial-gradient(circle at center right, #f88b00 0%, rgba(156,172,255,.4) 60%, rgba(156,172,255,.4))",
  ];

  useEffect(() => {
    if (data) {
      setUVData({
        maxUVIsTomorrow:
          parseInt(data.maxUV[0], 10) <
          parseInt(data.swedishDateTimeStr.split(" ")[1].split(":")[0], 10),
        ...data,
      });
      setBg(bgs[parseInt(data.uv.slice(0, 1), 10)]);
      setFontColor(parseInt(data.uv.slice(0, 1), 10) < 2 ? "white" : "black");
    }
  }, [data]);

  return (
    <>
      <NextSeo
        title={`UV-index i ${cityName} just nu | UV-Kollen`}
        description={`På den här sidan ser du allt om hur solens strålar ter sig i ${cityName} idag. Spara UV-Kollen som bokmärke på din mobil och dator för att alltid veta UV-indexet i ${cityName}.`}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `${cityName.toLowerCase()}, uv-index ${cityName.toLowerCase()}, uv-index ${cityName.toLowerCase()}, uv just nu i ${cityName.toLowerCase()}, strålsäkerhet, solkräm, hur varmt ska det vara, sommar`,
          },
        ]}
        canonical={`https://www.uvkollen.se/stad/${cityPath}`}
      />
      <TanningProvider>
        <main>
          <Box
            pt="50px"
            display="flex"
            justifyContent="center"
            minHeight="100vh"
            alignItems="center"
            bg={bg}
          >
            <Box
              maxWidth="1100"
              width="100%"
              m={4}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Box maxWidth="500px" width="100%" height="1px" mb={12} />
              <Heading as="h1" textAlign="center" color={fontColor}>
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
                  <Heading as="span" fontSize={["200px", "300px"]} pl={20}>
                    {uvData.uv.toString().split(".")[0]}
                  </Heading>
                  <Heading
                    as="span"
                    fontSize="50px"
                    fontWeight="900"
                    ml={-2}
                    opacity={0.5}
                  >
                    .{uvData.uv.toString().split(".")[1] || "00"}
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
              <Box mt={12} width="100%" maxWidth="500px">
                <TanningTimeWidget
                  currentUVIndex={uvData.uv}
                  uvHourByHour={uvData.hourly}
                  minUntilMidnight={minUntilMidnight(uvData.swedishDateTimeStr)}
                />
              </Box>
              <Box mt={4}>
                <ForecastWidget
                  maxUV={{
                    time: uvData.maxUV[0],
                    value: uvData.maxUV[1],
                    isTomorrow: uvData.maxUVIsTomorrow,
                  }}
                  sunsetTime={{
                    time: uvData.sunset,
                    hasPassed: uvData.sunsetHasPassed,
                  }}
                  uvHourByHour={uvData.hourly}
                />
              </Box>
              <Box
                maxWidth="500px"
                width="100%"
                bg="rgba(0,0,0,.4)"
                rounded="md"
                mt={4}
                p={6}
                color="white"
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
          <TypeForm
            id="MruPDpam"
            customIcon={
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" viewBox="0 0 16 16"><path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/></svg>'
            }
            buttonColor="white"
          />
        </main>
      </TanningProvider>
    </>
  );
}

const TypeForm = dynamic(
  () => import("@typeform/embed-react").then((mod) => mod.Popover),
  {
    ssr: false,
  }
);
