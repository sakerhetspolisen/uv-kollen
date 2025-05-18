import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  Button
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { SunIcon } from "@chakra-ui/icons";
import { NextSeo, SocialProfileJsonLd } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import CityAutofill from "@/components/CityAutofill.jsx";
import Footer from "@/components/Footer.jsx";

export default function Home() {
  const siteLinksSearchBoxJSONLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.uvkollen.se",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: "https://www.uvkollen.se/stad/{search_term_string}",
        "query-input": "required name=search_term_string",
      },
    ],
  };
  return (
    <>
      <NextSeo
        title="UV-Kollen | Hitta UV-index i alla svenska städer idag"
        description="Med UV-Kollen ser du ett detaljerat UV-index för alla svenska städer i realtid. Sidan är skapad av en webbutvecklare med mycket tid över. Kolla in den vetja."
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "uv-index, uv just nu, uv-index stockholm, strålsäkerhet, solkräm, hur varmt ska det vara, sommar",
          },
        ]}
        canonical="https://www.uvkollen.se/"
      />
      <SocialProfileJsonLd
        type="Organization"
        name="UV-Kollen"
        url="http://www.uvkollen.se"
        sameAs={["https://twitter.com/uvkollen", "https://mastodon.online/@uv"]}
      />
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(siteLinksSearchBoxJSONLd)}
        </script>
      </Head>
      <main>
        <Box
          width="100%"
          bg={useColorModeValue(
            "linear-gradient(#FDC830, transparent), linear-gradient(to top left, #fff, transparent), linear-gradient(to top right, #ff7800, transparent)",
            "linear-gradient(#536976, transparent), linear-gradient(to top left, #292E49, transparent), linear-gradient(to top right, #292E49, transparent)"
          )}
          backgroundBlendMode="screen"
          position="relative"
          style={{ height: "calc(100vh + 96px)" }}
        >
          <Box
            zIndex={2}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box maxWidth={1300} mx={[4, 4, 6]} mb={20}>
              <Box display="flex" justifyContent="center">
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box bg={useColorModeValue("gray.50", "gray.900")} maxW="2xl">
                      <Text>UV-Kollen 2.0 är på ingång.</Text>
                      <Link href="/nylansering">
                        <Button
                          size={["sm", "md"]}
                          mx={2}
                          my={2}
                          py={5}
                          colorScheme={useColorModeValue("yellow", "yellow")}
                        >
                          Ta en titt
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                  <Heading
                    as="h2"
                    fontSize={["5xl", "5xl", "5xl", "7xl"]}
                    letterSpacing="-.05em"
                    lineHeight={1}
                    textAlign="center"
                  >
                    Vad är UV-index just nu?
                  </Heading>
                  <Text
                    fontSize={["lg", "lg", "xl", "2xl"]}
                    mt={4}
                    fontWeight="500"
                    textAlign="center"
                    maxW={[350, 350, 450, "100%"]}
                    mx="auto"
                  >
                    Skriv in en plats så tar UV-Kollen reda på UV-indexet på den
                    platsen just nu
                  </Text>
                  <Box mt={12} display="flex" justifyContent="center">
                    <Box maxWidth={600} width="100%">
                      <HomeForm />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            position="absolute"
            bottom={0}
            width="100%"
            transform={["scaleY(0.4)", "scaleY(0.5)", "scaleY(0.7)", "none"]}
            transformOrigin="bottom"
          >
            <svg
              width="100%"
              height="96"
              viewBox="0 0 100 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              fill={useColorModeValue("white", "#1a202c")}
              transform="translateX(-50%)"
              display="relative"
            >
              <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z" />
            </svg>
          </Box>
        </Box>
        <Box px={6} pb={60} display="flex" justifyContent="center">
          <Box maxWidth={900} width="100%">
            <section id="hur-beraknas-uv">
              <Heading as="h2" mb={6} pt={24}>
                Hur beräknas ett UV-index?
              </Heading>
              <Text fontSize="lg" lineHeight="1.8">
                Ultraviolett index, eller <i>UV-index</i> som vi känner till
                det, beräknas utifrån flera faktorer. De viktigaste faktorerna
                är solens höjdvinkel, ozonskiktets tjocklek och mängden
                molntäcke. Ju högre solens elevationsvinkel är, desto mer
                direkta är solens strålar. Detta innebär att mer UV-strålning
                når jordytan. Ozonskiktets tjocklek spelar också en roll för hur
                mycket UV-strålning som når jordytan. Ju tunnare ozonskiktet är,
                desto mer UV-strålning når jordytan. Slutligen påverkar också
                mängden molntäcke mängden UV-strålning som når jordytan. Moln
                kan blockera eller reflektera UV-strålning, vilket kan minska
                den mängd som når jordytan.
              </Text>
              <Text fontSize="lg" mt={4} lineHeight="1.8">
                För att beräkna UV-indexet kombineras dessa faktorer och mäts på
                en skala från 0 till 11+. Ju högre index, desto större är risken
                för hudskador från UV-strålning. Det är viktigt att skydda sig
                mot solens skadliga strålar genom att bära skyddande kläder,
                använda solkräm och söka skugga under de timmar då
                UV-strålningen är som högst.
              </Text>
            </section>
            <section id="hur-fungerar-skalan">
              <Heading as="h2" mb={6} pt={24}>
                Hur fungerar skalan?
              </Heading>
              <Text fontSize="lg" lineHeight="1.8">
                UV-skalan är utvecklad av Världshälsoorganisationen (WHO) och
                har blivit erkänd av hälsoorganisationer världen över. Den är
                uppdelad i 5 riskkategorier, där varje kategori har en
                motsvarande färg:
              </Text>
              <List spacing={3} fontSize="lg" mt={3}>
                <ListItem>
                  <ListIcon as={SunIcon} color="green.500" />
                  Låg <b>(0-2)</b>: Grön
                </ListItem>
                <ListItem>
                  <ListIcon as={SunIcon} color="yellow.500" />
                  Måttlig <b>(3-5)</b>: Gul
                </ListItem>
                <ListItem>
                  <ListIcon as={SunIcon} color="orange.500" />
                  Hög <b>(6-7)</b>: Orange
                </ListItem>
                <ListItem>
                  <ListIcon as={SunIcon} color="red.500" />
                  Mycket hög <b>(8-10)</b>: Röd
                </ListItem>
                <ListItem>
                  <ListIcon as={SunIcon} color="purple.500" />
                  Extremt <b>(11+)</b>: Violett
                </ListItem>
              </List>
              <Text fontSize="lg" mt={4} lineHeight="1.8">
                UV-index skalan är linjär, vilket innebär att varje ökning av
                indexvärdet motsvarar en ökning av UV-strålningen med cirka 25
                %. Exempelvis motsvarar ett indexvärde på 6 en UV-strålningsnivå
                som är 25 % högre än en nivå på 5. Ett indexvärde på 8 motsvarar
                en UV-strålningsnivå som är 50 % högre än en nivå på 5. Det
                högsta möjliga indexvärdet är 11+, vilket motsvarar en
                UV-strålningsnivå som är 100 % högre än en nivå på 5. Det är
                viktigt att notera att UV-indexskalan inte är ett direkt mått på
                UV-strålning, utan snarare ett relativt mått på risken för
                hudskador från UV-strålning.
              </Text>
            </section>
            <section id="uv-i-sverige">
              <Heading as="h2" mb={6} pt={24}>
                UV-index i Sverige
              </Heading>
              <Text fontSize="lg" lineHeight="1.8">
                I Sverige har vi normalt sett ett UV-index mellan 4-8 på
                sommaren, och upp till 2 under vintern.
              </Text>
            </section>
          </Box>
        </Box>
      </main>
      <Footer />
    </>
  );
}

function HomeForm() {
  const formRef = useRef();
  return (
    <form ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
      <CityAutofill formRef={formRef} />
    </form>
  );
}
