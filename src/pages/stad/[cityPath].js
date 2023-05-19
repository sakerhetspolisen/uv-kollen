import { Box, Heading, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import cityPaths from "@/assets/cityPaths";
import citiesFull from "@/assets/cityCoord";
import UVChart from "@/components/UVChart";

const toTwoDecimals = (str) => Number.parseFloat(str).toFixed(2);

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

    const hourlyUV = [];
    let maxUV = [undefined, 0];
    uvData.hourly.splice(24).forEach((hour) => {
      const d = new Date(hour.dt * 1000).toLocaleString("sv", {
        timeZone: "Europe/Berlin",
      });
      const el = [d.split(" ")[1].split(":")[0], hour.uvi];
      hourlyUV.push(el);
      if (hour.uvi > maxUV[1]) maxUV = el;
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
          uv: toTwoDecimals(uvData.current.uvi),
          hourly: hourlyUV,
          maxUV,
          sunset: sunsetTimeReadable,
          sunsetHasPassed,
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

  const collapseHourlyUV = (dataHourByHour) => {
    const res = [];
    dataHourByHour.forEach((hour, i) => {
      if (i > 0 && res[res.length - 1][1] === hour[1]) {
        if (res[res.length - 1][0].toString().indexOf("-") !== -1) {
          res[res.length - 1][0] = `${res[res.length - 1][0].split("-")[0]}-${
            hour[0]
          }`;
        } else {
          res[res.length - 1][0] = `${res[res.length - 1][0]}-${hour[0]}`;
        }
      } else {
        res.push([...hour]);
      }
    });
    return res;
  };

  useEffect(() => {
    if (data) {
      setUVData({
        hourlyCollapsed: collapseHourlyUV(data.hourly),
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
            m={6}
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
            <Box
              maxWidth="500px"
              width="100%"
              bg="rgba(0,0,0,.4)"
              rounded="md"
              mt={12}
              p={6}
              color="white"
            >
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Text fontWeight="600" fontSize="xl" mb="2">
                  Dygnsprognos
                </Text>
                <Text fontWeight="500">
                  Det högsta UV-indexet under det kommande dygnet kommer att
                  vara{" "}
                  <Text
                    as="span"
                    fontSize="lg"
                    fontWeight="bold"
                    id="maxUV"
                    display="inline-block"
                    bg="rgba(255,255,255,0.2)"
                    px={1}
                  >
                    {uvData.maxUV[1]}
                  </Text>{" "}
                  klockan{" "}
                  <Text
                    as="span"
                    fontSize="lg"
                    fontWeight="bold"
                    id="maxUVAt"
                    display="inline-block"
                    bg="rgba(255,255,255,0.2)"
                    px={1}
                  >
                    {uvData.maxUV[0]}:00
                  </Text>
                  .
                </Text>
                <Text fontWeight="500">
                  Idag {uvData.sunsetHasPassed ? "gick" : "går"} solen ner
                  klockan{" "}
                  <Text
                    as="span"
                    fontSize="lg"
                    fontWeight="bold"
                    display="inline-block"
                    bg="rgba(255,255,255,0.2)"
                    px={1}
                  >
                    {uvData.sunset}
                  </Text>
                  .
                </Text>
              </Box>
            </Box>
            <Box
              maxWidth="500px"
              width="100%"
              bg="rgba(0,0,0,.5)"
              rounded="md"
              mt={4}
              p={6}
              pb={0}
              color="white"
            >
              <UVChart
                hourlyUVData={uvData.hourly}
                maxUVVal={uvData.maxUV[1]}
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
              {uvData.hourlyCollapsed.map((hour) => (
                <Box
                  borderTop="2px solid rgba(255,255,255,.1)"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                >
                  <Text fontWeight="600">
                    {hour[0].replace("-", ":00-")}:00
                  </Text>
                  <Box display="flex" alignItems="center">
                    <Text
                      as="span"
                      fontSize=".7em"
                      fontWeight="600"
                      letterSpacing="-.02em"
                      mr={4}
                      opacity=".8"
                      display={["none", "inline"]}
                    >
                      {
                        [
                          "Låg",
                          "Låg",
                          "Låg",
                          "Medel",
                          "Medel",
                          "Medel",
                          "Hög",
                          "Hög",
                          "Mycket hög",
                          "Mycket hög",
                          "Mycket hög",
                          "Extremt",
                          "Extremt",
                          "Extremt",
                        ][Math.round(hour[1])]
                      }
                    </Text>
                    <Box display="flex" width="150px" alignItems="center">
                      <Box
                        bg="linear-gradient(-90deg, #805AD5, #E53E3E, #DD6B20, #D69E2E, #38A169)"
                        width="90px"
                        height="8px"
                        borderRadius="4px"
                        mr={4}
                      >
                        <Box
                          width="3px"
                          height="15px"
                          borderLeft="2px solid black"
                          mt="-3.75px"
                          ml={90 * (hour[1] / 11)}
                        />
                      </Box>
                      <Box fontWeight="800">
                        <Text as="span">
                          {hour[1].toString().split(".")[0]}
                        </Text>
                        {hour[1].toString().indexOf(".") !== -1 && "."}
                        <Text as="span" fontSize=".8em" opacity=".5">
                          {hour[1].toString().split(".")[1]}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
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
      </main>
    </>
  );
}
