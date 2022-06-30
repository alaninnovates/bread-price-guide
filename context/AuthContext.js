import {createContext, useContext, useEffect, useState} from 'react';
import {validateToken} from '../lib/auth';
import {useAuthHydration, useAuthStore} from '../store/auth';
import {Container, Spinner, Text} from '@chakra-ui/react';

const AuthContext = createContext({});

function AuthProvider({children}) {
    const authStore = useAuthStore();
    const [authenticated, setAuthenticated] = useState(false);
    const checkAuth = async () => {
        const valid = await validateToken(authStore.token);
        if (valid) {
            setAuthenticated(true);
        }
    };
    useEffect(() => {
        checkAuth();
    }, [authStore.token]);
    return <AuthContext.Provider value={{
        authenticated,
        logout: () => {
            authStore.logout();
            setAuthenticated(false);
        }
    }}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthContext');
    }
    return context;
}

export {AuthProvider, useAuth};