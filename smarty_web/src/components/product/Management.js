import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Select, notification, Button, Spin } from 'antd';
import { fetchProductByFacility, fetchFacilities, fetchDetailsWithSizeByProductId, fetchProductStatusByQuantityId, updateProductStatus, updateStock } from '../../api/intellijApi';
import * as XLSX from 'xlsx';

const { Option } = Select;

const Management = () => {
    const [data, setData] = useState([]); // 데이터 상태를 저장
    const [facilities, setFacilities] = useState([]); // 시설 목록 상태
    const [selectedFacility, setSelectedFacility] = useState(''); // 기본값을 빈 문자열로 설정
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 추가된 상태: 변경할 상태와 재고를 저장할 객체
    const [pendingChanges, setPendingChanges] = useState({});

    useEffect(() => {
        fetchFacilities()
            .then(response => {
                setFacilities([{ facility_id: '', facility_name: '================' }, ...response.data]);
            })
            .catch(error => {
                console.error("시설 목록을 불러오는 중 오류 발생 : ", error);
            });
    }, []);

    const fetchData = async () => {
        if (selectedFacility) {
            setLoading(true); // 로딩 시작
            try {
                const products = await fetchProductByFacility(selectedFacility);
                const productsWithStatus = await Promise.all(products.data.map(async (product) => {
                    const quantitiesResponse = await fetchDetailsWithSizeByProductId(product.product_id);
                    const quantitiesWithStatus = await Promise.all(quantitiesResponse.data.map(async (quantity) => {
                        const quantityId = quantity.quantity_id;
                        const statusResponse = await fetchProductStatusByQuantityId(quantityId);
                        const currentStatus = statusResponse ? statusResponse.status : "대여 가능";
                        return {
                            ...quantity,
                            product_name: product.product_name + (quantity.cloth_size || quantity.shoe_size ? `_${quantity.cloth_size || quantity.shoe_size}` : ''),
                            current_status: currentStatus
                        };
                    }));
                    return quantitiesWithStatus;
                }));
                setData(productsWithStatus.flat());
            } catch (error) {
                console.error("데이터 가져오는 중 오류 발생:", error);
                notification.error({
                    message: '데이터 가져오기 실패',
                    description: '상품 데이터를 가져오는 중 오류가 발생했습니다.'
                });
            } finally {
                setLoading(false); // 로딩 종료
            }
        } else {
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedFacility]);

    // 상태 변경 핸들러
    const handleStatusChange = (value, record) => {
        setPendingChanges((prev) => ({
            ...prev,
            [record.quantity_id]: {
                ...prev[record.quantity_id],
                status: value
            }
        }));
        setData((prevData) =>
            prevData.map((item) => (item.quantity_id === record.quantity_id ? { ...item, status: value } : item))
        );
    };

    // 재고 변경 핸들러
    const handleStockChange = (change, record) => {
        const newStock = record.stock + change;
        if (newStock >= 0) {
            setPendingChanges((prev) => ({
                ...prev,
                [record.quantity_id]: {
                    ...prev[record.quantity_id],
                    stock: newStock
                }
            }));
            setData((prevData) =>
                prevData.map((item) => (item.quantity_id === record.quantity_id ? { ...item, stock: newStock } : item))
            );
        } else {
            notification.warning({
                message: '재고 부족',
                description: '재고가 부족하여 감소할 수 없습니다.'
            });
        }
    };
    
    const handleSaveChanges = (record) => {
        // 변경된 상태 및 재고 값을 가져오기
        const changes = pendingChanges[record.quantity_id] || {}; 
        const newStatus = changes.status || record.status; // 새로운 상태
        const newStock = changes.stock !== undefined ? changes.stock : record.stock; // 새로운 재고
    
        if (!newStatus) {
            notification.error({
                message: '상태 오류',
                description: '상태가 설정되지 않았습니다. 상태를 선택해 주세요.'
            });
            return; // 함수 종료
        }
    
        // 상태 업데이트 API 호출
        updateProductStatus(record.quantity_id, newStatus)
            .then(() => {
                // 재고 업데이트 API 호출
                return updateStock(record.quantity_id, newStock);
            })
            .then(() => {
                notification.success({
                    message: '변경 사항이 적용되었습니다.',
                    description: '해당 품목의 변경된 내용이 데이터베이스에 저장되었습니다.'
                });
                fetchData(); // 데이터 새로 고침
            })
            .catch(error => {
                console.error("변경 적용 중 오류 발생: ", error);
                notification.error({
                    message: '변경 실패',
                    description: '변경 적용 중 오류 발생'
                });
            });
    };
    
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rental Data");
        XLSX.writeFile(workbook, "rental_data.xlsx");
        notification.success({
            message: '엑셀 파일 생성 완료',
            description: '조회된 데이터가 엑셀 파일로 다운로드 완료'
        });
    };

    return (
        <div>
            <h1>대여 품목 관리 대시보드</h1>
            <Select
                style={{ width: 200, marginBottom: 20 }}
                onChange={(value) => setSelectedFacility(value)}
                value={selectedFacility}
            >
                {facilities.map(facility => (
                    <Option key={facility.facility_id} value={facility.facility_id}>
                        {facility.facility_name}
                    </Option>
                ))}
            </Select>
            <Button type='primary' onClick={exportToExcel} style={{ marginBottom: 20 }}>
                엑셀 파일로 내보내기
            </Button>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table
                    dataSource={data}
                    columns={[
                        { title: '상품명', dataIndex: 'product_name', key: 'product_name' },
                        { title: '수량 ID', dataIndex: 'quantity_id', key: 'quantity_id' },
                        {
                            title: '현재 상태',
                            dataIndex: 'current_status',
                            key: 'current_status',
                            render: (text) => (
                                <span>{text}</span>
                            )
                        },
                        {
                            title: '상태 변경',
                            dataIndex: 'status',
                            key: 'status',
                            render: (text, record) => (
                                <Select
                                    value={record.status || '대여 가능'}
                                    onChange={(value) => handleStatusChange(value, record)}
                                    style={{ minWidth: 120 }}
                                >
                                    <Option value='손상'>손상</Option>
                                    <Option value='수리 필요'>수리 필요</Option>
                                    <Option value='재구매 필요'>재구매 필요</Option>
                                    <Option value='대여 가능'>대여 가능</Option>
                                </Select>
                            )
                        },
                        { title: '재고', dataIndex: 'stock', key: 'stock',
                            render: (text, record) => (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button onClick={() => handleStockChange(-1, record)}>&lt;</Button>
                                    <InputNumber
                                        value={record.stock}
                                        readOnly
                                        style={{ width: 60, margin: '0 10px' }}
                                    />
                                    <Button onClick={() => handleStockChange(1, record)}>&gt;</Button>
                                </div>
                            )
                        },
                        { title: '업데이트 시각', dataIndex: 'updated_at', key: 'updated_at' },
                        {
                            title: '작업',
                            key: 'action',
                            render: (text, record) => (
                                <Button onClick={() => handleSaveChanges(record)}>저장</Button>
                            )
                        }
                    ]}
                    rowKey="quantity_id"
                />
            )}
        </div>
    );
};

export default Management;
