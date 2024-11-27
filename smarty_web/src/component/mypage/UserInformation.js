import React, { useEffect, useState } from 'react'
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { IoCallOutline } from 'react-icons/io5';
import { GoHome } from 'react-icons/go';


const UserInformation = (props) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUser(props.user);
    }, [props]);

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', width: '45%', height: '350px',
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '30px',
                alignItems: 'center'
            }}>
                <h3 style={{ fontSize: '23px', marginBottom: '1rem', color: '#003f66' }}>회원정보</h3>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '300px',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}>
                {currentUser ? (
                    <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                        <div style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '35%'
                        }}>
                            <img src="img/user_profile.png" alt="프로필이미지" style={{ width: '150px', height: '150px', marginBottom: '20px' }} />
                            {/* <h4 style={{ fontSize: '25px', }}>{currentUser.user_name}님</h4> */}
                        </div>
                        <div style={{ width: '65%', height: '100%', display: 'flex', marginLeft: '1rem', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <p style={{ color: 'gray', textAlign: 'center', fontSize: '18px', display: 'flex' }}><FaRegUserCircle style={{ width: '25px', height: '25px', marginRight: '15px', marginBottom: '10px' }} />ID : {currentUser.user_id}</p>
                                <p style={{ color: 'gray', textAlign: 'center', fontSize: '18px', display: 'flex' }}><MdOutlineAttachEmail style={{ width: '25px', height: '25px', marginRight: '15px', marginBottom: '10px' }} />EMAIL : {currentUser.email}</p>
                                <p style={{ color: 'gray', textAlign: 'center', fontSize: '18px', display: 'flex' }}><IoCallOutline style={{ width: '25px', height: '25px', marginRight: '15px', marginBottom: '10px' }} />전화번호 : {currentUser.phone}</p>
                                <p style={{ color: 'gray', textAlign: 'center', fontSize: '18px', display: 'flex' }}><GoHome style={{ width: '25px', height: '25px', marginRight: '15px', marginBottom: '10px' }} />주소 : {currentUser.address}</p>
                                <p style={{ color: 'gray', textAlign: 'center', fontSize: '18px', display: 'flex' }}><LiaBirthdayCakeSolid style={{ width: '25px', height: '25px', marginRight: '15px', marginBottom: '20px' }} />생년월일 : {currentUser.birthday}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>로그인이 필요합니다.</p>
                )}
            </div>
        </div>
    )
}

export default UserInformation