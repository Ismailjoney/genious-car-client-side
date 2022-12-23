import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../Firebase/firebase.config';

export const AuthorContext = createContext();
const auth = getAuth(app)


const AuthContext = ({children}) => {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    const createUser =(email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(()=>{
        setLoading(true)
        const unSubscribe = onAuthStateChanged( auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
        return () =>{
            return  unSubscribe()
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        loading
    }
    return (
         <AuthorContext.Provider value={authInfo}>
            {children}
         </AuthorContext.Provider>
    );
};

export default AuthContext;