import React, {createContext, useState, useContext, ReactNode} from 'react';
import {isLoggedIn} from '../utils/Auth';

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
    const [isLoggedInState, setIsLoggedInState] = useState<boolean>(isLoggedIn);

    const login = () => {
        setIsLoggedInState(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedInState(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedInState, login, logout}}>
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
