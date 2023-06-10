import { Box, Grid, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { NextSeo } from "next-seo";

export default function Recommendations() {
  const recommendations = [
    [
      "Använd solkräm med SPF 15 eller högre där kläder inte skyddar. Se anvisningarna på förpackningen.",
      "sunscreen-spf",
      "pre",
    ],
    [
      "Undvik att använda solkräm som enda solskydd.",
      "use-more-than-sunscreen",
      "pre",
    ],
    [
      "Kläder, hatt och solglasögon ger ett mycket bra skydd.",
      "use-clothing",
      "pre",
    ],
    [
      "Det är bra att gradvis vänja huden vid solen, sola dock inte solarium av den anledningen.",
      "get-used-to-the-sun",
      "pre",
    ],
    [
      "Olika plagg skyddar olika bra mot solen. En t-shirt i 100% bomull har en solfaktor på SPF 10 ungefär.",
      "clothing-and-its-spf",
      "pre",
    ],
    [
      "Ta pauser från solen när den är som starkast under dagen.",
      "breaks",
      "during",
    ],
    [
      "Solen är oftast starkare vid en strand med fri horisont, försök därför att vara i skuggan.",
      "shade-at-beaches",
      "during",
    ],
    [
      "Skydda dig mot stark sol även när du till exempel är på sjön, i skidbacken, i trädgården eller på balkongen.",
      "protect-from-strong-sun",
      "during",
    ],

    [
      "Om du bränner dig, låt huden vila helt från solen. Skydda dig med kläder och/eller skugga.",
      "if-burnt",
      "post",
    ],
  ];
  const labels = {
    pre: {
      label: "Innan du solar",
      color: "green.200",
    },
    during: {
      label: "Under tiden du solar",
      color: "red.200",
    },
    post: {
      label: "Efter att ha solat",
      color: "blue.200",
    },
  };
  return (
    <main>
      <NextSeo
        title="Råd och rekommendationer | UV-Kollen"
        description="Här listas vanliga råd och rekkomendationer när det kommer till hudens exponering mot solen. Använd UV-Kollen för att alltid sola säkert."
        canonical="https://www.uvkollen.se/rekommendationer"
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        pt={24}
        pb={12}
      >
        <Box maxWidth="1000px" width="100%" p={5}>
          <Heading
            as="h1"
            textAlign="center"
            fontSize={["4xl", "5xl", "6xl"]}
            letterSpacing="-.05em"
          >
            Råd och rekommendationer
          </Heading>
          <Box display="flex" justifyContent="center" my={4}>
            <Text textAlign="center" maxWidth={500}>
              Denna sida ger tips på hur du bäst skyddar dig när solens strålar
              har ett UV-index typiskt för en svensk sommar.
            </Text>
          </Box>
          <Grid
            templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gridGap="1em"
            gridAutoFlow="dense"
            mt={12}
          >
            {recommendations.map((el) => (
              <Box
                key={el[1]}
                bg="linear-gradient(45deg, var(--chakra-colors-gray-100), #f4f4f4 20%)"
                borderRadius={10}
                borderColor="gray.300"
                borderWidth={1}
                p={6}
              >
                <Box
                  bg={labels[el[2]].color}
                  display="inline"
                  px={2}
                  py={1}
                  fontSize="small"
                  borderRadius={20}
                >
                  {labels[el[2]].label}
                </Box>
                <Text fontWeight="500" fontSize="1.1em" mt={2}>
                  {el[0]}
                </Text>
              </Box>
            ))}
          </Grid>
          <Text textAlign="center" fontSize=".9em" my={8}>
            <i>
              Råd och rekommendationer tagna från{" "}
              <Link
                href="https://www.stralsakerhetsmyndigheten.se/omraden/sol-och-solarier/rad-och-rekommendationer/solrad/"
                rel="noindex nofollow"
              >
                Strålsäkerhetsmyndigheten
              </Link>
              .
            </i>
          </Text>
        </Box>
      </Box>
    </main>
  );
}
