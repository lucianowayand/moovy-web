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
        const cookie = localStorage.getItem('session')
        if (cookie) {
            const jwt = JSON.parse(decrypt(cookie)).input
            const payload = jwt.split(".")[1];
            const decryptedUser = JSON.parse(atob(payload));
            if (decryptedUser) {
                setUser({
                    id: decryptedUser.sub,
                    full_name: decryptedUser.full_name,
                    email: decryptedUser.email
                })
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
            const encryptedSession = encrypt(res.data)
            localStorage.setItem('session', encryptedSession)
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