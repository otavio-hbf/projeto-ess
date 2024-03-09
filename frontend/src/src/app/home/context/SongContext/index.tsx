import { ReactNode, createContext, useContext, useState } from "react";
import SongModel from "../../models/SongModel";

interface SongContextProps {
  selectedSong?: SongModel;
  setSelectedSong: (song?: SongModel) => void;
}
interface SongProviderProps {
  children: ReactNode;
}
const SongContext = createContext<SongContextProps>({} as SongContextProps);

export const useSongContext = () => useContext(SongContext);

export const SongProvider = ({ children }: SongProviderProps) => {
  const [selectedSong, setSelectedSong] = useState<SongModel>();

  return (
    <SongContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </SongContext.Provider>
  );
};
