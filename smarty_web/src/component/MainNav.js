import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/nav.css'
import { AiOutlineClose, AiOutlineMessage, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import axios from 'axios';

const host = 'http://localhost:8080';

const MainNav = () => {

    // 검색창 모달 구현하기
    const [searchModal, setSearchModal] = useState(false);
    const modalBackcground = useRef();

    // 검색창
    const [search, setSearch] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const onChange = (e) => {
        const searchValue = e.target.value;
        setSearch(e.target.value);

        //예시 검색 결과를 위한 필터링 로직 실제로 API 연결 가능
        const result = dummyData.fillter(item =>
            item.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(result);
    }
    const dummyData = ['apple', 'banana', 'orange']

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 상태를 확인하는 함수
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(`${host}/api/auth/status`, { withCredentials: true });
                setIsLoggedIn(response.data.isLoggedIn);
                localStorage.setItem('isLoggedIn', response.data.isLoggedIn);
            } catch (error) {
                console.log("로그인 상태 확인 중 에러 발생: ", error);
            }
        };

        checkLoginStatus();
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    const handleLogout = async () => {
        try {
            await axios.post(`${host}/api/auth/logout`, {}, { withCredentials: true }); // withCredentials 추가
            alert("로그아웃 성공");
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');
            window.location.reload(); // 새로고침
        } catch (error) {
            alert('로그아웃 중 오류 발생: ', error);
        }
    };

    return (
        <nav style={{
            width: '100%',
            height: '130px',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: '#f7f7f7',
            backgroundColor: 'white',
            zIndex: '1000',
            position: 'fixed',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="subnav">
                <ul>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link to={"/mypage"}>마이페이지</Link>
                            </li>
                            <li>
                                <Link to={"/"} onClick={handleLogout}>로그아웃</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to={"/user/login"}>로그인</Link>
                            </li>
                            <li>
                                <Link to={"/user/signUp"}>회원가입</Link>
                            </li>
                            <li>
                                <Link to={"/"}>고객센터</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className='mainnav'>
                <div className='logo'>
                    <h1 style={{
                        color: '#17468c',
                        fontSize: '43px',
                        marginBottom: '2rem'
                    }}>SMARTY</h1>
                </div>
                <div className='navbox'>
                    <div className='listbox'>
                        <ul>
                            <li>
                                <Link to={"/"}>이용안내</Link>
                                <ul>
                                    <li>
                                        <Link to={"/"}>운영시간</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>회원등록 안내</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>환불 및 연기</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to={"/center/center_in"}>센터소개</Link>
                                <ul>
                                    <li>
                                        <Link to={"/center/facility"}>시설안내</Link>
                                    </li>
                                    <li>
                                        <Link to={"/center/parking"}>주차안내</Link>
                                    </li>
                                    <li>
                                        <Link to={"/center/directions"}>오시는길</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to={"/"}>수강신청</Link>
                                <ul>
                                    <li>
                                        <Link to={"/"}>수강신청</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to={"/facilityList"}>일일입장</Link>
                                <ul>
                                    <li>
                                        <Link to={"/"}>일일입장</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to={"/"}>물품대여</Link>
                                <ul>
                                    <li>
                                        <Link to={"/"}>사물함</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>품목</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to={"/"}>커뮤니티</Link>
                                <ul>
                                    <li>
                                        <Link to={"/"}>공지사항</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>자유게시판</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>채용정보</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className='iconbox'>
                        <a href='http://pf.kakao.com/_ixcRln/chat'><AiOutlineMessage style={{
                            width: '30px', height: '30px', marginRight: '20px'
                        }} /></a>
                        <AiOutlineSearch className='modal-open-bt' onClick={() => {
                            setSearchModal(true)
                        }} />

                    </div>
                </div>
            </div>
            {/* 아이콘 클릭시 모달 오픈 */}
            {
                searchModal &&
                <div className='searchModal-container' ref={modalBackcground} onClick={e => {
                    if (e.target === modalBackcground.current) {
                        setSearchModal(false)
                    }
                }}>
                    <div className='searchModal-content'>
                        <AiOutlineClose className='modal-close-btn'
                            onClick={() => setSearchModal(false)}
                        />
                        <p>SEARCH</p>
                        <div className='searchBox'>
                            <input type="search" onChange={onChange} placeholder='검색어를 입력해주세요.' value={searchTerm} />
                            <AiOutlineSearch style={{
                                width: '30px', height: '30px',
                            }} />
                        </div>
                    </div>
                </div>
            }
        </nav>
    )
}

export default MainNav

