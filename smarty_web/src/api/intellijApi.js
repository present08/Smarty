import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const ADMIN_BASE_URL = 'http://localhost:8080/api/admin';
const USER_BASE_URL = 'http://localhost:8080/api/user';

const productControllerPath = `${BASE_URL}/products`; // 상품 컨트롤러
const facilityControllerPath = `${BASE_URL}/facilities`; // 시설 컨트롤러
const productStatusControllerPath = `${BASE_URL}/product-status`; // 상품 상태 컨트롤러
const quantityControllerPath = `${BASE_URL}/product-quantities`; // 상품 수량 컨트롤러
const sizeControllerPath = `${BASE_URL}/product-sizes`; // 상품 사이즈 컨트롤러

//admin api
const adminFacilityControllerPath = `${ADMIN_BASE_URL}/facilities`; // 시설 컨트롤러
const adminProductControllerPath = `${ADMIN_BASE_URL}/products`; // 상품 컨트롤러
const adminProductAttatchControllerPath = `${ADMIN_BASE_URL}/product-attaches`; // 상품 이미지 컨트롤러
const adminProductStatusControllerPath = `${ADMIN_BASE_URL}/product-status`; // 상품 상태 컨트롤러
const adminQuantityControllerPath = `${ADMIN_BASE_URL}/product-quantities`; // 상품 수량 컨트롤러
const adminSizeControllerPath = `${ADMIN_BASE_URL}/product-sizes`; // 상품 사이즈 컨트롤러

//user api
const userProductControllerPath = `${USER_BASE_URL}/products`; // 상품 컨트롤러
const userFacilityControllerPath = `${USER_BASE_URL}/facilities`; // 시설 컨트롤러
const userProductStatusControllerPath = `${USER_BASE_URL}/product-status`; // 상품 상태 컨트롤러
const userQuantityControllerPath = `${USER_BASE_URL}/product-quantities`; // 상품 수량 컨트롤러
const userSizeControllerPath = `${USER_BASE_URL}/product-sizes`; // 상품 사이즈 컨트롤러

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
export const registerProductAttach = (attachData) => {
  return axios.post(`${adminProductAttatchControllerPath}/register`, attachData)

}

// 대여품 수량 가져오기
export const fetchQuantities = () => {
  return axios.get(quantityControllerPath);
};

// 상품별 재고 조회
export const fetchQuantitiesByProduct = (productId) => {
  return axios.get(`${quantityControllerPath}/${productId}`);
};

// 사이즈 정보를 포함한 quantity 데이터 가져오기
export const fetchDetailsWithSizeByProductId = (productId) => {
  return axios.get(`${quantityControllerPath}/details-with-size/${productId}`);
};

// 전체 재고량 가져오기
export const fetchTotalStockByProduct = () => {
  return axios.get(`${quantityControllerPath}/total-stock`);
};

// 특정 상품의 개별 quantity_id 조회
export const fetchDetailsByProductId = (productId) => {
  return axios.get(`${quantityControllerPath}/details/${productId}`);
};

// 재고 수정
export const updateStock = (quantity_id, stock) => {
  return axios.put(`${quantityControllerPath}/set-stock/${quantity_id}`, null, {
      params: { stock },
  });
};

// 대여품 사이즈 가져오기
export const fetchSizes = () => {
  return axios.get(sizeControllerPath);
};

// 상품별 사이즈 추가
export const addSizesToProduct = (productId, sizes) => {
  return axios.post(`${sizeControllerPath}/${productId}`, sizes);
};

// 대여품 상태 가져오기 (관리자용)
export const fetchProductStatusByQuantityId = async (quantity_id) => {
  const url = `${productStatusControllerPath}/quantity/${quantity_id}`;
  const response = await axios.get(url);
  return response.data; // 상태 정보 반환
};

// 대여품 상태 갱신 (관리자용)
export const updateProductStatus = (quantity_id, newStatus) => { 
    const url = `${productStatusControllerPath}?quantity_id=${quantity_id}&status=${newStatus}`;
    return axios.put(url);
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
