import React from 'react'
import { AiOutlineCarryOut } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const HealthB = ({ selectedComponent, handleToggleComponent }) => {
    return (
        <div>                                {/* 체육관 컴포넌트 */}
            <div
                className={`facility sportsB ${selectedComponent === 'sportsB' ? 'zoomed' : ''}`}
                onClick={() => handleToggleComponent('sportsB')}
            >
                {selectedComponent !== 'sportsB' && <p>체육관B</p>}
                {
                    selectedComponent === 'sportsB' && (
                        <div className='swimming-container'>
                            <button className="zoom-out-button" onClick={() => {
                                console.log("삭제 버튼이 눌렸어요");
                                handleToggleComponent(null);
                            }}>
                                <AiOutlineClose style={{ width: '30px', height: '30px', color: 'black' }} />
                            </button>
                            <div className='swimming-cont'>
                                <div className='img-box'>
                                    <div className='icon-box'>
                                        <AiOutlineCarryOut style={{ width: '35px', height: '35px', marginRight: '5px' }} />
                                        <h4>체육관B</h4>
                                    </div>
                                    <img src='img/indoor_basketball.jpeg' />
                                </div>
                                <div className='swimming-text'>
                                    <h4 style={{ display: 'flex', fontSize: '21px', width: '100%', marginBottom: '1rem' }}>프로그램</h4>
                                    <div className='tbl-box'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th rowSpan={5}>
                                                        체육관B
                                                    </th>
                                                    <td>배구</td>
                                                </tr>
                                                <tr><td>농구</td></tr>
                                                <tr><td>축구</td></tr>
                                                <tr><td>배드민턴</td></tr>
                                                <tr><td>테니스</td></tr>
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
                    )}
            </div>
        </div>
    )
}

export default HealthB