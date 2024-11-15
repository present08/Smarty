import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { deleteProduct, getProductDetail } from '../../api/productAPI';
import ProductDetail from '../../component/product/ProductDetail';
import ActionButtons from '../../component/product/ActionButtons';
import MainNav from '../../component/MainNav';
import Wrapper from '../../component/Wrapper';
import Footer from '../../component/Footer';

const DetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    console.log("디테일페이지: ", product_id)

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await getProductDetail(product_id);
                setProduct(response);
            } catch (error) {
                setError('상품 정보를 불러오는데 실패했습니다.');
                console.log("디테일페이지 오류",error)
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [product_id]);

    const handleDelete = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteProduct(product_id)
                alert('삭제되었습니다.');
                navigate('/product');
            } catch (error) {
                setError('삭제에 실패했습니다.');
                console.error('Delete Error:', error);
            }
        }
    };

    const handleBack = () => {
        // 이전 페이지의 state가 있으면 해당 state와 함께 이동
        if (location.state?.from) {
            navigate(location.state.from.pathname, {
                state: { selectedFacility: location.state.selectedFacility }
            });
        } else {
            // state가 없으면 기본 목록으로 이동
            navigate('/product');
        }
    }

    if (loading) return <div className="text-xl text-center">로딩중...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!product) return <div className="text-center">상품을 찾을 수 없습니다.</div>;

    return (
        <div>
            <MainNav />
            <Wrapper />
            <ProductDetail product={product} />
            <div className="mt-8 flex gap-4 justify-end max-w-4xl mx-auto px-4">
                <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                    목록으로
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default DetailPage;