"use client";
import { Button } from "@heroui/react";
import { FaXTwitter, FaGithub, FaMastodon } from "react-icons/fa6";
import Link from "next/link";
import ConditionalWrapper from "./ConditionalWrapper";
import { usePathname } from "next/navigation";
import UVKollenIcon from "./UVKollenIcon";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="bg-neutral-200 text-neutral-dark border-t-2 border-neutral-300 z-1 relative">
      <div className="container mx-auto py-4 px-6">
        <div className=" flex flex-col justify-center items-center md:flex-row md:justify-between gap-6 py-4">
          <div className="flex justify-center items-center order-1">
            <ConditionalWrapper
              condition={pathname !== "/"}
              wrapper={(children) => <Link href="/">{children}</Link>}
            >
              <UVKollenIcon height={50} width={50} />
            </ConditionalWrapper>
          </div>
          <p className="text-md text-center order-3 md:order-2">
            © {new Date().getFullYear()} Karl Sellergren. Alla rättigheter
            förbehållna.
          </p>
          <div className="gap-3 flex justify-center items-center order-2 md:order-3">
            <Button
              isIconOnly
              aria-label="Github"
              className="bg-neutral-400 rounded-full"
              variant="light"
              as={Link}
              href="https://github.com/sakerhetspolisen/uv-kollen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Button>
            <Button
              isIconOnly
              aria-label="X"
              className="bg-neutral-400 rounded-full"
              variant="light"
              as={Link}
              href="https://x.com/uvkollen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </Button>
            <Button
              isIconOnly
              aria-label="Mastodon"
              className="bg-neutral-400 rounded-full"
              variant="light"
              as={Link}
              href="https://mastodon.social/@uvkollen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMastodon />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
