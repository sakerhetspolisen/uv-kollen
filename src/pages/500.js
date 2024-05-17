import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import errorBgd from "@/assets/errorBgd.jpg";
import Link from "next/link";

export default function NotFound() {
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
            <Link
              href="https://www.paypal.com/paypalme/sellergreen"
              rel="noindex nofollow"
              target="_blank"
            >
              <Button leftIcon={<HeartIcon />} colorScheme="yellow">
                Sponsra
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </main>
  );
}

function HeartIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      focusable="false"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
    </svg>
  );
}
