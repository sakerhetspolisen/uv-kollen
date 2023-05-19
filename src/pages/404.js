import { Box, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import errorBgd from "@/assets/errorBgd.jpg";

export default function NotFound() {
  return (
    <main>
      <Head>
        <title>UV-Kollen - 404</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Image
          src={errorBgd}
          alt="Ett vetefält med en soluppgång i bakgrunden."
          fill
          style={{ objectFit: "cover" }}
        />
        <Box textAlign="center" zIndex={1} color="white">
          <Text fontWeight="500" mb={8}>
            404 - Sidan kunde inte hittas
          </Text>
          <Heading>Det finns inget att hitta här.</Heading>
          <Text fontSize="1.2em" mt={2}>
            Du måste ha kommit vilse i detta stoora universum som vi kallar
            internet.
          </Text>
        </Box>
      </Box>
    </main>
  );
}
