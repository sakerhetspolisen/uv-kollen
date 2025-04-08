import { Box, Heading, List, Text } from "@chakra-ui/react";
import { MdWbSunny } from "react-icons/md";
import React from "react";

export default function Page() {
  return (
    <>
      <main>
        <Box
          width="100%"
          bg="linear-gradient(#FDC830, transparent), linear-gradient(to top left, #fff, transparent), linear-gradient(to top right, #ff7800, transparent)"
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
                      {/* <HomeForm /> */}
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
              fill="white"
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
              <List.Root gap={3} fontSize="lg" mt={3} variant="plain">
                <List.Item>
                  <List.Indicator asChild color="green.500">
                    <MdWbSunny />
                  </List.Indicator>
                  Låg <b style={{ marginLeft: 4 }}>(0-2)</b>: Grön
                </List.Item>
                <List.Item>
                  <List.Indicator asChild color="yellow.500">
                    <MdWbSunny />
                  </List.Indicator>
                  Måttlig <b style={{ marginLeft: 4 }}>(3-5)</b>: Gul
                </List.Item>
                <List.Item>
                  <List.Indicator asChild color="orange.500">
                    <MdWbSunny />
                  </List.Indicator>
                  Hög <b style={{ marginLeft: 4 }}>(6-7)</b>: Orange
                </List.Item>
                <List.Item>
                  <List.Indicator asChild color="red.500">
                    <MdWbSunny />
                  </List.Indicator>
                  Mycket hög <b style={{ marginLeft: 4 }}>(8-10)</b>: Röd
                </List.Item>
                <List.Item>
                  <List.Indicator asChild color="purple.500">
                    <MdWbSunny />
                  </List.Indicator>
                  Extremt <b style={{ marginLeft: 4 }}>(11+)</b>: Violett
                </List.Item>
              </List.Root>
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
      {/* <Footer /> */}
    </>
  );
}
