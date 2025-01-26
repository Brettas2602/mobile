import { createContext, useContext, useState } from "react";

const MusicContext = createContext()

export function MusicProvider({children}) {
    const [sound, setSound] = useState()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentMusicData, setCurrentMusicData] = useState({ name: null})

    return (
        <MusicContext.Provider value={{sound, setSound, isPlaying, setIsPlaying, currentMusicData, setCurrentMusicData}} >
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext)
