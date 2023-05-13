import {
  Box,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import React, { useState } from "react";

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

export default function CitySuggest({ setCityPath, formRef }) {
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

  return (
    <AutoComplete
      openOnFocus
      flexShrink={1}
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
          py={8}
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={
            <LocationIcon fill={useColorModeValue("#fbd87c", "#87540b")} />
          }
        />
        <AutoCompleteInput
          onChange={(e) => handleInputChange(e)}
          placeholder="Börja skriva en stad..."
          bg={useColorModeValue("black", "white")}
          color={useColorModeValue("white", "black")}
          borderColor="whiteAlpha.500"
          py={8}
          _placeholder={{ color: "yellow.500" }}
          _hover={{ borderColor: "whiteAlpha.700" }}
          required
          focus="true"
        />
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
