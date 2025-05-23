import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


interface IProps {
    children: React.ReactNode
}

const AdminPrivateRoute = ({ children }: IProps) => {
    const navigate = useNavigate();
    const { loginAs } = useSelector((state) => state?.auth);

    useEffect(() => {
        if (loginAs !== 'ADMIN') {
            localStorage.clear()
            navigate('/login', { replace: true });
        }
    }, [loginAs, navigate]);
    return children
}

export default AdminPrivateRoute