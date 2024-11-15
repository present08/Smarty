import React from 'react';
import { Link } from 'react-router-dom';

const OperatingHours = ({ facility }) => {
    return (
        <div className='operatingHoursContainer'>
            <div className='submu'>
                <nav>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px', paddingLeft: '0' }}>HOME</Link>
                    <p >&gt;</p>
                    <Link to="/guide/instructions" style={{ textDecoration: 'none', color: 'black', padding: '10px', }}>이용안내</Link>
                    <p >&gt;</p>
                    <Link to="/guide/hours" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>이용시간</Link>
                </nav>
            </div>
            <div className='operatingHours_box'>
                <div className='operatingHours_cont'>
                    <h3>SMARTY 이용시간</h3>
                    <div className='table_box'>
                        <table>
                            <thead>
                                <tr>
                                    <th>시설명</th>
                                    <th>open 시간</th>
                                    <th>close 시간</th>
                                    <th>기본 이용 시간</th>
                                    <th>가격</th>
                                </tr>
                            </thead>
                            {facility.map((item) => (
                                <tbody key={item.facility_id}>
                                    <tr>
                                        <td>{item.facility_name}</td>
                                        <td>{item.open_time}</td>
                                        <td>{item.close_time}</td>
                                        <td>{item.default_time}시간</td>
                                        <td>{item.basic_fee}원</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OperatingHours;