"use client";

import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Icon,
  useBreakpointValue,
  useDisclosure,
  Link as ChakraLink,
  HoverCard,
  Portal,
  Collapsible,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoMdClose, IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import { usePathname } from "next/navigation";
import ConditionalWrapper from "./ConditionalWrapper";
import { useColorModeValue } from "./ui/color-mode";

const NAV_ITEMS = [
  {
    label: "Vad är UV-index?",
    children: [
      {
        label: "Beräkning",
        subLabel: "Hur den matematiska modellen fungerar",
        href: "/#hur-beraknas-uv",
      },
      {
        label: "Hur fungerar skalan?",
        subLabel: "En linjär skala framtagen av WHO",
        href: "/#hur-fungerar-skalan",
      },
      {
        label: "UV i Sverige",
        subLabel: "Statistik",
        href: "/#uv-i-sverige",
      },
    ],
  },
  {
    label: "Råd och rekommendationer",
    href: "/rekommendationer",
  },
  {
    label: "Om UV-Kollen",
    children: [
      {
        label: "Vem ligger bakom?",
        subLabel: "Om mig och varför UV-Kollen startades",
        href: "/om",
      },
      {
        label: "Källdata",
        subLabel: "Svensk väderdata är en central del",
        href: "/kalldata",
      },
      {
        label: "Öppen källkod",
        subLabel: "Se hur UV-Kollen är byggt",
        href: "https://github.com/sakerhetspolisen/uv-kollen",
      },
      {
        label: "Integritetspolicy",
        href: "/integritetspolicy",
      },
      {
        label: "Kontakt",
        href: "mailto:uvkollen@kolifink.se",
      },
    ],
  },
];

export default function ClientHeader() {
  const { open, onToggle } = useDisclosure();
  const pathname = usePathname();

  return (
    <>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
        width="100%"
      >
        {/* Mobile hamburger button */}
        <Flex
          flex={{ base: 1, lg: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", lg: "none" }}
        >
          <IconButton
            onClick={onToggle}
            variant="ghost"
            aria-label="Toggle Navigation"
          >
            {open ? <IoMdClose /> : <IoIosMenu />}
          </IconButton>
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", lg: "start" }}>
          <ConditionalWrapper
            condition={pathname !== "/"}
            // Wrap the logo so that if not on homepage it becomes a link to "/"
            wrapper={(children) => (
              <NextLink href="/" passHref legacyBehavior>
                <ChakraLink _hover={{ textDecoration: "none" }}>
                  {children}
                </ChakraLink>
              </NextLink>
            )}
          >
            <Text
              textAlign={useBreakpointValue({ base: "center", lg: "left" })}
              fontFamily="heading"
              color={useColorModeValue("gray.800", "white")}
              fontWeight="bold"
              letterSpacing="-.06em"
              fontSize="2xl"
            >
              UV-Kollen
            </Text>
          </ConditionalWrapper>

          <Flex display={{ base: "none", lg: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <MobileNav isHome={pathname === "/"} />
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
}

function DesktopNav() {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction="row" gap={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} display="flex" alignItems="center">
          <HoverCard.Root positioning={{ placement: "bottom-start" }}>
            <HoverCard.Trigger asChild>
              <NextLink href={navItem.href ?? "#"} passHref legacyBehavior>
                <ChakraLink
                  p={2}
                  fontSize="sm"
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </ChakraLink>
              </NextLink>
            </HoverCard.Trigger>

            {navItem.children && (
              <Portal>
                <HoverCard.Positioner>
                  <HoverCard.Content
                    border={0}
                    boxShadow="xl"
                    bg={popoverContentBgColor}
                    p={4}
                    rounded="xl"
                    minW="sm"
                  >
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </Portal>
            )}
          </HoverCard.Root>
        </Box>
      ))}
    </Stack>
  );
}

function DesktopSubNav({
  label,
  href,
  subLabel,
}: {
  label: string;
  href: string;
  subLabel?: string;
}) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <ChakraLink
        role="group"
        display="block"
        p={2}
        rounded="md"
        _hover={{ bg: useColorModeValue("yellow.50", "gray.900") }}
      >
        <Stack direction="row" align="center">
          <Box>
            <Text
              transition="all .3s ease"
              _groupHover={{ color: "yellow.500" }}
              fontWeight={500}
            >
              {label}
            </Text>
            {subLabel && <Text fontSize="sm">{subLabel}</Text>}
          </Box>
          <Flex
            transition="all .3s ease"
            transform="translateX(-10px)"
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify="flex-end"
            align="center"
            flex={1}
          >
            <Icon color="yellow.500" w={5} h={5} as={IoChevronForward} />
          </Flex>
        </Stack>
      </ChakraLink>
    </NextLink>
  );
}

function MobileNav({ isHome }: { isHome: boolean }) {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ lg: "none" }}
    >
      {!isHome && <MobileNavItem label="Hem" href="/" />}
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
}

function MobileNavItem({
  label,
  children,
  href,
}: {
  label: string;
  children?: Array<{ label: string; href: string }>;
  href?: string;
}) {
  const { open, onToggle } = useDisclosure();

  return (
    <Stack gap={4} onClick={children ? onToggle : undefined}>
      <NextLink href={href ?? "#"} passHref>
        <Flex
          py={2}
          justify="space-between"
          align="center"
          _hover={{ textDecoration: "none" }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={IoIosArrowDown}
              transition="all .25s ease-in-out"
              transform={open ? "rotate(180deg)" : undefined}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </NextLink>
      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle="solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align="start"
          >
            {children &&
              children.map((child) => (
                <NextLink
                  key={child.label}
                  href={child.href}
                  passHref
                  legacyBehavior
                >
                  <ChakraLink py={2}>{child.label}</ChakraLink>
                </NextLink>
              ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
}
