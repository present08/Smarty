import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { Link, Outlet, useLocation } from 'react-router-dom';


const RentalPage = () => {
    const location = useLocation()

    const showMenu = location.pathname === '/rental'
    
    return(
    <BasicLayout>
        <div>
            {showMenu && (
                <div className='w-full flex m-2 p-2'>
                <Link to="/rental/index" className='text-xl m-1 p-2 w-20 font-extrabold text-center underline'>
                    대여 신청
                </Link>
                <Link to="/rental/list" className='text-xl m-1 p-2 w-20 font-extrabold text-center underline'>
                    대여 목록
                </Link>
            </div>
            )}
            <Outlet/>
        </div>
    </BasicLayout>

    )

};

export default RentalPage;