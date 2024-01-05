import { useState, createContext } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [idFilme, setidFilme] = useState();
    const [idCliente, setIdCliente] = useState();
    const [alugou, setAlugou] = useState(false);
    const [alterou, setAlterou] = useState(false);

    return (
        <AuthContext.Provider value={{ idFilme, setidFilme, idCliente, setIdCliente, alugou, setAlugou, alterou, setAlterou }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;