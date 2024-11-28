import React from 'react'
import { AiOutlineCarryOut } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const HealthA = ({ selectedComponent, handleToggleComponent }) => {
    return (
        <div>
            <div
                className={`facility gymA ${selectedComponent === 'gymA' ? 'zoomed' : ''}`}
                onClick={() => handleToggleComponent('gymA')}
            >
                {selectedComponent !== 'gymA' && <p>헬스장</p>}
                {
                    selectedComponent === 'gymA' && (
                        <div className='gym-container'>
                            <button className="zoom-out-button" onClick={() => {
                                console.log("삭제 버튼이 눌렸어요");
                                handleToggleComponent(null);
                            }}>
                                &times;
                            </button>
                            <div className='gym-cont'>
                                <div className='img-box'>
                                    <div className='icon-box'>
                                        <AiOutlineCarryOut style={{ width: '35px', height: '35px', marginRight: '5px' }} />
                                        <h4>헬스장</h4>
                                    </div>
                                    <img src='img/gym.jpeg' />
                                </div>
                                <div className='gym-text'>
                                    <h4 style={{ display: 'flex', fontSize: '21px', width: '100%', marginBottom: '1rem' }}>프로그램</h4>
                                    <div className='tbl-box'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        헬스장
                                                    </th>
                                                    <td>헬스</td>
                                                </tr>
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

export default HealthA