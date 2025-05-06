import { Box } from "@chakra-ui/react";
import ClientHeader from "./ClientHeader";

export default function Header() {
  return (
    <header>
      <Box zIndex={100} position="fixed" width="100%">
        <ClientHeader />
      </Box>
    </header>
  );
}
