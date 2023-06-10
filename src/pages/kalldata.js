import {
  Box,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { NextSeo } from "next-seo";

export default function About() {
  return (
    <main>
      <NextSeo
        title="Källdata | UV-Kollen"
        description='UV-Kollen skapades av mig, Karl Sellergren, som ett hobbyprojekt våren 2023. Idén kom efter att SMHI en dag i April i år bestämde sig för att stänga ner tjänsten "UV-index idag".'
        canonical="https://www.uvkollen.se/kalldata"
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
            Om datan som visas på UV-Kollen
          </Heading>
          <Text lineHeight={1.7} mb={10} fontWeight="600">
            Den 3e April 2023 slutade SMHI producera dagliga prognoser för
            UV-index, vilket var anledningen till att den här tjänsten skapades.
            UV-Kollen använder istället data från OpenWeather Ltd, ett brittiskt
            företag som säljer detaljerad väderdata optimerad med Machine
            Learning.
          </Text>
          <section>
            <Heading as="h2" fontSize="1.5em" mb={6}>
              Väderprognosmodellen som används
            </Heading>
            <Text lineHeight={1.7} mb={6}>
              Den numeriska väderprognosmodellen (på engelska numerical weather
              prediction model, NWP) som OpenWeather har byggt använder
              grundläggande globala NWPer men förbättrar dessa med
              konvolutionella neurala nätverk och annan machine learning. Datan
              som används i modellen kommer bland annat från:
            </Text>
            <UnorderedList mb={10}>
              <ListItem>Globala NWP modeller</ListItem>
              <ListItem>
                Väderstationer, huvudsakligen från meterologiska institut
              </ListItem>
              <ListItem>METAR stationer</ListItem>
              <ListItem>
                Väderstationer tillhörande företag och &quot;väderamatörer&quot;
              </ListItem>
            </UnorderedList>
          </section>
          <section>
            <Heading as="h2" fontSize="1.5em" mb={6}>
              Information om solstrålning
            </Heading>
            <Text lineHeight={1.7} mb={6}>
              All information angående hur UV-index fungerar, om solstrålning
              och dess effekt på kroppen i största allmänhet är tagen från
              Strålsäkerhetsmyndigheten (SSM). Du kan läsa mer om solen och dess
              effekt på oss på{" "}
              <Link
                href="https://www.stralsakerhetsmyndigheten.se/omraden/sol-och-solarier/"
                rel="noindex nofollow"
              >
                SSMs hemsida
              </Link>
              .
            </Text>
          </section>
        </Box>
      </Box>
    </main>
  );
}
