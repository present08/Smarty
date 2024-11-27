import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../component/Footer';
import Wrapper from '../../component/Wrapper';
import MainNav from '../../component/MainNav';
import BackToTopButton from '../../component/BackToTopButton';
import { useLocation } from 'react-router-dom';
import { classEnroll } from '../../api/classAPI';
import '../../css/classPage.css'
import { IoMdClose } from "react-icons/io";



const ClassPage = (props) => {
    const { classData, setModal } = props;
    const [enrollData, setEnrollData] = useState({ user_id: '', class_id: '' });
    const user = JSON.parse(localStorage.getItem("user")).user_id;
    const closeModal = () => {
        setModal(null)
    }

    useEffect(() => {
        setEnrollData({ user_id: user, class_id: classData.class_id });
    }, [])


    const enrollClass = () => {
        classEnroll(enrollData).then(e => alert("수강신청이 완료되었습니다. \n수강번호 : " + e))
    }

    return (
        <div className='classModal'>
            <div className="classContainer">
                <div onClick={closeModal} className='classClose'><IoMdClose style={{ width: '30px', height: '30px' }} />
                </div>
                <div className='classContent'>
                    <h1 className='classTitle'>선택하신 정보를 확인해주세요.</h1>
                    <div className='classInfo'>
                        <div className='classSubtitle'>강 의 명</div>
                        <div className='classText'>{classData.class_name}</div>
                    </div>
                    <div className='classInfo'>
                        <div className='classSubtitle'>대상 시설</div>
                        <div className='classText'>{classData.facility_name}</div>
                    </div>
                    <div className='classInfo'>
                        <div className='classSubtitle'>수강 시작일</div>
                        <div className='classText'>{classData.start_date}</div>
                    </div>
                    <div className='classInfo'>
                        <div className='classSubtitle'>수강 종료일</div>
                        <div className='classText'>{classData.end_date}</div>
                    </div>
                    <div className='classInfo'>
                        <div className='classSubtitle'>수강 요일</div>
                        <div className='classText'>{classData.weekday.map((item, idx) => (<span key={item}>{idx == item.length - 1 ? item : item + ","} </span>))}</div>
                    </div>
                    <div className='classInfo'>
                        <div className='classSubtitle'>수강 시간</div>
                        <div className='classText'>{classData.start_time} ~ {classData.end_time}</div>
                    </div>
                    <div className='classInfo'>
                        <div className='classSubtitle'>수강 정원</div>
                        <div className='classText'>{classData.class_size} 명</div>
                    </div>
                </div>
                <button onClick={enrollClass} className='enrollBtn'>등록하기</button>
            </div>
        </div>
    )
}

export default ClassPage