import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function MainPage() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">통계 페이지</Link>
                    </li>
                    <li>
                        <Link to="/rental-management">대여 품목 관리</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <Outlet /> {/* 라우터의 하위 컴포넌트가 여기에 렌더링 */}
            </div>
        </div>
    );
}

export default MainPage;
