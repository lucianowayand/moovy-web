import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { decrypt, encrypt } from "../services/crypto";

interface User {
    id: number;
    full_name: string;
    email: string;
}

interface AuthContextValues {
    user: User | null | undefined;
    setUser: (user: User | null) => void;
    logOut: () => void;
    logIn: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextValues>({
    user: undefined,
    setUser: () => { },
    logOut: () => { },
    logIn: () => { }
})

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        if(localStorage.getItem('session')){
            const decryptedUser = JSON.parse(decrypt(localStorage.getItem('session') || '')).input as User
            if(decryptedUser){
                setUser(decryptedUser)
            }    
        } else {
            if(window.location.pathname !== '/'){
                logOut()
            }
        }
    }, [])

    // Printing user for debugging purposes
    useEffect(() => {
        console.log(user)
    }, [user])

    function logOut() {
        setUser(undefined);
        localStorage.removeItem('session')
        window.location.href = '/'
    }

    async function logIn(email: string, password: string) {
        try {
            const res = await api.post('/users/login', { email, password })
            const user = {
                id: res.data.id,
                full_name: res.data.full_name,
                email: res.data.email
            }
            setUser(user)
            const encryptedUser = encrypt(user)
            localStorage.setItem('session', encryptedUser)
            window.location.href = '/dashboard'

        } catch (error) {
            alert(error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logOut, logIn }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext);
}

export { useAuth, AuthProvider };