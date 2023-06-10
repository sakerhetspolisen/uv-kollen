import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";

const SocialButton = ({ children, label, href }) => (
  <chakra.button
    bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{
      bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
        textAlign="center"
      >
        <Box display="flex" alignItems="center">
          <Owl />
          <Text
            fontFamily="heading"
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
            letterSpacing="-.06em"
            fontSize="xl"
          >
            -Kollen
          </Text>
        </Box>
        <Text>
          © {new Date().getFullYear()} Karl Sellergren. Alla rättigheter
          förbehållna.
        </Text>
        <Stack direction="row" spacing={6}>
          <SocialButton label="Twitter" href="https://twitter.com/uvkollen">
            <Twitter />
          </SocialButton>
          <SocialButton label="Mastodon" href="https://mastodon.online/@uv">
            <Mastodon />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}

const Mastodon = () => (
  <svg width="0.88em" height="1em" viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M433 179.11c0-97.2-63.71-125.7-63.71-125.7c-62.52-28.7-228.56-28.4-290.48 0c0 0-63.72 28.5-63.72 125.7c0 115.7-6.6 259.4 105.63 289.1c40.51 10.7 75.32 13 103.33 11.4c50.81-2.8 79.32-18.1 79.32-18.1l-1.7-36.9s-36.31 11.4-77.12 10.1c-40.41-1.4-83-4.4-89.63-54a102.54 102.54 0 0 1-.9-13.9c85.63 20.9 158.65 9.1 178.75 6.7c56.12-6.7 105-41.3 111.23-72.9c9.8-49.8 9-121.5 9-121.5zm-75.12 125.2h-46.63v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.33V197c0-58.5-64-56.6-64-6.9v114.2H90.19c0-122.1-5.2-147.9 18.41-175c25.9-28.9 79.82-30.8 103.83 6.1l11.6 19.5l11.6-19.5c24.11-37.1 78.12-34.8 103.83-6.1c23.71 27.3 18.4 53 18.4 175z"
    />
  </svg>
);

const Twitter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
  </svg>
);

const Owl = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      fill="#662113"
      d="M7.317 11c-5.723 9.083.958 18 .958 18s2.874-.442 6.875-5.2c4-4.758-7.833-12.8-7.833-12.8zm21.342 0c5.723 9.083-.958 18-.958 18s-2.874-.442-6.875-5.2C16.825 19.042 28.659 11 28.659 11z"
    />
    <path
      fill="#FFAC33"
      d="M15.203 31.557a1.22 1.22 0 0 0-.531-.496c-2.032-2.172-.589-4.717-.589-4.717c0-.703 1.271-2.544 0-2.544l-1.272 1.272c-1.272 1.271-1.272 5.089-1.272 5.089H8.995a1.27 1.27 0 1 0 0 2.543h1.408l-.282.153a1.274 1.274 0 0 0 1.21 2.24l3.357-1.816a1.274 1.274 0 0 0 .515-1.724zm5.596 0c.123-.229.317-.384.53-.496c2.033-2.172.589-4.717.589-4.717c0-.703-1.271-2.544 0-2.544l1.272 1.272c1.273 1.271 1.273 5.089 1.273 5.089h2.544a1.27 1.27 0 0 1 1.271 1.272a1.27 1.27 0 0 1-1.271 1.271h-1.408l.281.153a1.273 1.273 0 1 1-1.211 2.24l-3.356-1.816a1.272 1.272 0 0 1-.514-1.724z"
    />
    <path
      fill="#662113"
      d="M28.278 11.292c2.891-6.092 0-10.542 0-10.542s-5.781.959-6.744 2.875c-1.219 2.424 6.744 7.667 6.744 7.667z"
    />
    <path
      fill="#662113"
      d="M29.562 12.738c0 10.297-3.152 20.595-11.562 20.595c-8.409 0-11.563-10.298-11.563-20.595C6.437 2.44 11.614 2.083 18 2.083c6.387 0 11.562.357 11.562 10.655z"
    />
    <path
      fill="#C1694F"
      d="M27.666 17.738c0 10.297-7.774 14.595-9.666 14.595s-9.666-4.298-9.666-14.595c0-10.298 19.332-10.298 19.332 0z"
    />
    <path
      fill="#662113"
      d="M7.722 11.292C4.831 5.2 7.722.75 7.722.75s5.782.959 6.746 2.875c1.218 2.424-6.746 7.667-6.746 7.667z"
    />
    <path
      fill="#C1694F"
      d="M14.929 4.373C10.702 2.789 7.722.75 7.722.75s-2.076 3.221-.928 7.926c.446 2.137 1.94 4.195 3.904 4.662c2.637.627 7.302-.049 7.302-3.963c0-2.695-1.074-4.252-3.071-5.002zm6.142 0C25.298 2.789 28.277.75 28.277.75s2.076 3.221.928 7.926c-.445 2.137-1.939 4.195-3.902 4.662c-2.638.627-7.303-.049-7.303-3.963c0-2.695 1.074-4.252 3.071-5.002z"
    />
    <path
      fill="#FFD983"
      d="M16.083 8.417a3.833 3.833 0 1 1-7.666 0a3.833 3.833 0 0 1 7.666 0zm11.5 0a3.833 3.833 0 1 1-7.666 0a3.833 3.833 0 0 1 7.666 0z"
    />
    <path
      fill="#292F33"
      d="M14.167 8.417a1.917 1.917 0 1 1-3.833 0a1.917 1.917 0 0 1 3.833 0zm11.5 0a1.917 1.917 0 1 1-3.833 0a1.917 1.917 0 0 1 3.833 0z"
    />
    <path
      fill="#FFCC4D"
      d="M20.875 12.729c0 2.382-2.875 3.354-2.875 3.354s-2.875-.973-2.875-3.354S18 9.375 18 9.375s2.875.972 2.875 3.354z"
    />
    <path
      fill="#F4900C"
      d="M20.875 12.729c0 2.382-2.875 3.354-2.875 3.354s-2.875-.973-2.875-3.354C16.323 13.927 18 14.167 18 14.167s1.677-.24 2.875-1.438z"
    />
  </svg>
);
