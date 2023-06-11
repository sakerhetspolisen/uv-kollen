import {
  Box,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SearchIcon = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="28"
    viewBox="0 0 24 24"
    width="28"
    fill={fill}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const HouseIcon = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill={fill}
    viewBox="0 0 16 16"
  >
    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
  </svg>
);

export default function CitySuggest({ formRef }) {
  const router = useRouter();
  const [cityPath, setCityPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    ["Stockholm", "Stockholm, Stockholm", "stockholm"],
    ["Göteborg", "Göteborg, Västra Götaland", "göteborg"],
    ["Malmö", "Malmö, Skåne", "malmö"],
  ]);

  async function handleInputChange(e) {
    let suggestData = [];
    const { value } = e.target;
    if (value.length > 2) {
      const data = await fetch(`/api/suggest?q=${encodeURIComponent(value)}`);
      suggestData = await data.json();
    }
    setSuggestions(suggestData);
  }

  const handleSuggestionClick = (path) => {
    setCityPath(path);
    formRef.current.requestSubmit();
  };

  useEffect(() => {
    if (cityPath !== "") {
      setIsLoading(true);
      router.push(`/stad/${encodeURIComponent(cityPath)}`);
    }
  }, [cityPath]);

  return (
    <AutoComplete
      openOnFocus
      emptyState={
        <Text textAlign="center" opacity=".5">
          Du verkar ha uppfunnit en ny stad :)
        </Text>
      }
      shouldRenderSuggestions={(val) => val.length > 2}
      onSelectOption={(option) => handleSuggestionClick(option.item.value)}
    >
      <InputGroup size="lg">
        <InputLeftElement
          display="flex"
          alignItems="center"
          height="100%"
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={
            <SearchIcon fill={useColorModeValue("#fff0de", "#49566f")} />
          }
        />
        <AutoCompleteInput
          onChange={(e) => handleInputChange(e)}
          placeholder="Börja skriva en stad..."
          fontSize={["md", "lg"]}
          bg={useColorModeValue("black", "white")}
          color={useColorModeValue("white", "black")}
          borderColor="whiteAlpha.500"
          py={8}
          _placeholder={{ color: useColorModeValue("gray.200", "#49566f") }}
          _hover={{ borderColor: "whiteAlpha.700" }}
          required
          focus="true"
        />
        <InputRightElement
          width="12em"
          display="flex"
          alignItems="center"
          height="100%"
          pl={20}
        >
          <Button
            size={["md", "lg"]}
            mx={2}
            my={2}
            py={5}
            colorScheme={useColorModeValue("yellow", "yellow")}
            flexShrink={2}
            width="100%"
            type="submit"
            isLoading={isLoading}
          >
            Beräkna
          </Button>
        </InputRightElement>
      </InputGroup>
      <AutoCompleteList mt={0}>
        {suggestions.map((city) => (
          <AutoCompleteItem
            key={city[2]}
            value={city[2]}
            alignItems="center"
            whiteSpace="nowrap"
            label={city[0]}
          >
            <Box ml={2}>
              <HouseIcon fill={useColorModeValue("#000", "#fff")} />
            </Box>
            <Box display="flex" flexDir="column" ml="3">
              <Text fontWeight="600" as="span">
                {city[0]}
              </Text>
              <Text as="span" fontSize="sm">
                {city[1]}
              </Text>
            </Box>
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
}
