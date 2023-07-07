import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useSelectorRoot } from '../redux/store';
import { useEffect } from 'react';

type Props = {
    children?: React.ReactNode
};

const PrivateRoutes = ({children}: Props) => {
    const {
        userRole
    } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate();


    useEffect(()=>{
        if(userRole){
            navigate('/management')
        }
    },[userRole])

    return(
        userRole === 'buyer' ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes