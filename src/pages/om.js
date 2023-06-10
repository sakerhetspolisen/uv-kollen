import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { NextSeo } from "next-seo";
import imageOfMe from "@/assets/me.png";

export default function About() {
  return (
    <main>
      <NextSeo
        title="Om tjänsten | UV-Kollen"
        description='UV-Kollen skapades av mig, Karl Sellergren, som ett hobbyprojekt våren 2023. Idén kom efter att SMHI en dag i April i år bestämde sig för att stänga ner tjänsten "UV-index idag".'
        canonical="https://www.uvkollen.se/om"
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        pt={24}
        pb={12}
      >
        <Box maxWidth="900px" width="100%" p={5}>
          <Box display="flex" alignItems="center">
            <Heading as="h1" mb={6} whiteSpace="nowrap">
              Om UV-Kollen
            </Heading>
            <Box position="relative" m={5}>
              <Box
                position="absolute"
                width="100%"
                height="100%"
                zIndex={1}
                bg={useColorModeValue(
                  "linear-gradient(185deg, rgba(255,255,255,0) 80%, #fff 90%, #fff)",
                  "linear-gradient(185deg, rgba(0,0,0,0) 80%, #1A202C 90%, #1A202C)"
                )}
              />
              <Image
                src={imageOfMe}
                alt="Ett målat porträtt"
                width={160}
                height={160}
              />
            </Box>
          </Box>
          <Text lineHeight={1.7} mb={6} fontWeight="600">
            UV-Kollen skapades av mig, Karl Sellergren, som ett hobbyprojekt
            våren 2023. Idén kom efter att SMHI en dag i April i år bestämde sig
            för att stänga ner tjänsten &quot;UV-index idag&quot;. Jag och mina
            kompisar ville åka ner till stranden och jag behövde bestämma mig
            för att ta med solkrämen eller inte. Visst, i iPhones finns ju
            väderappen som visar indexet just nu, men jag saknade en exakt
            prognos för varje stad som dessutom bygger på pålitlig data. Vipps!
            UV-Kollen var fött.
          </Text>
          <Text lineHeight={1.7} mb={6}>
            En kul anekdot är att det i början var <i>vääldigt</i> viktigt att
            UV-Kollen skulle ha decimaler i UV-indexet. En vän till mig
            berättade nämligen att vår gemensamma kompis några år tidigare hade
            spenderat{" "}
            <Text as="span" color="orange">
              $
            </Text>
            <Text as="span" color="orange.800">
              $
            </Text>
            <Text as="span" color="orange.600">
              $
            </Text>{" "}
            på väderappar som hade decimaler med i UV-indexet för att optimera
            sitt solande.
          </Text>
          <Text lineHeight={1.7} mb={6}>
            Idag drivs UV-Kollen helt av mig, fortfarande som ett hobbyprojekt.
            Jag tjänar inga pengar på det utan gör det för att jag själv tycker
            att det behövs. &quot;Hur kan jag hjälpa till?&quot;, undrar du. Jo,
            jag hade uppskattat om du fyller i formuläret som finns om du
            klickar på hjärtbubblan längst ner till höger på förstasidan. Sen
            tycker jag att du ska följa UV-Kollen på sociala medier och om du är
            riktigt snäll donera en liten slant :)
          </Text>
          <Box display="flex" alignItems="center">
            <Text mr={2}>Kärlek!</Text>
            <HeartIcon />
          </Box>
        </Box>
      </Box>
    </main>
  );
}

const HeartIcon = () => (
  <svg
    stroke="#E53E3E"
    fill="#E53E3E"
    strokeWidth="0"
    viewBox="0 0 512 512"
    focusable="false"
    height=".9em"
    width=".9em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
  </svg>
);
