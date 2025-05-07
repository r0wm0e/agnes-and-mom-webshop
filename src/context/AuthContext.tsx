import React, {createContext, useState, useContext, ReactNode} from 'react';
import Auth from '../utils/Auth';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(Auth.isLoggedIn());

    const login = () => {
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn: loggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
