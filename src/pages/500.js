import {
  Box,
  Button,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import errorBgd from "@/assets/errorBgd.jpg";
import SwishIcon from "@/components/SwishIcon";
import swishQR from "@/assets/swish-QR.png";

export default function NotFound() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main>
      <Head>
        <title>UV-Kollen - Vi tar en paus</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Image
          src={errorBgd}
          alt="Ett dramatiskt molntäcke belyst av solens vackra strålar"
          fill
          style={{ objectFit: "cover" }}
        />
        <Box textAlign="center" zIndex={1} color="white" px={4}>
          <Heading mb={8}>Då var det slut på det roliga.</Heading>
          <Box w="100%" maxW="800px">
            <Text fontSize="1.2em" mt={2}>
              UV-Kollen är ett hobbyprojekt som drivs av mig, Karl Sellergren,
              tack vare donationer från dess användare. I dagsläget kan
              UV-Kollen hämta data för som mest 10 000 användare per dag och
              idag har antalet användare överstigit det.
            </Text>
            <Text fontSize="1.2em" fontWeight={700} mt={6} mb={4}>
              Hjälp till att hålla igång projektet genom att donera en liten
              slant!
            </Text>
            <Button
              rightIcon={<SwishIcon />}
              colorScheme="yellow"
              onClick={onOpen}
            >
              Sponsra via
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={30} background="transparent">
          <ModalCloseButton zIndex={1} color="white" />
          <Box position="relative" zIndex={0}>
            <Image
              src={swishQR}
              alt="QR-kod för Swish"
              width={448}
              height={679}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "min-content",
                zIndex: 0,
              }}
            />
          </Box>
        </ModalContent>
      </Modal>
    </main>
  );
}
