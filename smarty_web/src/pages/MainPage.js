import React from 'react'
import BasicLayout from '../layouts/BasicLayout'

const MainPage = () => {
  return (
    <BasicLayout>
      <div className='text-3xl'>
          <h1>대여 안내</h1>
          <p>대여 관련 절차와 규정 설명 작성</p>
          <h2>환불/연기/반변경 안내</h2>
          <p>환불
            결제당일 : 100% 전액환불(단, 결제 당일 접수부서 및 인터넷접수 운영시간 이내 취소 시 전액 환불)
            개강일 이전 : 총 결제금액의 10% 공제 후 환급
            개강일 이후 : 환불 신청일 기준하여 일할(이용 일수)공제 및 총 결제금액의 10% 공제 후 환급
            환불기준 : 소비자 기본법 시행령 제8조(소비자분쟁해결기준) 제3항 및 공정거래 위원회 고시 소비자분쟁해결기준
          </p>
        </div>
    </BasicLayout>
  )
}

export default MainPage