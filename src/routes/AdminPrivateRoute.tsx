import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store/store";


interface IProps {
    children: React.ReactNode
}

const AdminPrivateRoute = ({ children }: IProps) => {
    const navigate = useNavigate();
    const { loginAs } = useSelector((state: RootState) => state?.auth);

    useEffect(() => {
        if (loginAs !== 'ADMIN') {
            localStorage.clear()
            navigate('/login', { replace: true });
        }
    }, [loginAs, navigate]);
    return children
}

export default AdminPrivateRoute