import { createContext, useContext, useState } from "react";


const UserContext = createContext()

export function UserProvider({children}) {
    const [id, setId] = useState()
    const [nomeUsuario, setNomeUsuario] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    return (
        <UserContext.Provider value={{id, setId, nomeUsuario, setNomeUsuario, email, setEmail, senha, setSenha}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)