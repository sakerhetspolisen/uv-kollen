import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import announcement from "@/assets/announcement.jpg";

export default function Release() {
  return (
    <main>
      <NextSeo
        title="Snart lanseras UV-Kollen 2.0 | UV-Kollen"
        description='UV-Kollen skapades av mig, Karl Sellergren, som ett hobbyprojekt våren 2023. Idén kom efter att SMHI en dag i April i år bestämde sig för att stänga ner tjänsten "UV-index idag".'
        canonical="https://www.uvkollen.se/nylansering"
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        pt={24}
        pb={12}
      >
        <Box maxWidth="900px" width="100%" p={5}>
          <Heading as="h1" mb={6}>
            Bättre upptid, ny design och ny funktionalitet i UV-Kollen 2.0
          </Heading>
          <Text lineHeight={1.7} mb={10} fontWeight="600">
            Sedan lanseringen av UV-Kollen våren 2023 har tjänsten som från
            början byggdes som hobbyprojekt blivit en självklar del i mångas
            vardag. Idag snittar sidan 80 000 besökare varje dag under
            högsäsong, vilket gjort att sidan ofta ligger nere under soliga
            dagar. Men det sätter vi stopp för nu.
          </Text>
          <Image
            src={announcement}
            alt="UV-Kollens nya branding"
            style={{ borderRadius: 10, marginBottom: 40 }}
          />
          <section>
            <Heading as="h2" fontSize="1.5em" mb={6}>
              En helt ny design
            </Heading>
            <Text lineHeight={1.7} mb={6}>
              UV-Kollen 2.0 har fått ett ordentligt ansiktslyft: ny logga, ny
              färgpalett och framför allt ännu enklare gränssnitt. Tjänsten får
              därigenom en mer jordlig och naturnära känsla med varmare färger
              och en blandning mellan formella och avslappnade typsnitt.
            </Text>
          </section>
          <section>
            <Heading as="h2" fontSize="1.5em" mb={6}>
              Stabilare än någonsin
            </Heading>
            <Text lineHeight={1.7} mb={6}>
              En annan viktig förbättring är upptiden och driftsäkerheten.
              UV-Kollen 2.0 bygger på en ny, mer robust teknisk grund som gör
              att tjänsten är mer tillgänglig och pålitlig - särskilt under
              högsäsong när den behövs som mest.
            </Text>
          </section>
          <section>
            <Heading as="h2" fontSize="1.5em" mb={6}>
              Tack för att du använder UV-Kollen
            </Heading>
            <Text lineHeight={1.7} mb={6}>
              Det här projektet har vuxit fram ur både ett intresse för teknik
              och en vilja att bidra till bättre hälsa i solen. Besökarnas
              feedback har och är fortsatt ovärderlig. Så fortsätt jättegärna
              komma med med idéer, synpunkter eller buggrapporter!
            </Text>
          </section>
          <section>
            <Box
              p={4}
              bg={useColorModeValue("gray.200", "gray.900")}
              style={{ borderRadius: 10 }}
            >
              UV-Kollen 2.0 släpps kommande veckan. Håll utkik!
            </Box>
          </section>
        </Box>
      </Box>
    </main>
  );
}
