import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const ADMIN_BASE_URL = 'http://localhost:8080/api/admin';
const USER_BASE_URL = 'http://localhost:8080/api/user';

const productControllerPath = `${BASE_URL}/products`; // 상품 컨트롤러
const facilityControllerPath = `${BASE_URL}/facilities`; // 시설 컨트롤러
const productStatusControllerPath = `${BASE_URL}/product-status`; // 상품 상태 컨트롤러


//admin api
const adminFacilityControllerPath = `${ADMIN_BASE_URL}/facilities`; // 시설 컨트롤러
const adminProductControllerPath = `${ADMIN_BASE_URL}/products`; // 상품 컨트롤러
const adminProductAttatchControllerPath = `${ADMIN_BASE_URL}/product-attaches`; // 상품 이미지 컨트롤러
const adminProductStatusControllerPath = `${ADMIN_BASE_URL}/product-status`; // 상품 상태 컨트롤러


//user api
const userProductControllerPath = `${USER_BASE_URL}/products`; // 상품 컨트롤러
const userFacilityControllerPath = `${USER_BASE_URL}/facilities`; // 시설 컨트롤러
const userProductStatusControllerPath = `${USER_BASE_URL}/product-status`; // 상품 상태 컨트롤러

// 유저정보 가져오기
export const fetchUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

// 시설명 가져오기
export const fetchFacilities = () => {
  return axios.get(facilityControllerPath);
};

// 전체 대여품 가져오기
export const fetchProducts = () => {
  return axios.get(productControllerPath);
};

// 특정 상품 조회
export const fetchProductById = (productId) => {
  return axios.get(`${productControllerPath}/${productId}`);
};

// 특정 시설의 모든 대여물품 가져오기
export const fetchProductByFacility = (facilityId) => {
  return axios.get(`${productControllerPath}/facility/${facilityId}`);
};

// 새 대여물품 추가 (관리자용)
export const registerProduct = (productList) => {
  return axios.post(`${adminProductControllerPath}/register`, productList );
};

// 대여물품 수정 (관리자용)
export const updateProduct = (product) => {
  return axios.put(adminProductControllerPath, product);
};

// 대여물품 삭제 (관리자용)
export const deleteProduct = (productId) => {
  return axios.delete(`${adminProductControllerPath}/${productId}`);
};

// 대여물품 이미지 추가 (관리자용)
export const registerProductAttach = (productId, formData) => {
  return axios.post(`${adminProductAttatchControllerPath}/register/${productId}`, formData);
};


// 시설별 대여물품 상태 가져오기 (관리자용)
export const fetchProductStatusByFacility = (facilityId) => {
  return axios.get(`${productStatusControllerPath}/facility/${facilityId}`);
}

// 시설별 대여물품 상태 수정 (관리자용)
export const updateProductStatus = (statusId, newStatus) => {
  return axios.put(`${adminProductStatusControllerPath}/update-status`, {
      statusId, newStatus
  });
};

// 시설별 대여물품 수량 수정 (관리자용)
export const updateProductStock = (productId, newStock) => {
  return axios.put(`${adminProductStatusControllerPath}/update-stock`, {
      productId, newStock
  });
};


// 예약정보 가져오기
export const fetchReservations = () => {
  return axios.get(`${BASE_URL}/reservations`);
};

// 대여정보 가져오기
export const fetchRentals = () => {
  return axios.get(`${BASE_URL}/rentals`);
};

// 수강정보 가져오기
export const fetchEnrollments = () => {
  return axios.get(`${BASE_URL}/enrollments`);
};
