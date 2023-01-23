import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthorContext } from '../../../Context/AuthContext';
import Spinner from '../../../pages/Spinner/Spinner';

const PrivetRoute = ({children}) => {
    const {user,Loading} = useContext(AuthorContext)
    const location = useLocation()

    if(Loading){
        return <Spinner></Spinner>
    }
    if(user){
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivetRoute;