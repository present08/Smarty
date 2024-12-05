import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineSchedule, AiTwotoneBank } from 'react-icons/ai';
import { HiOutlineTicket } from "react-icons/hi2";

const Reservationinformation = () => {
    return (
        <div className='instructionsContainer'>
            <div className='submu'>
                <nav>
                    <Link to="/guide/instructions" style={{ textDecoration: 'none', color: 'black', padding: '10px', paddingLeft: '0' }}>HOME</Link>
                    <p >&gt;</p>
                    <Link to="/guide" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>이용안내</Link>
                </nav>
            </div>
            <div className='instructions_box'>
                <div className='instructions_cont'>
                    <h3>SMARTY 이용안내</h3>
                    <div className='Information_box' >
                        <div className='contBox'>
                            <div>
                                <AiTwotoneBank style={{ width: '50px', height: '50px' }} />
                            </div>
                            <h5>영업시간</h5>
                            <hr />
                            <p>월요일 ~ 일요일</p>
                            <p>24시간</p>
                        </div>
                        <div className='contBox'>
                            <div>
                                <AiOutlineSchedule style={{ width: '50px', height: '50px' }} />
                            </div>
                            <h5>휴관일</h5>
                            <hr />
                            <p>설날 당일</p>
                            <p>추석 당일</p>
                        </div>
                        <div className='contBox'>
                            <div>
                                <HiOutlineTicket style={{ width: '50px', height: '50px' }} />
                            </div>
                            <h5>입장권 가격</h5>
                            <hr />
                            <p>시설마다 다르니 확인 바람</p>
                            <button><Link to={"/guide/hours"}>이용시간</Link></button>
                        </div>
                    </div>
                </div>
                <div className='reservation_information'>
                    <h3>SMARTY 예약안내</h3>
                    <div className='reservation_cont'>
                        <div className='contBox'>
                            <div>
                                <AiTwotoneBank style={{ width: '50px', height: '50px' }} />
                            </div>
                            <h5>단기입장</h5>
                        </div>
                        <div className='reservation_text'>
                            <div>
                                <h5>예약방법</h5>
                                <div className='reservation_box'>
                                    <p>1. 단기입장 매뉴를 선택합니다.</p>
                                    <p>2. 원하는 시설을 선택합니다</p>
                                    <p>3. 상세화면에서 내용을 확인 후 [예약하기] 버튼을 클릭합니다.</p>
                                    <p>4. 접수 가능한 일자 선택 , 맞는 시간대 선택 후 [신청완료] 버튼을 클릭합니다. </p>
                                    <p>5. 예약 내역 안내창이 뜨면 [확인] 버튼을 클릭하면 예약이 완료됩니다.</p>
                                    <p>6. 마이페이지에서 예약내역을 확인합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reservation_button'>
                        <button><Link to={"/facilityList"}>단기입장 예약하기</Link></button>
                    </div>
                    <div className='reservation_cont'>
                        <div className='contBox'>
                            <div>
                                <AiTwotoneBank style={{ width: '50px', height: '50px' }} />
                            </div>
                            <h5>장기입장</h5>
                        </div>
                        <div className='reservation_text'>
                            <div>
                                <h5>예약방법</h5>
                                <div className='reservation_box'>
                                    <p>1. 수강신청 매뉴를 선택합니다.</p>
                                    <p>2. 원하는 클래스를 선택합니다</p>
                                    <p>3. 모달창에서 내용을 확인하고 [등록하기] 버튼을 클릭합니다.</p>
                                    <p>5. 예약 내역 안내창이 뜨면 [확인] 버튼을 클릭하면 예약이 완료됩니다.</p>
                                    <p>6. 마이페이지에서 예약내역을 확인합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reservation_button'>
                        <button><Link to={"/classList"}>장기입장 예약하기</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservationinformation