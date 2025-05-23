import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    return (
        <>
            <div className='bg-slate-100 p-3 sticky top-0'>
                <AdminHeader />
            </div>
            <div className='flex items-start'>
                <div className='border-r h-[95vh] p-3 rounded-md  w-[250px] fixed left-0'>
                    <AdminSidebar />
                </div>
                <div className='p-5 ml-[250px] bg-slate-50 w-full min-h-screen'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
