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
            <Link href="#">Råd och rekommendationer</Link>
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

const UVKollenLogo = () => {
  return (
    <svg
      width="198"
      height="43"
      viewBox="0 0 198 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: 28 }}
    >
      <g clipPath="url(#clip0_410_242)">
        <path
          d="M29.8894 16.7427L29.8954 16.7228C30.7105 14.0408 32.4131 11.1209 34.8459 8.18562C31.9567 10.5592 29.0857 12.2224 26.4455 13.0251C25.6575 9.6365 25.8702 5.24687 27.0359 0.375C25.6155 5.04597 23.6383 8.84904 21.3093 11.3388L21.3236 11.3541L21.1231 21.3893L29.8894 16.7427Z"
          fill="#60A060"
        />
        <path
          d="M29.8954 16.7228L29.8894 16.7427L21.1231 21.3893L26.2497 29.7046L26.2449 29.7249C28.8852 30.5276 31.7561 32.1908 34.6453 34.5644C32.2126 31.6291 30.51 28.7092 29.6949 26.0272C33.592 25.1207 38.8135 25.5385 44.5698 27.2077C39.7389 25.7803 35.8079 23.7624 33.2564 21.375C35.5639 19.2159 38.9996 17.3591 43.2087 15.9678C38.0723 17.2768 33.437 17.5466 29.8954 16.7228Z"
          fill="#E6C050"
        />
        <path
          d="M26.2449 29.7249L26.2497 29.7046L21.1231 21.3893L16.2767 29.7189L16.2567 29.7249C16.9185 32.5706 16.8745 36.1223 16.153 40.0727C17.4843 36.4503 19.1753 33.4782 21.1088 31.4112C23.4377 33.901 25.415 37.704 26.8354 42.375C25.6697 37.5031 25.4569 33.1135 26.2449 29.7249Z"
          fill="#DA7756"
        />
        <path
          d="M12.7662 16.7427L12.7602 16.7228C9.56895 17.4651 5.48975 17.3194 0.956055 16.3258C4.69338 17.6711 7.75605 19.3961 9.87097 21.375C7.80974 23.3037 4.84828 24.9912 1.23938 26.321C5.57938 25.4213 9.48235 25.3114 12.5596 26.0272C11.6758 28.9354 9.74847 32.1233 6.9782 35.3072C10.1617 32.5365 13.3491 30.6089 16.2567 29.7249L16.2767 29.7189L21.1231 21.3893L12.7662 16.7427Z"
          fill="#A94C4C"
        />
        <path
          d="M12.7602 16.7228L12.7662 16.7427L21.1231 21.3893L21.3236 11.3541L21.3093 11.3388C19.3759 9.27183 17.6848 6.2997 16.3535 2.67727C17.075 6.62769 17.119 10.1794 16.4573 13.0251C13.5496 12.1411 10.3622 10.2135 7.17874 7.44279C9.94901 10.6267 11.8763 13.8146 12.7602 16.7228Z"
          fill="#9E4BC5"
        />
        <path
          d="M61.4602 9.53651V7.92092L79.9917 7.92041V9.69362L76.2065 10.0483L82.8306 28.9231L89.218 10.0877L85.7483 9.69362V7.92041H94.8563V9.536L91.426 10.0089L83.1066 34.5579H81.3717L72.1848 9.89064L70.0996 9.64057L67.4928 9.96996V23.4857C67.4928 26.2441 67.0854 28.4639 66.2705 30.1451C65.4557 31.8001 64.3385 33.0085 62.9191 33.7704C61.4996 34.5059 59.8831 34.8737 58.0693 34.8737C56.1768 34.8737 54.5076 34.5059 53.0619 33.7704C51.6162 33.0348 50.4859 31.8921 49.671 30.3421C48.8824 28.7922 48.4882 26.7957 48.4882 24.3526V20.0969V15.0137C48.4882 13.3062 48.4619 11.6118 48.4093 9.93055L45.1367 9.53651V7.92092H56.2951V9.53651L52.2733 10.0094C52.247 11.6644 52.2207 13.3325 52.1945 15.0137V20.0969V23.2099C52.1945 25.4428 52.4573 27.216 52.983 28.5295C53.535 29.8168 54.2973 30.7362 55.2699 31.2879C56.2425 31.8133 57.3991 32.076 58.7396 32.076C60.9739 32.076 62.6562 31.3667 63.7865 29.9481C64.9168 28.5033 65.4819 26.0339 65.4819 22.54V10.0488L61.4602 9.53651Z"
          fill="#202020"
        />
        <path
          d="M175.664 34.5585V33.125L178.61 32.5676C178.637 31.5589 178.65 30.4705 178.65 29.3025C178.677 28.1346 178.69 27.0993 178.69 26.1968V24.2855C178.69 23.1972 178.677 22.2946 178.65 21.5779C178.65 20.8612 178.623 20.1047 178.57 19.3083L175.425 18.9499V17.5563L180.999 15.1274L181.597 15.5256L181.915 18.711C182.897 17.6492 184.025 16.7865 185.3 16.1229C186.574 15.4593 187.821 15.1274 189.042 15.1274C190.768 15.1274 192.042 15.7114 192.865 16.8794C193.714 18.0209 194.139 19.8923 194.139 22.4937V26.1968C194.139 27.0993 194.139 28.1346 194.139 29.3025C194.166 30.4705 194.192 31.5589 194.219 32.5676L197.006 33.125V34.5585H187.768V33.125L190.715 32.5676C190.741 31.5854 190.755 30.5103 190.755 29.3424C190.781 28.1478 190.794 27.0993 190.794 26.1968V22.8123C190.794 20.9806 190.529 19.7197 189.998 19.0296C189.494 18.3394 188.658 17.9943 187.49 17.9943C186.587 17.9943 185.711 18.1801 184.862 18.5518C184.012 18.9234 183.083 19.5339 182.074 20.3834V26.1968C182.074 27.0728 182.074 28.108 182.074 29.3025C182.101 30.4705 182.127 31.5589 182.154 32.5676L184.901 33.125V34.5585H175.664Z"
          fill="#202020"
        />
        <path
          d="M167.893 16.9591C167.15 16.9591 166.393 17.1714 165.623 17.5961C164.88 18.0209 164.23 18.6978 163.672 19.6268C163.141 20.5559 162.796 21.7903 162.637 23.3299H169.884C170.839 23.3299 171.463 23.1308 171.755 22.7326C172.074 22.3344 172.233 21.8434 172.233 21.2594C172.233 20.4896 172.034 19.7861 171.636 19.149C171.264 18.4854 170.746 17.9545 170.083 17.5563C169.446 17.1581 168.716 16.9591 167.893 16.9591ZM167.853 35.0761C165.172 35.0761 163.022 34.2134 161.403 32.488C159.783 30.736 158.974 28.3336 158.974 25.281C158.974 23.237 159.385 21.4585 160.208 19.9454C161.057 18.4323 162.172 17.2511 163.553 16.4016C164.96 15.5522 166.486 15.1274 168.132 15.1274C169.512 15.1274 170.76 15.4327 171.875 16.0432C172.989 16.6538 173.879 17.5298 174.542 18.6712C175.206 19.7861 175.538 21.1532 175.538 22.7724C175.538 23.2237 175.511 23.6484 175.458 24.0466C175.405 24.4182 175.339 24.7368 175.259 25.0022H162.557C162.61 27.4444 163.221 29.3025 164.389 30.5767C165.557 31.8509 167.096 32.488 169.008 32.488C170.282 32.488 171.344 32.2358 172.193 31.7314C173.043 31.2005 173.826 30.5236 174.542 29.7007L175.498 30.4573C174.755 31.8641 173.746 32.9923 172.472 33.8418C171.198 34.6647 169.658 35.0761 167.853 35.0761Z"
          fill="#202020"
        />
        <path
          d="M150.872 34.5586V33.1251L154.057 32.5677C154.084 31.4793 154.097 30.4175 154.097 29.3823C154.124 28.3205 154.137 27.2587 154.137 26.1969V8.71689L150.872 8.31872V6.9251L157.084 5.1333L157.641 5.45184L157.482 11.106V26.1969C157.482 27.2587 157.482 28.3205 157.482 29.3823C157.508 30.4441 157.535 31.5059 157.561 32.5677L160.747 33.1251V34.5586H150.872Z"
          fill="#202020"
        />
        <path
          d="M142.994 34.5586V33.1251L146.18 32.5677C146.206 31.4793 146.219 30.4175 146.219 29.3823C146.246 28.3205 146.259 27.2587 146.259 26.1969V8.71689L142.994 8.31872V6.9251L149.206 5.1333L149.763 5.45184L149.604 11.106V26.1969C149.604 27.2587 149.604 28.3205 149.604 29.3823C149.63 30.4441 149.657 31.5059 149.684 32.5677L152.869 33.1251V34.5586H142.994Z"
          fill="#202020"
        />
        <path
          d="M135.655 35.0761C134.116 35.0761 132.642 34.7177 131.236 34.001C129.855 33.2578 128.727 32.1561 127.851 30.6962C126.975 29.2096 126.537 27.378 126.537 25.2013C126.537 22.9981 126.975 21.1532 127.851 19.6667C128.727 18.1536 129.855 17.0254 131.236 16.2822C132.642 15.5123 134.116 15.1274 135.655 15.1274C137.195 15.1274 138.655 15.5123 140.035 16.2822C141.442 17.0254 142.584 18.1536 143.46 19.6667C144.362 21.1532 144.813 22.9981 144.813 25.2013C144.813 27.378 144.362 29.2096 143.46 30.6962C142.584 32.1561 141.442 33.2578 140.035 34.001C138.655 34.7177 137.195 35.0761 135.655 35.0761ZM135.655 33.2843C137.381 33.2843 138.708 32.6074 139.637 31.2536C140.566 29.8733 141.031 27.8558 141.031 25.2013C141.031 22.5203 140.566 20.4763 139.637 19.0694C138.708 17.6625 137.381 16.9591 135.655 16.9591C133.93 16.9591 132.603 17.6625 131.674 19.0694C130.771 20.4763 130.32 22.5203 130.32 25.2013C130.32 27.8558 130.771 29.8733 131.674 31.2536C132.603 32.6074 133.93 33.2843 135.655 33.2843Z"
          fill="#202020"
        />
        <path
          d="M104.47 9.55294V7.92041H115.698V9.55294L111.916 9.99093C111.889 11.6898 111.863 13.402 111.836 15.1274C111.836 16.8263 111.836 18.5385 111.836 20.2639V22.7724L122.189 10.1104L119.322 9.55294V7.92041H128.48V9.55294L124.617 10.0706L117.968 18.0739L126.011 32.5277L129.077 32.9259V34.5584H118.844V32.9259L122.109 32.5277L115.778 20.7019L111.836 25.4402C111.836 26.502 111.836 27.6302 111.836 28.8247C111.863 30.0192 111.889 31.2403 111.916 32.4879L115.698 32.9259V34.5584H104.47V32.9259L108.133 32.4879C108.186 30.8156 108.213 29.1167 108.213 27.3913C108.213 25.6658 108.213 23.9404 108.213 22.215V20.2639C108.213 18.5385 108.213 16.8263 108.213 15.1274C108.213 13.402 108.186 11.6898 108.133 9.99093L104.47 9.55294Z"
          fill="#202020"
        />
        <path
          d="M91.7629 21.7484L91.8328 21.3815C91.9558 20.7367 92.2003 20.357 92.5662 20.2425C92.9691 20.1349 93.6793 20.0949 95.3947 20.1225C97.1511 20.1348 97.5942 20.1295 99.1663 20.1067C100.743 20.0616 101.276 20.0327 101.814 20.02C102.393 19.9921 102.848 20.0098 103.18 20.0732C103.992 20.2279 104.326 20.6833 104.182 21.4393L104.143 21.6394C104.046 22.1508 103.796 22.4603 103.393 22.5678C103.035 22.6379 102.59 22.6682 102.056 22.6586C99.8117 22.5993 99.5884 22.5928 97.8972 22.639C96.206 22.6852 95.1284 22.7217 94.6645 22.7484C93.5153 22.7597 93.0129 22.7126 92.4595 22.6071C91.906 22.5016 91.6739 22.2153 91.7629 21.7484Z"
          fill="#202020"
        />
      </g>
      <defs>
        <clipPath id="clip0_410_242">
          <rect
            width="196.087"
            height="42"
            fill="white"
            transform="translate(0.956055 0.375)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
