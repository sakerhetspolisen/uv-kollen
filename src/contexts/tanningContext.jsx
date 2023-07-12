import React, { createContext, useEffect, useState } from "react";
import { setStorageElement, tryToParseStorageKeyValue } from "@/lib/webStorage";

export const TanningContext = createContext({
  skinType: undefined,
  setSkinType: () => null,
});

export const TanningProvider = ({ children }) => {
  const [skinType, setSkinType] = useState(undefined);
  const [spf, setSPF] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedSkinType = tryToParseStorageKeyValue(
        "skinType",
        "local",
        "number"
      );
      const storedSPF = tryToParseStorageKeyValue("spf", "session", "number");
      setSkinType(storedSkinType);
      setSPF(storedSPF);
    }
  }, []);

  const setStoredSkinType = (newSkinType) => {
    setSkinType(newSkinType);
    setStorageElement("skinType", parseInt(newSkinType, 10));
  };

  const setStoredSPF = (newSPF) => {
    setSPF(newSPF);
    setStorageElement("spf", parseInt(newSPF, 10), "session");
  };

  return (
    <TanningContext.Provider
      value={{
        skinType,
        setSkinType: setStoredSkinType,
        spf,
        setSPF: setStoredSPF,
      }}
    >
      {children}
    </TanningContext.Provider>
  );
};
