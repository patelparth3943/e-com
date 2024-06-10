import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext)
    return (
        <>  {!user
            ?
            <Navigate to="/auth" />
            :
            children}
        </>
    )
}
export function AuthRoute({ children }) {
    const { user } = useContext(AuthContext)
    return (
        <>  {!user
            ?
            children
            :
            <Navigate to="/" />}
        </>
    )
}

export default PrivateRoute