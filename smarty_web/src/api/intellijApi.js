import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const productControllerPath = `${BASE_URL}/products`; // 상품 컨트롤러
const facilityControllerPath = `${BASE_URL}/facilities`; // 시설 컨트롤러
const productStatusControllerPath = `${BASE_URL}/product-status`; // 상품 상태 컨트롤러
const quantityControllerPath = `${BASE_URL}/product-quantities`; // 상품 수량 컨트롤러
const sizeControllerPath = `${BASE_URL}/product-sizes`; // 상품 사이즈 컨트롤러 

// Spring Boot에서 유저정보 가져오기
export const fetchUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

// Spring Boot에서 시설명 가져오기
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

// 새 대여물품 추가
export const addProduct = (product) => {
  return axios.post(productControllerPath, product);
};

// 대여물품 수정
export const updateProduct = (product) => {
  return axios.put(productControllerPath, product);
};

// 대여물품 삭제
export const deleteProduct = (productId) => {
  return axios.delete(`${productControllerPath}/${productId}`);
};

// Spring Boot에서 대여품 수량 가져오기
export const fetchQuantities = () => {
  return axios.get(quantityControllerPath);
};

// 상품별 재고 조회
export const fetchQuantitiesByProduct = (productId) => {
  return axios.get(`${quantityControllerPath}/${productId}`);
};

// 새로운 함수: 사이즈 정보를 포함한 quantity 데이터 가져오기
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
export const updateStock = (quantityId, stock) => {
  return axios.put(`${quantityControllerPath}/set-stock/${quantityId}`, null, {
      params: {
          stock,
      },
  });
};

// Spring Boot에서 대여품 사이즈 가져오기
export const fetchSizes = () => {
  return axios.get(sizeControllerPath);
};

// 대여품 상태 가져오기(관리자용)
export const fetchProductStatus = () => {
  return axios.get(`${productStatusControllerPath}/all`); // 수정: 전체 상태 조회 엔드포인트 명확히
};

// 상품별 사이즈 추가
export const addSizesToProduct = (productId, sizes) => {
  return axios.post(`${sizeControllerPath}/${productId}`, sizes);
};

// 대여품 상태 갱신
export const updateProductStatus = (statusId, newStatus) => {
  return axios.put(`${productStatusControllerPath}/${statusId}`, { status: newStatus });
}; 

// Spring Boot에서 예약정보 가져오기
export const fetchReservations = () => {
  return axios.get(`${BASE_URL}/reservations`);
};

// Spring Boot에서 대여정보 가져오기
export const fetchRentals = () => {
  return axios.get(`${BASE_URL}/rentals`);
};

// Spring Boot에서 수강정보 가져오기
export const fetchEnrollments = () => {
  return axios.get(`${BASE_URL}/enrollments`);
};
