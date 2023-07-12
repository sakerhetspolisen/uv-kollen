import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { TanningContext } from "@/contexts/tanningContext";
import useTimer from "@/hooks/useTimer";

function getTimeToSunburnFromCurrentUV(uv, skinType, spf) {
  // Equation for calculation of number of minutes until 1% of
  // population starts getting sunburned. Equation is as follows:
  // tts = 200/(3 * current_uv_index) * skin_type_factor * min(0.2 * spf, 1)
  //
  // The research by Sánchez-Pérez et al. is limited to the skin types
  // 1-4 and the UV-index 2-11
  const SUNBURN_VALUES = [
    [64, 45, 34, 26, 22, 20, 17, 15, 12, 11],
    [82, 57, 42, 34, 29, 25, 22, 20, 18, 17],
    [117, 79, 59, 46, 39, 35, 30, 25, 23, 21],
    [150, 101, 75, 60, 50, 42, 39, 33, 30, 27],
  ];

  if (uv === 0) return -1;
  if (skinType <= 4 && uv > 1) {
    return (
      SUNBURN_VALUES[skinType - 1][Math.round(uv - 2)] * Math.max(0.2 * spf, 1)
    );
  }
  return Math.floor(
    (200 / (3 * uv)) *
      [2.5, 3, 4, 5, 8, 15][parseInt(skinType, 10) - 1] *
      Math.max(0.2 * spf, 1)
  );
}

function estimateTimeToSunburn(startUV, uvHourByHour, skinType, spf) {
  // TTS for the current hour determines how much of the UV-index-forecast
  // for the upcoming hours should be included in the calculation.
  // If tts0 is less than 90min, only tss0 will be returned.
  //
  // Example: tts0 is calculated to 260min (4h 20min). This results in
  // a calculation of ttsres in the following way:
  // ttsres = 60 + 60*tts1/tts0 + 60*tts2/tts0 + 60*tts3/tts0 + 20*tts4/tts0

  const tts0 = getTimeToSunburnFromCurrentUV(startUV, skinType, spf);
  if (tts0 < 90) return tts0;
  const hoursInTTS0 = Math.round(tts0 / 60);
  if (hoursInTTS0 > 23) return tts0;

  let ttsres = 60;
  for (let i = 1; i <= hoursInTTS0; i += 1) {
    const minInThisHour = i < Math.floor(tts0 / 60) ? 60 : tts0 % 60;
    const ttsn = getTimeToSunburnFromCurrentUV(
      uvHourByHour[i][1],
      skinType,
      spf
    );
    if (ttsn >= 0) {
      ttsres += (minInThisHour / tts0) * ttsn;
    } else {
      ttsres += minInThisHour;
    }
  }

  return Math.floor(ttsres);
}

export default function TanningTimeWidget(props) {
  const { skinType, setSkinType, spf, setSPF } = useContext(TanningContext);

  return (
    <Box maxWidth="500px" width="100%" rounded="md" color="black">
      {skinType ? (
        <MainWidget
          spf={spf}
          skinType={skinType}
          setSPF={setSPF}
          setSkinType={setSkinType}
          {...props}
        />
      ) : (
        <WidgetLanding skinType={skinType} setSkinType={setSkinType} />
      )}
    </Box>
  );
}

function WidgetLanding({ skinType, setSkinType }) {
  return (
    <Box bg="white" borderRadius={6}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        p={6}
      >
        <Box display="flex" alignItems="flex-start">
          <Text fontWeight="600" fontSize="xl" lineHeight={1}>
            Maximal soltid
          </Text>
          <Text
            fontSize=".7em"
            bg="yellow.400"
            color="gray.900"
            px={2}
            borderRadius={10}
            ml={1}
            fontWeight={600}
          >
            BETA
          </Text>
        </Box>
      </Box>
      <Box px={6} pt={2} pb={10} display="flex" flexDirection="column">
        <Text fontSize="lg" fontWeight={500}>
          Börja med att välja din hudtyp:
        </Text>
        <Text mt={4} mb={2} fontSize="sm">
          När jag solar blir jag:
        </Text>
        <SkinTypeSelect onChange={setSkinType} defaultValue={skinType} />
      </Box>
    </Box>
  );
}

function MainWidget({
  currentUVIndex,
  uvHourByHour,
  minUntilMidnight,
  spf,
  skinType,
  setSPF,
  setSkinType,
}) {
  const [ttsIsRestOfDay, setTTSIsRestOfDay] = useState(false);
  const { seconds, minutes, hours, isRunning, pause, resume, setTimer } =
    useTimer({
      onExpire: () => null,
      autoStart: false,
      expiryTimestamp: new Date(),
    });
  const countDownBoxRef = useRef();
  const [countDownBoxRefWidth, setCountDownBoxRefWidth] = useState(0);
  useEffect(() => {
    if (countDownBoxRef.current)
      setCountDownBoxRefWidth(countDownBoxRef.current.offsetWidth);
  }, [countDownBoxRef]);
  const {
    isOpen: aboutDrawerIsOpen,
    onOpen: onAboutDrawerOpen,
    onClose: onAboutDrawerClose,
  } = useDisclosure();
  const readMoreAboutBtn = useRef();

  useEffect(() => {
    const tts = estimateTimeToSunburn(
      currentUVIndex,
      uvHourByHour,
      skinType,
      spf
    );
    if (tts > 480 || tts === -1 || tts > minUntilMidnight) {
      setTTSIsRestOfDay(true);
    } else {
      const expiryDateTime = new Date();
      expiryDateTime.setMinutes(expiryDateTime.getMinutes() + tts);
      setTimer(expiryDateTime, false);
      setTTSIsRestOfDay(false);
    }
  }, [spf, skinType, currentUVIndex, minUntilMidnight]);
  return (
    <Box>
      <Box
        bg={isRunning ? "gray.300" : "white"}
        transition="background 0.3s"
        style={{
          borderTopRightRadius: ".375rem",
          borderTopLeftRadius: ".375rem",
        }}
        position="relative"
      >
        <Box p={6} position="relative" zIndex={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={6}
          >
            <Box mr={4}>
              <Box display="flex" alignItems="flex-start">
                <Text fontWeight="600" fontSize="xl" lineHeight={1}>
                  Maximal soltid
                </Text>
                <Text
                  fontSize=".7em"
                  bg="yellow.400"
                  color="gray.900"
                  px={2}
                  borderRadius={10}
                  ml={1}
                  fontWeight={600}
                >
                  BETA
                </Text>
              </Box>
              <Text lineHeight={1.2} mt={2}>
                Tid som du kan vistas i solen innan solbränna.{" "}
                <Button
                  variant="link"
                  color="gray.600"
                  fontWeight={400}
                  ref={readMoreAboutBtn}
                  onClick={() => onAboutDrawerOpen()}
                >
                  Läs mer
                </Button>
                <Drawer
                  isOpen={aboutDrawerIsOpen}
                  placement="right"
                  onClose={onAboutDrawerClose}
                  finalFocusRef={readMoreAboutBtn}
                  size="md"
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize="2xl">
                      Om beräkningen av
                      <br />
                      maximal soltid
                    </DrawerHeader>

                    <DrawerBody fontSize="lg">
                      <Text fontWeight={500}>
                        UV-Kollen beräknar den maximala tiden som en vuxen
                        människa kan befinna sig i direkt solljus innan
                        brännskador bildas. Algoritmen bygger i huvudsak på
                        forskning från Cartagenas Polytekniska Universitet och
                        Spaniens hälsoministerium.
                      </Text>
                      <Box p={4} bg="orange.100" mt={4} borderRadius={6}>
                        <Text fontWeight={600}>Var vaksam på att:</Text>
                        <UnorderedList>
                          <ListItem>
                            Det är ditt ansvar att bedöma om den maximala
                            soltiden är lämplig för dig.
                          </ListItem>
                          <ListItem>
                            Barn och unga har en lägre maximal soltid.
                          </ListItem>
                          <ListItem>
                            Över tid så finns det ingen säker nivå av oskyddad
                            solexponering, det är den kumulativa exponeringen
                            över tid som gör att du löper störst risk för
                            hudcancer, skador på ögon och immunsystem.
                          </ListItem>
                        </UnorderedList>
                      </Box>
                      <Box p={4} bg="gray.100" my={4} borderRadius={6}>
                        <Text>
                          Hela underlaget för beräkning av maximal soltid finns
                          i PDF-format.
                        </Text>
                        <Link
                          href="/bilagor/Om beräkning av maximal soltid på UV-Kollen.pdf"
                          target="_blank"
                        >
                          <Button
                            colorScheme="yellow"
                            mt={2}
                            leftIcon={<DownloadIcon />}
                          >
                            Ladda ner
                          </Button>
                        </Link>
                      </Box>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Text>
            </Box>

            <Button
              size="sm"
              bg="gray.900"
              color="white"
              _hover={{ bg: "gray.600" }}
              display={ttsIsRestOfDay ? "none" : undefined}
              onClick={() => (isRunning ? pause() : resume())}
              minWidth="110px"
            >
              {isRunning ? "Pausa timer" : "Starta timer"}
            </Button>
          </Box>
          <Box fontSize="lg" fontWeight={500}>
            {ttsIsRestOfDay ? (
              <Text
                fontSize="4xl"
                fontWeight="600"
                display="block"
                lineHeight={1.3}
              >
                Resten av dagen
              </Text>
            ) : (
              <ShowTime hours={hours} mins={minutes} />
            )}
          </Box>
        </Box>
        <Box
          zIndex={0}
          position="absolute"
          top="0"
          left="0"
          height="100%"
          transition="width 0.3s"
          width={isRunning ? countDownBoxRefWidth * (seconds / 60) : "100%"}
          bg="white"
          ref={countDownBoxRef}
          style={{
            borderTopRightRadius: "0.375rem",
            borderTopLeftRadius: "0.375rem",
          }}
        />
      </Box>
      <Box
        p={3}
        bg="gray.200"
        style={{
          borderBottomRightRadius: ".375rem",
          borderBottomLeftRadius: ".375rem",
        }}
      >
        <TanningSettings
          currentSPF={spf}
          currentSkinType={skinType}
          setSPF={setSPF}
          setSkinType={setSkinType}
        />
      </Box>
    </Box>
  );
}

function ShowTime({ hours, mins }) {
  return (
    <Text fontSize="8xl" fontWeight="600" display="block" lineHeight={1.3}>
      {hours !== 0 && (
        <>
          {hours}
          <Text as="span" display="inline-block" fontSize="5xl" mx={2}>
            h
          </Text>
        </>
      )}
      {mins !== 0 && (
        <>
          {mins}
          <Text as="span" display="inline-block" fontSize="5xl" mx={2}>
            min
          </Text>
        </>
      )}
    </Text>
  );
}

function SkinTypeSelect({ onChange, defaultValue }) {
  return (
    <Select
      variant="filled"
      width="100%"
      size="sm"
      bg="orange.100"
      fontWeight={500}
      _hover={{ bg: "yellow.100" }}
      cursor="pointer"
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue || "0"}
    >
      <option disabled value="0">
        Välj...
      </option>
      <option value="1">Alltid röd - aldrig brun</option>
      <option value="2">Alltid röd - ibland brun</option>
      <option value="3">Ibland röd - alltid brun</option>
      <option value="4">Sällan röd - alltid brun</option>
      <option value="5">Mycket sällan röd - alltid brun</option>
      <option value="6">Aldrig röd - alltid brun</option>
    </Select>
  );
}

function TanningSettings({ setSkinType, currentSkinType, currentSPF, setSPF }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="gray.100"
        borderRadius={4}
        p={3}
      >
        <Box p={1} mr={4}>
          <Popover>
            <PopoverTrigger>
              <Box lineHeight="1">
                <Text fontWeight={600}>Hudtyp</Text>
                <Text
                  fontSize="small"
                  whiteSpace="nowrap"
                  mt={1}
                  cursor="pointer"
                >
                  Vad är detta?
                </Text>
              </Box>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight={600}>De sex hudtyperna</PopoverHeader>
              <PopoverBody>
                <Text>
                  Världshälsoorganisationen (WHO) har klassificerat hudtyper i
                  sex kategorier baserat på deras tolerans mot solstrålning. Läs
                  mer hos{" "}
                  <Link
                    href="https://www.stralsakerhetsmyndigheten.se/omraden/sol-och-solarier/rad-och-rekommendationer/solkanslighet/"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    Strålsäkerhetsmyndigheten
                  </Link>
                  .
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Box p={1}>
          <SkinTypeSelect
            onChange={setSkinType}
            defaultValue={currentSkinType}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
        bg="gray.100"
        borderRadius={4}
        p={3}
      >
        <Text fontWeight={600} mr={4} p={1}>
          Solkrämsfaktor
        </Text>
        <Box height="32px" overflow="hidden">
          <Box
            pr={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap"
            flexDirection="row-reverse"
          >
            <Box
              px={3}
              py={1}
              ml={2}
              height="32px"
              bg="orange.100"
              fontWeight={500}
              borderRadius={2}
              color="gray.900"
              cursor="pointer"
              _hover={{ bg: "orange.200" }}
              transition=".3s"
              textAlign="center"
              onClick={() => onOpen()}
            >
              Fler
            </Box>
            {["50", "30", "25", "20", "15", "10"].map((spf) => (
              <Box
                key={spf}
                bg={
                  currentSPF === parseInt(spf, 10) ? "yellow.400" : "orange.100"
                }
                px={2}
                py={1}
                ml={2}
                height="32px"
                fontWeight={500}
                borderRadius={2}
                color={
                  currentSPF === parseInt(spf, 10) ? "gray.700" : "gray.900"
                }
                cursor="pointer"
                _hover={{
                  bg: "yellow.400",
                }}
                transition=".3s"
                onClick={() =>
                  currentSPF === parseInt(spf, 10)
                    ? setSPF(null)
                    : setSPF(parseInt(spf, 10))
                }
                textAlign="center"
              >
                {spf}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Välj solkrämsfaktor (SPF)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid gridTemplateColumns="1fr 1fr" columnGap={2} rowGap={2}>
              {["6", "10", "15", "20", "25", "30", "50"].map((spf) => (
                <GridItem key={`${spf}.modal`}>
                  <Button
                    width="100%"
                    bg={
                      currentSPF === parseInt(spf, 10)
                        ? "yellow.400"
                        : "orange.100"
                    }
                    _hover={{ bg: "yellow.400" }}
                    onClick={() => {
                      if (currentSPF === parseInt(spf, 10)) {
                        setSPF(null);
                      } else {
                        setSPF(parseInt(spf, 10));
                      }
                      onClose();
                    }}
                  >
                    {spf}
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Box>
  );
}
