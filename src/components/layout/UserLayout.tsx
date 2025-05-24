import { Outlet } from 'react-router-dom'
import UserHeader from "./UserHeader"
import UserFooter from "./UserFooter"
// import { useQuery } from '@tanstack/react-query'
// import { userDetails } from '../../services/user'
// import { useDispatch } from 'react-redux'
// import { setUser } from "../../redux/reducers/authSlice"
const UserLayout = () => {
    // const dispatch = useDispatch()
    // const { data } = useQuery({
    //     queryKey: ['user-details'],
    //     queryFn: async () => {
    //         const resp = await userDetails()
    //         if (resp?.data?.result) {
    //             dispatch(setUser(resp?.data?.result))
    //         }
    //     }
    // })



    return (<>
        <UserHeader />
        <Outlet />
        <UserFooter />

    </>)
}

export default UserLayout