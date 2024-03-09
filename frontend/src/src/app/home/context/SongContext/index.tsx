// Create a new file for your context, e.g., SongContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import SongModel from "../../models/SongModel";

interface SongContextProps {
  selectedSong: SongModel | null;
  setSelectedSong: (song: SongModel | null) => void;
}
interface SongProviderProps {
  children: ReactNode;
}
const SongContext = createContext<SongContextProps>({} as SongContextProps);

export const useSongContext = () => useContext(SongContext);

export const SongProvider = ({ children }: SongProviderProps) => {
  const [selectedSong, setSelectedSong] = useState<SongModel | null>(null);

  return (
    <SongContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </SongContext.Provider>
  );
};
