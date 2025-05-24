import { adminMenu } from '../../constants/menu';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNav = (link: string) => {
        navigate(`/admin${link}`);
    };
    return (
        <>
            <div>
                <ul className='space-y-4'>
                    {adminMenu.map((item, index) => {
                        const isActive = location.pathname === `/admin${item.link}`;
                        return (
                            <li
                                key={index}
                                onClick={() => handleNav(item.link)}
                                className={`p-3 rounded-md font-semibold flex items-center gap-5 w-full cursor-pointer 
                                    ${isActive ? 'bg-pink-100 border-l-4 border-pink-500 text-pink-600' : 'bg-white text-slate-700 hover:bg-slate-100 hover:border-l-2 border-pink-500'}`}
                            >
                                <div>{item.icon}</div>
                                <div> {item.title}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default AdminSidebar;
