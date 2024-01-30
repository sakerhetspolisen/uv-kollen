import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import React from "react";
import { useRouter } from "next/router";
import ConditionalWrapper from "./ConditionalWrapper";

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

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <header>
      <Box zIndex={100} position="fixed" width="100%">
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
          <Flex
            flex={{ base: 1, lg: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", lg: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", lg: "start" }}>
            <ConditionalWrapper
              condition={router.pathname !== "/"}
              // eslint-disable-next-line react/no-unstable-nested-components
              wrapper={(children) => (
                <Link href="/" _hover={{ textDecoration: "none" }}>
                  {children}
                </Link>
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

          <Stack
            flex={{ base: 1, lg: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            <Link
              href="https://www.paypal.com/paypalme/sellergreen"
              rel="noindex nofollow"
            >
              <Button leftIcon={<HeartIcon />} colorScheme="yellow" size="sm">
                Sponsra
              </Button>
            </Link>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav isHome={router.pathname === "/"} />
        </Collapse>
      </Box>
    </header>
  );
}

function DesktopNav() {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} display="flex" alignItems="center">
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
}

function DesktopSubNav({ label, href, subLabel }) {
  return (
    <Link
      href={href}
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
          <Text fontSize="sm">{subLabel}</Text>
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
          <Icon color="yellow.500" w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
}

function MobileNav({ isHome }) {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ lg: "none" }}
    >
      {!isHome && <MobileNavItem label="Hem" href="/" />}
      {NAV_ITEMS.map((navItem) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
}

function MobileNavItem({ label, children, href }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
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
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
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
