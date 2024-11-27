import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../../css/firstInfor.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineCarryOut, AiOutlineClose } from 'react-icons/ai';

const SportsA = ({ selectedComponent, handleToggleComponent }) => {
    return (
        <div
            className={`facility sportsA ${selectedComponent === 'sportsA' ? 'zoomed' : ''}`}
            onClick={() => handleToggleComponent('sportsA')}
        >
            {selectedComponent !== 'sportsA' && <p>체육관A</p>}
            {
                selectedComponent === 'sportsA' && (
                    <div className='sportsA-container'>
                        <button className="zoom-out-button" onClick={() => {
                            console.log("삭제 버튼이 눌렸어요");
                            handleToggleComponent(null);
                        }}>
                            <AiOutlineClose style={{ width: '30px', height: '30px', color: 'black' }} />
                        </button>
                        <div className='sportsA-cont'>
                            <div className='img-box'>
                                <div className='icon-box'>
                                    <AiOutlineCarryOut style={{ width: '35px', height: '35px', marginRight: '5px' }} />
                                    <h4>체육관A</h4>
                                </div>
                                <img src="img/pilates.jpg" alt="필라테스 이미지" />
                            </div>
                            <div className='sportsA-text'>
                                <h4 style={{ display: 'flex', fontSize: '21px', width: '100%', marginBottom: '1rem' }}>프로그램</h4>
                                <div className='tbl-box'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th rowSpan={9}>
                                                    체육관A
                                                </th>
                                                <td>요가</td>
                                            </tr>
                                            <tr><td>소도구 필라테스</td></tr>
                                            <tr><td>다이어트 댄스</td></tr>
                                            <tr><td>필라테스</td></tr>
                                            <tr><td>챠밍댄스</td></tr>
                                            <tr><td>라인댄스</td></tr>
                                            <tr><td>SNPE바른자세</td></tr>
                                            <tr><td>파워핏</td></tr>
                                            <tr><td>방송댄스</td></tr>
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
    )
}

export default SportsA