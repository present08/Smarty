import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from '../chart/BarChart';
import DoughnutChart from '../chart/DoughnutChart';



const host = 'http://localhost:8080';

const UserRating = () => {

    const [currentUser, setCurrentUser] = useState(null);


    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${host}/api/auth/me`, { withCredentials: true });
            if (response.status === 200) {
                const user = response.data;
                console.log("현재 로그인된 사용자 정보:", user);
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            } else {
                console.log("사용자가 인증되지 않았습니다.");
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchCurrentUser().then(user => {
            setCurrentUser(user);
        });
    }, []);


    return (
        <div style={{
            display: 'flex', flexDirection: 'column', width: '50%', height: '350px',
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '30px',
                alignItems: 'center'
            }}>
                <h3 style={{ fontSize: '23px', marginBottom: '1rem', color: '#003f66' }}>활동내역</h3>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '300px',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ width: '95%', height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '55%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1.5rem' }}>
                        <BarChart />
                    </div>
                    <div style={{ width: '40%', height: '90%', backgroundColor: '#f0f3fa', borderRadius: '15px' }}>
                        <DoughnutChart />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserRating;



