// src/components/SwimmingPool.js
import React from 'react';
import { AiOutlineCarryOut } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SwimmingPool = ({ handleZoomOut }) => {
    return (
        <div className='swimming-container'>
            <button className="zoom-out-button" onClick={handleZoomOut}>
                &times;
            </button>
            <div className='swimming-cont'>
                <div className='img-box'>
                    <div className='icon-box'>
                        <AiOutlineCarryOut style={{ width: '35px', height: '35px', marginRight: '5px' }} />
                        <h4>수영장</h4>
                    </div>
                    <img src='img/swimming_pool.jpeg' alt="Swimming Pool" />
                </div>

                <div className='swimming-text'>
                    <h4 style={{ display: 'flex', fontSize: '21px', width: '100%', marginBottom: '1rem' }}>프로그램</h4>
                    <div className='tbl-box'>
                        <table>
                            <tbody>
                                <tr><th rowSpan={9}>수영장</th><td>새벽수영</td></tr>
                                <tr><td>오전수영</td></tr>
                                <tr><td>효도수영</td></tr>
                                <tr><td>어린이수영</td></tr>
                                <tr><td>저녁수영</td></tr>
                                <tr><td>토요수영</td></tr>
                                <tr><td>자유수영</td></tr>
                                <tr><td>아쿠아로빅</td></tr>
                                <tr><td>아쿠아워킹</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='button-box'>
                        <button>
                            <Link to={"/classList"} style={{ color: '#e7e7e7', fontWeight: 'bold' }}>수강신청</Link>
                        </button>
                        <button>
                            <Link to={"/facilityList"} style={{ color: '#e7e7e7', fontWeight: 'bold' }}>일일입장</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwimmingPool;
