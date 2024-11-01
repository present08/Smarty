import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/loginSlice'
import useCustomLogin from "../../hooks/useCustomLogin"

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams()

    const {moveToPath} = useCustomLogin()
    
    const dispatch = useDispatch()

    const authCode = searchParams.get("code")

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken)

            getMemberWithAccessToken(accessToken).then(memberInfo => {
                console.log("----------------------")
                console.log(memberInfo)

                dispatch(login(memberInfo))

                //소셜 회원이 아니라면
                if (memberInfo && !memberInfo.social) {
                    moveToPath("/")
                } else {
                    moveToPath("/member/modify")
                }
            })
        })
    }, [authCode])
  return (
      <div>
          <div>Kakao Login Redirect</div>
          <div>{authCode}</div>
      </div>
  )
}

export default KakaoRedirectPage