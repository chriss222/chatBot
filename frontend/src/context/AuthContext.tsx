import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { checkAuthStatus, loginUser } from '../helpers/api-communicator';

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLogged: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        // Silent login
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLogged(true)
            }
        }
        checkStatus()
    }, [])

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLogged(true)
        }
    } 

    const signup = async (name: string, email: string, password: string) => {

    }

    const logout = async () => {}

    const value = {
        user,
        isLogged,
        login,
        logout,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);