import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/products`

// 상품 데이터 등록
export const postProductData = async (productData) => {
    try {
        const response = await axios.post(`${prefix}/data`, productData);
        console.log("상품 등록 성공:", response.data);
        return response.data; // productId 반환
    } catch (error) {
        console.error("상품 등록 실패:", error);
        throw error;
    }
};

// 파일 업로드
export const uploadProductFiles = async (productId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
        const response = await axios.post(`${prefix}/files/${productId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("파일 업로드 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("파일 업로드 실패:", error);
        throw error;
    }
};

export const getListProduct = async() => {
    const res = await axios.get(`${prefix}/list`)
    return res.data
}

export const getOneProduct = async(product_id) => {
    const res = await axios.get(`${prefix}/${product_id}`)
    return res.data
}

export const putOneProduct = async(product_id, product) => {
    const header = {headers: {"Content-Type": "multipart/form-data"}}
    const res = await axios.put(`${prefix}/${product_id}`, product, header)
    return res.data
}

export const deleteOneProduct = async(product_id) => {
    const res = await axios.delete(`${prefix}/${product_id}`)
    return res.data
}