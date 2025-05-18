"use client";
import React, { createContext, useState, ReactNode } from 'react';

interface TanningContextType {
  skinType: string;
  setSkinType: (value: string) => void;
  spf: number;
  setSPF: (value: number) => void;
}

export const TanningContext = createContext<TanningContextType>({
  skinType: '',
  setSkinType: () => {},
  spf: 0,
  setSPF: () => {},
});

interface TanningProviderProps {
  children: ReactNode;
}

export const TanningProvider = ({ children }: TanningProviderProps) => {
  const [skinType, setSkinType] = useState<string>('');
  const [spf, setSPF] = useState<number>(0);

  return (
    <TanningContext.Provider value={{ skinType, setSkinType, spf, setSPF }}>
      {children}
    </TanningContext.Provider>
  );
};