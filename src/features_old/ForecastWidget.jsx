import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UVChart from "@/components/UVChart";

const collapseHourlyUVData = (dataHourByHour) => {
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

export default function ForecastWidget({ maxUV, sunsetTime, uvHourByHour }) {
  const [uvHourByHourCollapsed, setUVHourByHourCollapsed] =
    useState(uvHourByHour);

  useEffect(() => {
    setUVHourByHourCollapsed(collapseHourlyUVData(uvHourByHour));
  }, [uvHourByHour]);
  return (
    <Box maxWidth="500px" width="100%" bg="white" rounded="md" color="black">
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        p={6}
        pb={0}
      >
        <Text fontWeight="600" fontSize="xl" mb={10} lineHeight={1}>
          Dygnsprognos
        </Text>
        <Text fontWeight="500">
          Det högsta UV-indexet under det kommande dygnet kommer att vara{" "}
          <Text
            as="span"
            fontSize="lg"
            fontWeight="600"
            id="maxUV"
            display="inline-block"
            bg="yellow.100"
            px={1}
            borderRadius={6}
          >
            {maxUV.value}
          </Text>{" "}
          klockan{" "}
          <Text
            as="span"
            fontSize="lg"
            fontWeight="600"
            id="maxUVAt"
            display="inline-block"
            bg="yellow.100"
            px={1}
            borderRadius={6}
          >
            {maxUV.time}:00{maxUV.isTomorrow && " imorgon"}
          </Text>
          .
        </Text>
        <Text fontWeight="500" lineHeight={1.2}>
          Idag {sunsetTime.hasPassed ? "gick" : "går"} solen ner klockan{" "}
          <Text
            as="span"
            fontSize="lg"
            fontWeight="600"
            display="inline-block"
            bg="yellow.100"
            px={1}
            borderRadius={6}
          >
            {sunsetTime.time}
          </Text>
          .
        </Text>
      </Box>
      <Box pl={2} pr={4}>
        <UVChart hourlyUVData={uvHourByHour} maxUVVal={maxUV.value} />
      </Box>
      <Box px={6} pb={6}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          py={1}
          mb={1}
          fontSize=".7em"
        >
          <Text fontWeight="500">TID</Text>
          <Box display="flex" alignItems="center">
            <Text
              as="span"
              fontWeight="500"
              letterSpacing="-.02em"
              mr={4}
              display={["none", "inline"]}
            >
              NIVÅ
            </Text>
            <Box display="flex" width="130px" alignItems="center">
              <Box width="90px" height="8px" mr={4} />
            </Box>
            <Box fontWeight="600" width="60px" textAlign="right">
              UV
            </Box>
          </Box>
        </Box>
        {uvHourByHourCollapsed.map((hour) => (
          <Box
            key={hour[0]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            mb={1}
            borderRadius={6}
            color="#000"
            bg="gray.100"
          >
            <Text fontWeight="500" whiteSpace="nowrap">
              {hour[0].replace("-", ":00-")}:00
            </Text>
            <Box display="flex" alignItems="center">
              <Text
                as="span"
                fontSize=".7em"
                fontWeight="500"
                letterSpacing="-.02em"
                mr={4}
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
              <Box display="flex" width="130px" alignItems="center">
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
                    borderLeft="1px solid #000"
                    mt="-3.75px"
                    ml={90 * (hour[1] / 11)}
                  />
                </Box>
              </Box>
              <Box fontWeight="600" width={["40px", "60px"]} textAlign="right">
                <Text as="span">
                  {hour[1].toString()}
                  {hour[1].toString().indexOf(".") === -1 && ".00"}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
