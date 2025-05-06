"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import { setStorageElement, tryToParseStorageKeyValue } from "@/lib/webStorage";

export default function CookieNotice() {
  const [renderNotice, setRenderNotice] = useState(true);
  const [fadeInNotice, setFadeInNotice] = useState(0);

  useEffect(() => {
    const checkIfShown = () => {
      const hasBeenShown = tryToParseStorageKeyValue(
        "cookieNoticeShown",
        "local",
        "boolean"
      );
      if (!hasBeenShown) {
        setTimeout(() => {
          setFadeInNotice(1);
          setStorageElement("cookieNoticeShown", true, "local");
        }, 500);
      } else {
        setRenderNotice(false);
      }
    };
    checkIfShown();
  }, []);

  const handleAcceptAll = () => {
    setRenderNotice(false);
  };

  return renderNotice ? (
    <Box
      position="fixed"
      bottom="30px"
      right="30px"
      zIndex={999}
      opacity={fadeInNotice}
      transition="0.5s"
    >
      <Box
        bg="white"
        borderRadius={6}
        boxShadow="0 0 2em 0 rgba(0,0,0,0.25)"
        width={["calc(100vw - 60px)", "calc(100vw - 60px)", "unset"]}
        maxWidth="420px"
        p={3}
      >
        <Box p={1}>
          <Box display="flex" alignItems="center" mb={2}>
            <Text fontSize="lg" fontWeight={600} mr={2.5}>
              Din integritet
            </Text>
            <LockIcon fill="#dd6b20" />
          </Box>
          <Text mb={2}>
            UV-Kollen använder webblagring för att spara dina val på hemsidan
            och för att föra statistik. Genom att klicka på{" "}
            <i>Acceptera alla</i> eller <i>Endast nödvändiga</i> eller surfa
            vidare på hemsidan godkänner du detta enligt UV-Kollens{" "}
            <Link href="/integritetspolicy" textDecor="underline">
              Integritetspolicy
            </Link>
            .
          </Text>
        </Box>
        <Box>
          <Button
            bg="gray.800"
            color="white"
            m={1}
            _hover={{ bg: "gray.600" }}
            width={["calc(100% - 8px)", "unset"]}
            onClick={handleAcceptAll}
          >
            Acceptera alla
          </Button>
          <Button
            m={1}
            width={["calc(100% - 8px)", "unset"]}
            onClick={() => setRenderNotice(false)}
          >
            Endast nödvändiga
          </Button>
        </Box>
      </Box>
    </Box>
  ) : null;
}

function LockIcon({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill={fill}
      viewBox="0 0 16 16"
    >
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>
  );
}
