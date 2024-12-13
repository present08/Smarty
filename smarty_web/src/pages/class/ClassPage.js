import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { classEnroll, MembershipUser } from '../../api/classAPI';
import '../../css/classPage.css';



const ClassPage = (props) => {
    const { classData, setModal } = props;
    const [enrollData, setEnrollData] = useState({ user_id: '', class_id: '' });
    const user = JSON.parse(localStorage.getItem("user"));
    const [membership, setMembership] = useState("");
    const [Dprice, setDPrice] = useState(classData.price)
    const closeModal = () => {
        setModal(null)
    }
    const navigate = useNavigate();

    useEffect(() => {
        setEnrollData({ user_id: user.user_id, class_id: classData.class_id });
        MembershipUser(user.user_id).then(e => {
            setMembership(e)
            switch (e) {
                case "브론즈": setDPrice(classData.price); break;
                case "실버": setDPrice(Math.floor((classData.price - (classData.price * 0.03)) / 10) * 10); break;
                case "골드": setDPrice(Math.floor((classData.price - (classData.price * 0.05)) / 10) * 10); break;
                case "플래티넘": setDPrice(Math.floor((classData.price - (classData.price * 0.07)) / 10) * 10); break;
                case "다이아": setDPrice(Math.floor((classData.price - (classData.price * 0.1)) / 10) * 10); break;
            }
        })
    }, [])

    const enrollClass = () => {
        classEnroll(enrollData).then(e => {
            if (e == "해당 강의의 정원 초과 되었습니다.") {
                alert(e)
            } else if (e == "중복 수강할 수 없습니다.") {
                alert(e)
            } else {
                alert("수강신청이 완료되었습니다. \n수강번호 : " + e)
                navigate(`/enrollment/${classData.class_id}`, { state: { classData, Dprice, user, e } })
            }
        })
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
                        <div className='classSubtitle'>수강 요금</div>
                        <div className='classText'>{membership != "브론즈" ? <><span style={{ textDecoration: 'line-through', color: 'gray', fontSize: '15px', marginRight: "5px" }}> {classData.price} </span> <span style={{ fontWeight: "bold" , color:'red' }}>{Dprice}</span></> : classData.price}</div>
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
                    <p style={{ display: 'block', width: '100%', textAlign: 'center' }}>* 맴버십 등급에 맞는 할인된 금액으로 결제 됩니다.</p>
                </div>
                <button onClick={enrollClass} className='class_page_enrollBtn'>등록하기</button>
            </div>
        </div>
    )
}

export default ClassPage