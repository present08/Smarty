import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getList, getUserReservationList } from '../../api/facilityApi';
import '../../css/facilitySelect.css';
import { getListFacility } from '../../api/admin/facilityApi';

const FacilitySelect = ({ selectedFacility, handleChangeRental }) => {
    const [facility, setFacility] = useState([]); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacilities = async () => {
            const token = localStorage.getItem('token'); 
            const userStr = localStorage.getItem('user'); 

            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    const reservedFacilities = await getUserReservationList(user.user_id);
                    setFacility(reservedFacilities);
                    setIsLoggedIn(true); 
                } catch (error) {
                    console.error('예약된 시설 목록을 불러오는 중 오류 발생:', error);
                    setIsLoggedIn(false); 
                }
            } else {
                try {
                    const allFacilities = await getListFacility();
                    console.log(allFacilities)
                    setFacility(allFacilities);
                    setIsLoggedIn(false); 
                } catch (error) {
                    console.error('시설 목록을 불러오는 중 오류 발생:', error);
                }
            }
        };

        fetchFacilities();
    }, []);

    const handleMyRental = () => {
        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/login');
            return;
        }

        navigate('/rentals');
    };

    return (
        <div className='facility-select-container'>
            <div className="select-button-group">
                <select
                    name="facility_id"
                    value={selectedFacility}
                    onChange={handleChangeRental}
                    className="select-style"
                >
                    <option value="">
                        {isLoggedIn ? '예약한 시설을 선택하세요' : '시설을 선택하세요'}
                    </option>
                    {facility.map(item => (
                        <option key={item.facility_id} value={item.facility_id}>
                            {item.facility_name}
                        </option>
                    ))}
                </select>
                {isLoggedIn && (
                    <div>
                    <button
                        className="rental-button"
                        onClick={handleMyRental}
                    >
                        대여 목록
                    </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacilitySelect;
