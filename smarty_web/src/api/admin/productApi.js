import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/admin/products`;
const statusprefix = `${API_SERVER_HOST}/api/admin/product-status`; // 상품 상태 컨트롤러


// 상품 데이터 등록 (JSON 데이터 전송)
export const postProductData = async (productArray) => {
    try {
      const response = await axios.post(`${prefix}/data`, productArray, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("상품 데이터 등록 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("상품 데이터 등록 실패:", error.response?.data || error.message);
      throw error;
    }
  };

// 파일 업로드 (multipart/form-data)
export const uploadProductFiles = async (productId, files) => {
    if (!files || files.length === 0) {
        console.error("파일이 없습니다.");
        return;
    }
    try {
        const formData = new FormData();
        files.forEach((file) => {
            console.log("업로드 파일:", file.name, file.size); // 디버깅 로그
            formData.append("files", file);
        });

        const response = await axios.post(`${prefix}/files/${productId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("파일 업로드 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("파일 업로드 실패:", error.response?.data || error.message);
        throw error;
    }
};

// 특정 시설의 물품 리스트 조회
export const getProductsByFacility = async (facilityId) => {
    try {
      const response = await axios.get(`${prefix}/facility/${facilityId}`);
      return response.data;
    } catch (error) {
      console.error("특정 시설 물품 조회 실패:", error);
      throw error;
    }
  };

  
// 특정 상품 조회
export const getOneProduct = async (product_id) => {
    try {
        const response = await axios.get(`${prefix}/${product_id}`);
        console.log("특정 상품 조회 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("특정 상품 조회 실패:", error);
        throw error;
    } 
};

// 시설별 대여물품 상태 가져오기 (관리자용)
export const fetchProductStatusByFacility = (facilityId) => {
    return axios.get(`${statusprefix}/${facilityId}`);
  }
  
  // 시설별 대여물품 상태 수정 (관리자용)
  export const updateProductStatus = (statusId, newStatus) => {
    return axios.put(`${statusprefix}/update-status`, null, {
      params: {
        statusId: statusId,
        newStatus: newStatus
      }
    });
  };
  
  
  // 시설별 대여물품 수량 수정 (관리자용)
  export const updateProductStock = (productId, newStock) => {
    return axios.put(`${statusprefix}/update-stock`, null,{
      params: {
        productId: productId,
        newStock: newStock
      }  
    });
  };
  
