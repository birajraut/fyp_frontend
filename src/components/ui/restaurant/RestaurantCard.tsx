import { useNavigate } from "react-router-dom"
import placeholder from "../../../assets/restaurantPlaceholder.png"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../../redux/reducers/authSlice"

interface IProps {
    id:string
    title:string,
    description:string,
    logo?:string
}
const RestaurantCard = ({title, description, logo, id}:IProps)=>{
    const navigate = useNavigate()
    const auth= useSelector(state=>state.auth)
    // const user = useSelector(state=>state.user)
    // console.log(logo, auth.accessToken,'aiuth state')
const dispatch= useDispatch()
    const handleRedirect = ()=>{
        if(auth?.accessToken){
            // dispatch(setUser({...user}))
navigate(`/restaurant/details/${id}`)
}else{
    navigate(`/login`)

}

    }
    return (
        <div className=" rounded-md shadow overflow-hidden group  border hover:border-purple-500 cursor-pointer" onClick={handleRedirect}>
            <div className="w-full h-36 overflow-hidden">
                <img src={logo || placeholder} alt="logo_image" className="w-full h-full object-contain " />
            </div>
            <div className="p-3  bg-gray-50 ">
            <div className="text-slate-700 text-sm font-semibold mb-2  group-hover:underline">{title}</div>
            <div className="text-gray-500 text-xs  max-h-20 min-h-20">{description}</div>
            </div>
        </div>
    )
}

export default RestaurantCard