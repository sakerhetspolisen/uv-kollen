import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const LocationIcon = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill={fill}
    viewBox="0 0 16 16"
  >
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

export default function CityAutofill({ setCityPath }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();
  const popoverRef = useRef();

  useEffect(() => {
    if (inputRef.current && popoverRef.current) {
      popoverRef.current.style.width = `${inputRef.current.offsetWidth}px`;
    }
  }, [inputRef.current, popoverRef.current]);

  useEffect(() => {
    if (value.length > 2) {
      fetch(`/api/suggest?q=${value}`)
        .then((res) => res.json())
        .then((res) => setSuggestions(res.res));
    } else {
      setSuggestions([]);
    }
  }, [value, setSuggestions]);

  return (
    <Popover
      placement="bottom-start"
      isOpen={suggestions.length > 0}
      initialFocusRef={inputRef}
    >
      <PopoverTrigger>
        <InputGroup size="lg" mx={[0, 2]} my={2} flexShrink={1}>
          <InputLeftElement
            py={8}
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={
              <LocationIcon fill={useColorModeValue("#fbd87c", "#87540b")} />
            }
          />
          <Input
            placeholder="ex. Helsingborg"
            bg={useColorModeValue("black", "white")}
            color={useColorModeValue("white", "black")}
            borderColor="whiteAlpha.500"
            py={8}
            _placeholder={{ color: "yellow.500" }}
            _hover={{ borderColor: "whiteAlpha.700" }}
            required
            focus="true"
            onChange={(e) => {
              setValue(e.target.value);
              setCityPath(
                e.target.value.trim().toLowerCase().replaceAll(" ", "-")
              );
            }}
            value={value}
            ref={inputRef}
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent
        border={0}
        boxShadow="xl"
        bg={useColorModeValue("gray.800", "gray.100")}
        p={2}
        rounded="md"
        mt={-2}
        ref={popoverRef}
      >
        <Stack>
          {suggestions.map((sugg) => (
            <Box
              key={sugg[2]}
              bg="transparent"
              _hover={{ bg: useColorModeValue("gray.700", "gray.200") }}
              color={useColorModeValue("white", "black")}
              p={2}
              rounded="md"
              cursor="pointer"
              onClick={() => {
                setValue(sugg[0]);
                setCityPath(sugg[2]);
              }}
            >
              <Text fontWeight="600">{sugg[0]}</Text>
              <Text>{sugg[1]}</Text>
            </Box>
          ))}
        </Stack>
      </PopoverContent>
    </Popover>
  );
}
