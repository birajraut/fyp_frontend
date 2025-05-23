/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState } from "react"
import { useNavigate } from "react-router-dom"



interface IProps {
    tabList: {
        title: {
            id: string,
            name: string
        }
        content: ReactNode | any
    }[]

}

const NavTab = ({ tabList }: IProps) => {
    const navigate = useNavigate()
    const [active, setActive] = useState<string | number>(tabList[0]?.title?.name)


    const activeContent = tabList?.find((item) => item.title.name === active)

    const queryParams = new URLSearchParams(location.search);





    const handleClick = (title: string) => {
        setActive(title.name)
        queryParams.set('status', title.id); // if URL is ?name=John
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }

    return (
        <>

            <ul className="flex items-center gap-5">
                {
                    tabList?.map((item, index) => {
                        return (
                            <li key={index} className={` ${active === item.title.name ? 'bg-purple-500 text-white ' : 'bg-slate-200 '}py-3 px-10 rounded-md font-semibold text-slate-700 cursor-pointer`} onClick={() => handleClick(item.title)}>
                                {item.title.name}
                            </li>
                        )
                    })
                }

                {/* <li className="bg-slate-200 py-3 px-10 rounded-md font-semibold text-slate-700">
                    Tab1
                </li>
                <li className="bg-slate-200 py-3 px-10 rounded-md font-semibold text-slate-700">
                    Tab1
                </li>
                <li className="bg-slate-200 py-3 px-10 rounded-md font-semibold text-slate-700">
                    Tab1
                </li> */}

            </ul>


            <div className="mt-10">
                {activeContent?.content}
            </div>



        </>
    )
}


export default NavTab