import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/nav.css';
import { AiOutlineClose, AiOutlineMenu, AiOutlineMessage, AiOutlineSearch } from "react-icons/ai";
import { checkLoginStatus, logout } from '../api/userApi';
import { IoCartOutline } from "react-icons/io5";
import axiosInstance from '../api/axiosInstance';

const MainNav = () => {
    const [searchModal, setSearchModal] = useState(false);
    const modalBackcground = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //----------------------------------세션 방식 로그인--------------------------------------//
    // useEffect(() => {
    //     checkLoginStatus().then(e => {
    //         setIsLoggedIn(e.isLoggedIn);
    //         localStorage.setItem('isLoggedIn', e.isLoggedIn);
    //     });
    // }, []);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         setUser(JSON.parse(localStorage.getItem("user")));
    //     }
    // }, [isLoggedIn]);

    const moveMypage = () => {
        navigate("/mypage", { state: { user } });
    };

    const cartPage = () => {
        navigate("/cart")
    }

    // const handleLogout = () => {
    //     logout().then(() => {
    //         alert("로그아웃 성공");
    //         setIsLoggedIn(false);
    //         localStorage.setItem('isLoggedIn', 'false');
    //         localStorage.setItem('user', "");
    //         window.location.reload();
    //     }).catch((error) => {
    //         console.error("로그인 상태 확인 중 에러 발생: ", error);
    //     });
    // };
    //---------------------------------------------------------------------------------------//

    //-----------------------------------시큐리티 로그인--------------------------------------//
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            // 서버로 상태 검증 요청
            axiosInstance.get('/security/status')
                .then((response) => {
                    setIsLoggedIn(true);
                    setUser(JSON.parse(localStorage.getItem('user')));
                })
                .catch((error) => {
                    console.error('로그인 상태 확인 실패:', error);
                    setIsLoggedIn(false);
                    localStorage.removeItem('jwtToken'); // 토큰 제거
                });
        }
    }, []);
    useEffect(() => {
        console.log("저장값 확인 : ", user)
    }, [user])


    const handleLogout = () => {
        alert("로그아웃 성공");
        setIsLoggedIn(false);
        localStorage.removeItem('jwtToken'); // JWT 제거
        navigate('/');
    }
    //---------------------------------------------------------------------------------------//

    return (
        <nav style={{ width: '100%', height: '130px', display: 'flex', flexDirection: 'column', backgroundColor: 'white', zIndex: '1000', position: 'fixed', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className={`subnav ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    {isLoggedIn ? (
                        <>
                            {user && user.level == 'admin' ?
                                (
                                    <li><Link to={"/admin"}>관리자모드</Link></li>
                                ) : (
                                    <>
                                        <li><span onClick={moveMypage} style={{ cursor: "pointer" }}>마이페이지</span></li>
                                        <li><Link to={"/"} onClick={handleLogout}>로그아웃</Link></li>
                                    </>
                                )}
                        </>
                    ) : (
                        <>
                            <li><Link to={"/user/login"}>로그인</Link></li>
                            <li><Link to={"/user/signUp"}>회원가입</Link></li>
                            <li><Link to={"/"}>고객센터</Link></li>
                        </>
                    )}
                </ul>
            </div>
            <div className={`mainnav ${isMenuOpen ? 'active' : ''}`}>
                <div className='logo'>
                    <Link to={"/"}>
                        <h1 style={{ color: '#17468c', fontSize: '43px', marginBottom: '2rem' }}>SMARTY</h1>
                    </Link>
                </div>
                <div className='navbox'>
                    <div className='listbox'>
                        <ul>
                            <li><Link to={"/center/center_in"}><h3>센터소개</h3></Link>
                                <ul>
                                    <li><Link to={"/center/facility"}>시설안내</Link></li>
                                    <li><Link to={"/center/parking"}>주차안내</Link></li>
                                    <li><Link to={"/center/directions"}>오시는길</Link></li>
                                </ul>
                            </li>
                            <li><Link to={"/guide/instructions"}><h3>이용안내</h3></Link>
                                <ul>
                                    <li><Link to={"/guide/hours"}>이용시간</Link></li>
                                    <li><Link to={"/guide/refund"}>환불 및 취소 안내</Link> </li>
                                </ul>
                            </li>
                            <li><Link to={"/classList"}><h3>수강신청</h3></Link>
                                <ul>
                                    <li><Link to={"/classList"}>수강신청</Link></li>
                                </ul>
                            </li>
                            <li><Link to={"/facilityList"}><h3>일일입장</h3></Link>
                                <ul>
                                    <li><Link to={"/facilityList"}>일일입장</Link></li>
                                </ul>
                            </li>
                            <li><Link to={"/product"}><h3>물품</h3></Link>
                                <ul>
                                    <li><Link to={"/product"}>물품대여</Link></li>
                                </ul>
                            </li>
                            <li><Link to={"/notice"}><h3>커뮤니티</h3></Link>
                                <ul>
                                    <li><Link to={"/notice/announce"}>공지사항</Link></li>
                                    <li><Link to={"/notice/board"}>자유게시판</Link></li>
                                    <li><Link to={"/notice/jobList"}>채용정보</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className='toggleIcon'>
                        <AiOutlineMenu onClick={toggleMenu} style={{ width: '50px', height: '50px', }} />
                    </div>
                    <div className='iconbox'>
                        <IoCartOutline className='modal-open-bt' onClick={cartPage} />
                        <a href='http://pf.kakao.com/_ixcRln/chat'><AiOutlineMessage style={{ width: '30px', height: '30px', marginRight: '20px' }} /></a>
                        <AiOutlineSearch className='modal-open-bt' onClick={() => { setSearchModal(true) }} />
                    </div>
                </div>
            </div>
            {/* 아이콘 클릭시 모달 오픈 */}
            {searchModal &&
                <div className='searchModal-container' ref={modalBackcground} onClick={e => { if (e.target === modalBackcground.current) { setSearchModal(false) } }}>
                    <div className='searchModal-content'>
                        <AiOutlineClose className='modal-close-btn' onClick={() => setSearchModal(false)} />
                        <p>SEARCH</p>
                        <div className='searchBox'>
                            <input type="search" placeholder='검색어를 입력해주세요.' value={searchTerm} />
                            <AiOutlineSearch style={{ width: '30px', height: '30px', }} />
                        </div>
                    </div>
                </div>
            }
        </nav>
    )
}

export default MainNav

