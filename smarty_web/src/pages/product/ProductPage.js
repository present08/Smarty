import React, { useEffect, useState } from 'react';
import { getFailityData, getProduct } from '../../api/productApi';
import Footer from '../../component/Footer';
import MainNav from '../../component/MainNav';
import Wrapper from '../../component/Wrapper';
import FacilitySelect from '../../component/product/FacilitySelect';
import Pagenation from '../../component/product/Pagenation';
import '../../css/productPage.css'

const ProductPage = () => {
  
  const [facility, setFacility] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState(localStorage.getItem('selectedFacility') || '');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facilityData, productData] = await Promise.all([
          getFailityData(),
          getProduct()
        ]);
        setFacility(facilityData);
        setProduct(productData);

        if (selectedFacility) {
          setFilteredProducts(productData.filter(item => item.facility_id === selectedFacility));
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFacility]);

  useEffect(() => {
    setSelectedFacility('')
  }, [])
  

  const handleChangeRental = (e) => { 
    const selectedValue = e.target.value
    setSelectedFacility(e.target.value);
    localStorage.setItem('selectedFacility', selectedValue)
  };

  return (
    <div>
      <MainNav />
      <Wrapper />
      <div className='list-container'>
        <div className='container mx-auto px-4'>
          {loading ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : (
            <>
              <FacilitySelect
                facility={facility}
                selectedFacility={selectedFacility}
                handleChangeRental={handleChangeRental}
                filteredProducts={filteredProducts}
              />
              <Pagenation
                products={selectedFacility ? filteredProducts : product}
                selectedFacility={selectedFacility}
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;