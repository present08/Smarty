import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Spring Boot에서 유저정보 가져오기
export const fetchUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

// Spring Boot에서 시설명 가져오기
export const fetchFacilities = () => {
  return axios.get(`${BASE_URL}/facilities`);
};

// Spring Boot에서 대여품 가져오기
export const fetchProducts = () => {
  return axios.get(`${BASE_URL}/products`);
};

// Spring Boot에서 대여품 수량 가져오기
export const fetchQuantities = () => {
  return axios.get(`${BASE_URL}/product-quantities`);
};

// Spring Boot에서 대여품 사이즈 가져오기
export const fetchSizes = () => {
  return axios.get(`${BASE_URL}/product-sizes`);
};

// Spring Boot에서 대여품 상태 가져오기(관리자용))
export const fetchProductStatus = () => {
  return axios.get(`${BASE_URL}/product-status`);
};

// Spring Boot에서 예약정보 가져오기
export const fetchReservations = () => {
  return axios.get(`${BASE_URL}/reservations`);
};

// Spring Boot에서 대여정보 가져오기
export const fetchRentals = () => {
  return axios.get(`${BASE_URL}/rentals`)
};

// Spring Boot에서 수강정보 가져오기
export const fetchEnrollments = () => {
  return axios.get(`${BASE_URL}/enrollments`);
};