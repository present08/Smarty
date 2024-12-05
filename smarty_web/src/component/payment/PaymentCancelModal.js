import React from "react";
import axios from "axios";

class CancelPay extends React.Component {
  cancelPay = async () => {
    try {
      // 사용자가 환불 확인을 눌렀는지 확인
      const confirmCancel = window.confirm("정말로 환불하시겠습니까?");
      if (!confirmCancel) return;

      // 요청 전 로딩 상태 표시
      this.setState({ loading: true });

      // 서버에 환불 요청
      const response = await axios({
        url: "http://www.myservice.com/payments/cancel", // 실제 서버 URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          merchant_uid: "order_1733108975171", // 실제 주문번호로 대체
          cancel_request_amount: 100,
          reason: "테스트 결제 환불",
          refund_holder: "최현재",
          refund_bank: "20",
          refund_account: "1002458451513",
        },
      });

      // 요청 성공 시 처리
      if (response.status === 200) {
        alert("환불 요청이 완료되었습니다.");
      } else {
        alert(`환불 요청 실패: ${response.data.message}`);
      }
    } catch (error) {
      // 에러 처리
      console.error("환불 요청 중 오류 발생:", error);
      alert("환불 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      // 로딩 상태 해제
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state || {};

    return (
      <button onClick={this.cancelPay} disabled={loading}>
        {loading ? "환불 요청 중..." : "환불하기"}
      </button>
    );
  }
}

export default CancelPay;