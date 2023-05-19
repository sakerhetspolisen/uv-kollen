import { Box, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import errorBgd from "@/assets/errorBgd.jpg";

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
        <Box textAlign="center" zIndex={1} color="white">
          <Text fontWeight="500" mb={8}>
            500 - Det har skett ett fel på vår sida
          </Text>
          <Heading>Det där skulle ju inte ha skett.</Heading>
          <Text fontSize="1.2em" mt={2}>
            Våra system har fått information om händelsen. Nu är det bara upp
            till vädergudarna.
          </Text>
        </Box>
      </Box>
    </main>
  );
}
