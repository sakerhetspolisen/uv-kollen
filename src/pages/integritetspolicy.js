import {
  Box,
  Heading,
  Link,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { NextSeo } from "next-seo";

export default function PrivacyPolicy() {
  return (
    <main>
      <NextSeo
        title="Integritetspolicy | UV-Kollen"
        description="UV-Kollen tror på öppenhet, integritet och 100% ägande av data. Denna Integritetspolicy förklarar hur hemsidan samlar in och behandlar personuppgifter. Den beskriver också dina rättigheter gentemot UV-Kollen och hur du kan använda dessa."
        canonical="https://www.uvkollen.se/integritetspolicy"
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        pt={24}
        pb={12}
      >
        <Box maxWidth="900px" width="100%" p={5}>
          <Heading as="h1" mb={4} whiteSpace="nowrap">
            Integritetspolicy
          </Heading>
          <Heading as="h2" mb={12} fontSize="2xl">
            UV-Kollen tror på öppenhet, integritet och 100% ägande av data.
          </Heading>
          <Text lineHeight={1.7} mb={8} fontWeight="600">
            Denna Integritetspolicy förklarar hur UV-Kollen samlar in och
            behandlar personuppgifter. Den beskriver också dina rättigheter
            gentemot UV-Kollen och hur du kan använda dessa.
            Personuppgiftsansvarig för behandlingen som anges i denna policy är
            Karl Sellergren, 030127-XXXX, Tornavägen 3A, 223 63 Lund
            (”jag”, “UV-Kollen”).
          </Text>
          <Heading as="h2" mb={4} fontSize="2xl">
            Affiliate-länkar
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            UV-Kollen finansieras av affiliate-länkar via Adtraction AB, därför
            kan det komma att visas knappar på sidan som länkar till annonsörer.
            Genom att klicka på dessa länkar kan information som IP och teknisk
            data samlas in för att mäta konverteringar. Den
            personuppgiftsansvarige för den inhämtningen är Adtraction AB. Om du
            vill läsa mer om Adtraction ABs personuppgiftsbehandling när du
            klickar på en affiliate-länk kan du göra det i{" "}
            <Link
              href="https://adtraction.com/about-us/exhibit-2-data-transfer-agreement"
              rel="noreferrer noopener"
            >
              Dataöverföringsavtalet
            </Link>{" "}
            godkänt av båda parterna (paragraf 5).
          </Text>
          <Heading as="h2" mb={4} fontSize="2xl">
            Insamling av data
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            Jag samlar in data för att utveckla hemsidan på bästa möjliga sätt
            och för att hålla reda på antalet besökare. Du bestämmer över din
            data och kan kontrollera vilken data som samlas in. Vilken data som
            samlas in är listat nedan:
          </Text>
          <Box my={8}>
            <Box
              display="flex"
              alignItems="center"
              bg="gray.100"
              p={2}
              flexWrap={["wrap", "wrap", "nowrap"]}
            >
              <Box minWidth={[null, "370px"]} p={2}>
                <Text fontWeight={600} mb={2}>
                  När du besöker och använder uvkollen.se
                </Text>
                <Text>
                  <i>Ändamål:</i> För att du ska kunna använda tjänsten och
                  utnyttja all funktionalitet.
                </Text>
                <Text>
                  <i>Juridisk grund:</i> Intresseavvägning
                </Text>
              </Box>
              <Box p={2}>
                <Text>
                  UV-Kollen lagrar information på din enhet om vilka val du
                  gjort i tjänsten, exempelvis vilken solkräm du valt, när du
                  öppnade en marknadsundersökning och vilka dina senast sökta
                  städer är. Läs mer under{" "}
                  <i>Data som lagras i din webbläsare</i> nedan.
                </Text>
              </Box>
            </Box>
          </Box>
          <Box my={8}>
            <Box
              display="flex"
              bg="gray.100"
              p={2}
              flexWrap={["wrap", "wrap", "nowrap"]}
            >
              <Box minWidth={[null, "370px"]} p={2}>
                <Text fontWeight={600} mb={2}>
                  När du tackar ja till statistik på uvkollen.se
                </Text>
                <Text>
                  <i>Ändamål:</i> För att utveckla och anpassa tjänsten efter
                  hur den används.
                </Text>
                <Text>
                  <i>Juridisk grund:</i> Samtycke
                </Text>
              </Box>
              <Box p={2}>
                <Text>
                  Jag för statistik över användare på uvkollen.se. Datan som
                  samlas in lagras lokalt och säkert på mina servrar och skickas
                  aldrig till någon utomstående aktör. Det som samlas in är:
                </Text>
                <UnorderedList>
                  <ListItem>2 bytes anonymiserad IP-address</ListItem>
                  <ListItem>Hänvisningsadress (Referrer)</ListItem>
                  <ListItem>Skärmupplösning</ListItem>
                  <ListItem>Länkar som klickas på</ListItem>
                  <ListItem>Besöksland</ListItem>
                  <ListItem>Webbläsarspråk</ListItem>
                  <ListItem>Användaragent</ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </Box>
          <Box my={8}>
            <Box
              display="flex"
              bg="gray.100"
              p={2}
              flexWrap={["wrap", "wrap", "nowrap"]}
            >
              <Box minWidth={[null, "370px"]} p={2}>
                <Text fontWeight={600} mb={2}>
                  När du kontaktar mig rörande UV-Kollen
                </Text>
                <Text>
                  <i>Ändamål:</i> För att tillhandahålla support kring tjänsten.
                </Text>
                <Text>
                  <i>Juridisk grund:</i> Behandlingen är nödvändig för mitt
                  berättigade intresse att kunna kommunicera med dig.
                </Text>
              </Box>
              <Box p={2}>
                <Text>
                  När du kontaktar mig via UV-Kollens kanaler (via
                  uvkollen@sellerg.ren eller sociala medier) kan jag komma att
                  samla in följande data för att kunna besvara ditt ärende:
                </Text>
                <UnorderedList>
                  <ListItem>Namn (och användarnamn om lämpligt)</ListItem>
                  <ListItem>E-postadress</ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </Box>
          <Heading as="h2" mb={4} fontSize="2xl">
            Data som lagras i din webbläsare
          </Heading>
          <Text lineHeight={1.7} mb={4}>
            UV-Kollen använder sig av tre olika typer av webblagring som alla
            fyller olika ändamål. Detta görs till exempel för att spara
            inställningar som du gjort, spara dina senaste sökningar och kunna
            identifiera dig under senare besök. Den första typen som används är
            cookies. En cookie är en liten textfil som kan identifiera dig och
            din webbläsare vid framtida besök. Den innehåller ingen
            personuppgift utan snarare ett id som UV-Kollen känner igen.
          </Text>
          <Text lineHeight={1.7} mb={4}>
            Vidare används sessionslagring och lokal lagring; två typer av
            webblagring som egentligen gör samma sak som en cookie. Skillnaden
            mellan dem är hur längre informationen sparas på din dator. Medan
            sessionslagring tas bort när du stänger din webbläsare sparas en
            cookie enligt ett inbyggt “utgångsdatum”. Den lokala lagringen
            sparas istället tills tjänsten raderar den.
          </Text>
          <Text lineHeight={1.7} mb={8}>
            I denna policy använder jag benämningen “webblagring” som ett
            samlingsnamn för cookies, sessionslagring och lokal lagring. Nedan
            följer en detaljerad tabell över vad som kan komma att lagras i din
            webbläsare till följd av att du besöker uvkollen.se:
          </Text>
          <Heading as="h3" mb={6} fontSize="md">
            Nödvändig webblagring
          </Heading>
          <TableContainer>
            <Table variant="striped" size="sm">
              <Thead>
                <Tr>
                  <Th>Namn</Th>
                  <Th>Syfte</Th>
                  <Th>Utgångsdatum</Th>
                  <Th>Typ</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>chakra-ui-color-mode</Td>
                  <Td>
                    Sparar valet av mörkt eller ljust läge på webbplatsen.
                  </Td>
                  <Td>Persistent</Td>
                  <Td>Lokal lagring</Td>
                </Tr>
                <Tr>
                  <Td>uvKollen.skinType</Td>
                  <Td>Sparar valet av hudtyp.</Td>
                  <Td>Persistent</Td>
                  <Td>Lokal lagring</Td>
                </Tr>
                <Tr>
                  <Td>uvKollen.spf</Td>
                  <Td>Sparar valet av solkräm.</Td>
                  <Td>Session</Td>
                  <Td>Sessionslagring</Td>
                </Tr>
                <Tr>
                  <Td>uvKollen.cookieNoticeShown</Td>
                  <Td>Sparar att popup-fönstret om cookies visats.</Td>
                  <Td>Persistent</Td>
                  <Td>Lokal lagring</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Heading as="h3" mb={6} mt={10} fontSize="md">
            Webblagring för statistik
          </Heading>
          <TableContainer>
            <Table variant="striped" size="sm">
              <Thead>
                <Tr>
                  <Th>Namn</Th>
                  <Th>Syfte</Th>
                  <Th>Utgångsdatum</Th>
                  <Th>Typ</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>_pk_id.#</Td>
                  <Td>
                    Sparar ett fåtal detaljer om dig såsom ett unikt besöks-id.
                  </Td>
                  <Td>13 månader</Td>
                  <Td>Cookie</Td>
                </Tr>
                <Tr>
                  <Td>_pk_sess.#</Td>
                  <Td>Sparar ett unikt sessions-id.</Td>
                  <Td>30 minuter</Td>
                  <Td>Cookie</Td>
                </Tr>
                <Tr>
                  <Td>_pk_ref.#</Td>
                  <Td>
                    Sparar ursprunget till ditt besök, via vilken kanal du
                    besöker UV-Kollen.
                  </Td>
                  <Td>6 månader</Td>
                  <Td>Cookie</Td>
                </Tr>
                <Tr>
                  <Td>mtm_consent</Td>
                  <Td>
                    Sparar samtycket till att få föra statistik på användarens
                    besök.
                  </Td>
                  <Td>Persistent</Td>
                  <Td>Cookie</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Heading as="h2" mb={4} mt={10} fontSize="2xl">
            Vad du kan göra
          </Heading>
          <Text lineHeight={1.7} mb={4}>
            Dataskyddsförordningen (mest känd som GDPR) ger dig starka
            rättigheter när det kommer till hanteringen och behandlingen av dina
            personuppgifter. Dessa rättigheter kommer att förklaras mer
            detaljerat nedan, tillsammans med en förklaring till hur du ska gå
            tillväga för att nyttja dem.
          </Text>
          <Text lineHeight={1.7} mb={8}>
            Det finns några undantag från de rättigheter som beskrivs här. Dessa
            undantag följer av lagstiftningen, och kan till exempel innebära att
            tillgång inte ges till vissa uppgifter på grund av hänsyn till
            andras rättigheter och friheter, eller att vissa personuppgifter
            inte kan raderas eftersom lagstiftning eller andra överväganden
            uppställer krav på lagringstid.
          </Text>
          <Heading as="h3" mb={4} fontSize="xl">
            Du har rätt att få en kopia på de personuppgifter vi behandlar om
            dig (rätt till insyn)
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            I majoriteten av fallen har UV-Kollen inget sätt att identifiera vem
            du är då tjänsten inte behandlar den typen av personuppgifter. Om du
            kontaktar mig för att få ut eventuella personuppgifter behöver du
            identifiera dig och kan komma att behöva svara på frågor kring den
            enhet som du använt tjänsten med. Skicka ett mejl till mig enligt
            anvisningarna längre ner för att skicka en begäran.
          </Text>
          <Heading as="h3" mb={4} fontSize="xl">
            Rätt till rättelse
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            Om det är någon personuppgift som UV-Kollen lagrar som du anser är
            felaktig, har du rätt att få denna ändrad. Precis som din rätt till
            insyn har jag inget sätt att identifiera vem du är, därför kommer du
            att behöva identifiera dig. Skicka ett mejl till mig enligt
            anvisningarna längre ner för att skicka en begäran.
          </Text>
          <Heading as="h3" mb={4} fontSize="xl">
            Rätt till radering
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            Du har som huvudregel rätt till att begära radering av alla
            personuppgifter som vi lagrar om dig. Precis som din rätt till
            rättelse och insyn har jag inget sätt att identifiera vem du är,
            därför kommer du att behöva identifiera dig och kan komma att behöva
            svara på frågor kring den enhet som du använt tjänsten med. Skicka
            ett mejl till mig enligt anvisningarna längre ner för att skicka en
            begäran.
          </Text>
          <Heading as="h3" mb={4} fontSize="xl">
            Rätt att göra invändning
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            Du har rätt att göra invändningar mot hur UV-Kollen behandlar din
            data, men även ge tips på hur jag kan förbättra min praxis. Skicka
            ett mejl till mig enligt anvisningarna längre ner för att skicka en
            begäran.
          </Text>
          <Heading as="h3" mb={4} fontSize="xl">
            Rätt till dataportabilitet
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            Om det är tekniskt möjligt och försvarbart har du under vissa
            omständigheter rätt att begära att din data flyttas från oss till en
            annan verksamhet. Denna rätt gäller endast information som behandlas
            med hjälp av automatiserade metoder samt baserat på ditt samtycke
            eller behandlas som en del av uppfyllandet av ett avtal med dig.
            Rätten till dataportabilitet omfattar endast uppgifter du har lämnat
            till oss, antingen direkt genom till exempel kontaktformulär eller
            genererade genom din användning av våra tjänster. Skicka ett mejl
            till mig enligt anvisningarna längre ner för att skicka en begäran.
          </Text>
          <Heading as="h2" mb={4} fontSize="2xl">
            Ändringar av denna policy
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            Denna integritetspolicy kan komma att ändra sig, men den senaste
            versionen kommer alltid att finnas här.
          </Text>
          <Heading as="h2" mb={4} fontSize="2xl">
            Hur kontaktar jag UV-Kollen för att utöva mina rättigheter?
          </Heading>
          <Text lineHeight={1.7} mb={8}>
            För att utöva dina rättigheter eller om du har frågor om vår
            personuppgiftsbehandling kan du alltid kontakta mig via mejl på{" "}
            <Link href="mailto:uvkollen@kolifink.se">uvkollen@sellerg.ren</Link>
            .
          </Text>
          <Text lineHeight={1.7} mb={8} fontStyle="italic">
            Senast uppdaterad: 2024-01-30
          </Text>
        </Box>
      </Box>
    </main>
  );
}
