import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user'));
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const userJSON = JSON.parse(userData);
            setUser(userJSON);
        }
    }, []);
    console.log("SETUSER", user);



    const login = async (value, reset, setError) => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
                Accept: 'application/json'
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json);
            }
            setUser(json);
            localStorage.setItem('user', JSON.stringify(json));
            reset();
            // navigate('/');


        } catch (error) {
            console.error('Login error:', error.message);
            setError('password', {
                message: error.message,
            });
        }

    };


    const register = async (value, reset, setError) => {
        try {
            const { confirmPassword, ...rest } = value;
            const res = await fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify(rest),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            const json = await res.json();
            if (!res.ok)
                throw new Error(json);
            sessionStorage.setItem('user', JSON.stringify(json));
            setUser(res);
            reset();


        } catch (error) {
            setError('email', {
                message: error.message,
            });
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };



    return (
        <AuthContext.Provider value={{ login, register, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);