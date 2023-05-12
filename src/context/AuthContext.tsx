import { createContext, useContext, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextValues {
    user: User | null;
    setUser: (user: User | null) => void;
    logOut: () => void;
} 

const AuthContext = createContext<AuthContextValues>({
    user: null,
    setUser: () => {},
    logOut: () => {},
})

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>({
        id: 1,
        name: 'John Doe',
        email: ''
    });

    function logOut() {
        setUser(null);
        window.localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    return useContext(AuthContext);
}

export { useAuth, AuthProvider };