"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { IoIosMenu, IoMdClose, IoIosArrowDown } from "react-icons/io";
import ConditionalWrapper from "@/src/components/ConditionalWrapper";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import UVKollenLogo from "./UVKollenLogo";

export default function CustomNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-100 lg:w-4xl mx-auto lg:pt-2">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBlurred={false}
        className="bg-neutral-light lg:rounded-md"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden cursor-pointer"
            icon={(isOpen) => (
              <span className="text-xl">
                {isOpen ? <IoMdClose /> : <IoIosMenu />}
              </span>
            )}
          />
          <NavbarBrand className="hidden md:block">
            <ConditionalWrapper
              condition={pathname !== "/"}
              // eslint-disable-next-line react/no-unstable-nested-components
              wrapper={(children) => <Link href="/">{children}</Link>}
            >
              <UVKollenLogo />
            </ConditionalWrapper>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex md:hidden gap-4" justify="center">
          <ConditionalWrapper
            condition={pathname !== "/"}
            // eslint-disable-next-line react/no-unstable-nested-components
            wrapper={(children) => <Link href="/">{children}</Link>}
          >
            <UVKollenLogo />
          </ConditionalWrapper>
        </NavbarContent>
        <NavbarContent className="hidden lg:flex gap-4" justify="center">
          <WhatIsUVDropdown />
          <NavbarItem>
            <Link href="/rekommendationer">Råd och rekommendationer</Link>
          </NavbarItem>
          <AboutUVKollenDropdown />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sponsra
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="bg-neutral-dark text-neutral-light pt-6">
          <Accordion
            itemClasses={{
              base: "cursor-pointer px-3 rounded-md",
              heading: "text-lg font-semibold",
            }}
            className="pb-6"
          >
            <AccordionItem
              key="what_is_uv"
              aria-label="Vad är UV-index?"
              title="Vad är UV-index?"
              HeadingComponent="span"
            >
              <div className="pl-3 flex flex-col gap-6">
                <Link href="/#hur-beraknas-uv" className="flex flex-col">
                  <span className="font-lg font-semibold">Beräkning</span>
                  <span>Hur den numeriska modellen fungerar</span>
                </Link>
                <Link href="/#hur-fungerar-skalan" className="flex flex-col">
                  <span className="font-lg font-semibold">
                    Hur fungerar skalan?
                  </span>
                  <span>En linjär skala framtagen av WHO</span>
                </Link>
                <Link href="/#uv-i-sverige" className="flex flex-col">
                  <span className="font-lg font-semibold">UV i Sverige</span>
                  <span>Statistik</span>
                </Link>
              </div>
            </AccordionItem>
            <AccordionItem
              key="recommendations"
              aria-label="Råd och rekommendationer"
              title="Råd och rekommendationer"
              HeadingComponent={"span"}
              hideIndicator
              disableAnimation
              disableIndicatorAnimation
              classNames={{
                content: "h-0 p-0 m-0",
              }}
              onPress={() => router.push("/rekommendationer")}
            />
            <AccordionItem
              key="about"
              aria-label="Om UV-Kollen"
              title="Om UV-Kollen"
              HeadingComponent="span"
            >
              <div className="pl-3 flex flex-col gap-6">
                <Link href="/om" className="flex flex-col">
                  <span className="font-lg font-semibold">
                    Vem ligger bakom?
                  </span>
                  <span>Om mig och varför UV-Kollen startades</span>
                </Link>
                <Link href="/kalldata" className="flex flex-col">
                  <span className="font-lg font-semibold">Källdata</span>
                  <span>Svensk väderdata är en central del</span>
                </Link>
                <Link
                  href="https://github.com/sakerhetspolisen/uv-kollen"
                  className="flex flex-col"
                >
                  <span className="font-lg font-semibold">Öppen källkod</span>
                  <span>Se hur UV-Kollen är uppbyggt</span>
                </Link>
                <Link href="/integritetspolicy" className="flex flex-col">
                  <span className="font-lg font-semibold">
                    Integritetspolicy
                  </span>
                </Link>
                <Link href="mailto:uvkollen@kolifink.se" className="flex flex-col">
                  <span className="font-lg font-semibold">Kontakt</span>
                </Link>
              </div>
            </AccordionItem>
          </Accordion>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}

const AboutUVKollenDropdown = () => (
  <Dropdown classNames={{ base: "bg-neutral-light rounded-md left-18 px-1" }}>
    <NavbarItem>
      <DropdownTrigger>
        <Button
          disableRipple
          className="p-0 bg-transparent data-[hover=true]:bg-transparent"
          radius="sm"
          variant="light"
          endContent={<IoIosArrowDown className="h-3.5 mt-0.5" />}
        >
          Om UV-Kollen
        </Button>
      </DropdownTrigger>
    </NavbarItem>
    <DropdownMenu
      aria-label="ACME features"
      itemClasses={{
        base: "data-[hover=true]:bg-neutral-200 px-2 rounded-md mb-1",
        title: "font-semibold",
      }}
    >
      <DropdownItem
        key="about"
        description="Om mig och varför UV-Kollen startades"
        as={Link}
        href="/om"
      >
        Vem ligger bakom?
      </DropdownItem>
      <DropdownItem
        key="source_data"
        description="Svensk väderdata är en central del"
      >
        Källdata
      </DropdownItem>
      <DropdownItem
        key="open_source"
        description="Se hur UV-Kollen är uppbyggt"
      >
        Öppen källkod
      </DropdownItem>
      <DropdownItem key="privacy_policy">Integritetspolicy</DropdownItem>
      <DropdownItem key="contact">Kontakt</DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const WhatIsUVDropdown = () => (
  <Dropdown classNames={{ base: "bg-neutral-light rounded-md left-15 px-1" }}>
    <NavbarItem>
      <DropdownTrigger>
        <Button
          disableRipple
          className="p-0 bg-transparent data-[hover=true]:bg-transparent"
          radius="sm"
          variant="light"
          endContent={<IoIosArrowDown className="h-3.5 mt-0.5" />}
        >
          Vad är UV-index?
        </Button>
      </DropdownTrigger>
    </NavbarItem>
    <DropdownMenu
      aria-label="ACME features"
      itemClasses={{
        base: "data-[hover=true]:bg-neutral-200 px-2 rounded-md mb-1",
        title: "font-semibold",
      }}
    >
      <DropdownItem
        key="calculation"
        description="Hur den numeriska modellen fungerar"
      >
        Beräkning
      </DropdownItem>
      <DropdownItem
        key="scale"
        description="En linjär skala framtagen av WHO"
      >
        Hur fungerar skalan?
      </DropdownItem>
      <DropdownItem
        key="sweden"
        description="Statistik"
      >
        UV i Sverige
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);