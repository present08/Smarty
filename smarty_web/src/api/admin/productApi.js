import axios from "axios";
import axiosInstance from "../axiosInstance"
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/admin/products`;
const statusprefix = `${API_SERVER_HOST}/api/admin/product-status`; // 상품 상태 컨트롤러


// 상품 데이터 등록 (JSON 데이터 전송)
export const postProductData = async (productArray) => {
  try {
    // const response = await axios.post(`${prefix}/data`, productArray, {
    const response = await axiosInstance.post(`${prefix}/data`, productArray, {
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

    // const response = await axios.post(`${prefix}/files/${productId}`, formData, {
    const response = await axiosInstance.post(`${prefix}/files/${productId}`, formData, {
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
    // const response = await axios.get(`${prefix}/facility/${facilityId}`);
    const response = await axiosInstance.get(`${prefix}/facility/${facilityId}`);
    return response.data;
  } catch (error) {
    console.error("특정 시설 물품 조회 실패:", error);
    throw error;
  }
};


// 특정 상품 조회
export const getOneProduct = async (product_id) => {
  try {
    // const response = await axios.get(`${prefix}/${product_id}`);
    const response = await axiosInstance.get(`${prefix}/${product_id}`);
    console.log("특정 상품 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("특정 상품 조회 실패:", error);
    throw error;
  }
};

// 특정 product_id 기반 로그 조회
export const fetchLogsByProductId = async (productId) => {
  try {
    // const response = await axios.get(`${statusprefix}/product/${productId}/logs`);
    const response = await axiosInstance.get(`${statusprefix}/product/${productId}/logs`);
    console.log("API에서 반환된 로그 데이터:", response.data); // API 반환 데이터 확인
    return response.data || []; // 데이터가 없으면 빈 배열 반환
  } catch (error) {
    console.error("상태 변경 로그 조회 실패:", error.message);
    return [];
  }
};

// 시설별 대여물품 상태 가져오기 (관리자용)
export const fetchProductStatusByFacility = async (facilityId) => {
  try {
    // const response = await axios.get(`${statusprefix}/${facilityId}`);
    const response = await axiosInstance.get(`${statusprefix}/${facilityId}`);
    return response.data || []; // 데이터가 없으면 빈 배열 반환
  } catch (error) {
    console.error("특정 시설 물품 상태 조회 실패:", error);
    return []; // 오류 발생 시 빈 배열 반환 
  }
};


// 시설별 대여물품 상태 수정 (관리자용)
export const updateProductStatus = async (statusId, changedStatus, quantity) => {
  try {
    // const response = await axios.put(
    const response = await axiosInstance.put(
      `${statusprefix}/update-status`,
      null,
      {
        params: {
          statusId,
          changedStatus,
          quantity,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("상태 업데이트 실패:", error.message);
    throw error;
  }
};


// 대여 가능 복구
export const restoreToAvailable = async (statusId) => {
  try {
    // await axios.put(`${statusprefix}/restore-status`, null, {
    await axiosInstance.put(`${statusprefix}/restore-status`, null, {
      params: { statusId },
    });
  } catch (error) {
    console.error("복구 실패:", error.message);
    throw error;
  }
};

// 시설별 대여물품 수량 수정 (관리자용)
export const updateProductStock = (productId, newStock) => {
  // return axios.put(`${statusprefix}/update-stock`, null, {
  return axiosInstance.put(`${statusprefix}/update-stock`, null, {
    params: {
      productId: productId,
      newStock: newStock
    }
  });
};

// 특정 상태 ID의 로그 조회
export const fetchLogsByStatusId = async (statusId) => {
  try {
    // const response = await axios.get(`${statusprefix}/status/${statusId}/logs`);
    const response = await axiosInstance.get(`${statusprefix}/status/${statusId}/logs`);
    console.log("API에서 반환된 로그 데이터:", response.data); // API 반환 데이터 확인
    return response.data || []; // 데이터가 없으면 빈 배열 반환
  } catch (error) {
    console.error("상태 변경 로그 조회 실패:", error.message);
    return [];
  }
};

// 첨부파일 조회
export const getProductFiles = async (productId) => {
  try {
    // const response = await axios.get(`${prefix}/files/${productId}`);
    const response = await axiosInstance.get(`${prefix}/files/${productId}`);
    console.log("첨부파일 조회 성공:", response.data);
    return response.data; // 파일 이름 리스트 반환
  } catch (error) {
    console.error("첨부파일 조회 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 첨부파일 삭제
export const deleteProductFile = async (productId, fileName) => {
  try {
    // const response = await axios.delete(
    const response = await axiosInstance.delete(
      `${prefix}/files/${productId}/${fileName}`
    );
    console.log("파일 삭제 성공:", response.data);
  } catch (error) {
    console.error("파일 삭제 실패:", error.response?.data || error.message);
  }
};

// 특정 상품의 상태별 수량 조회
export const fetchStatusCountsByProduct = async (productId) => {
  try {
    // const response = await axios.get(`${statusprefix}/status-counts/${productId}`);
    const response = await axiosInstance.get(`${statusprefix}/status-counts/${productId}`);
    return response.data;
  } catch (error) {
    console.error("상태별 수량 조회 실패:", error.response?.data || error.message);
    throw error;
  }
};
