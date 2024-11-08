import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Select, notification, Button, Spin } from 'antd';
import {
    fetchProductByFacility, fetchFacilities, fetchDetailsWithSizeByProductId,
    fetchProductStatusByQuantityId, updateProductStatus, updateStock
} from '../../api/intellijApi';
import * as XLSX from 'xlsx';

const { Option } = Select;

const Management = () => {
    const [data, setData] = useState([]); // 테이블 데이터 상태
    const [facilities, setFacilities] = useState([]); // 시설 목록 상태
    const [selectedFacility, setSelectedFacility] = useState(''); // 선택된 시설
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 체크된 행의 키를 저장할 상태

    // 시설 목록을 가져오는 useEffect
    useEffect(() => {
        fetchFacilities()
            .then(response => {
                setFacilities([{
                    facility_id: '',
                    facility_name: '================'
                }, ...response.data]); // 기본값 포함하여 시설 목록 설정
            })
            .catch(error => {
                console.error("시설 목록을 불러오는 중 오류 발생 : ", error);
            });
    }, []);

    // 선택된 시설에 따른 데이터 가져오기
    const fetchData = async () => {
        if (selectedFacility) {
            setLoading(true); // 로딩 시작
            try {
                const products = await fetchProductByFacility(selectedFacility);
                console.log("Fetched products:", products.data);

                // 상품 목록과 상태 정보를 가져옴
                const productsWithStatus = await Promise.all(products.data.map(async (product) => {
                    const quantitiesResponse = await fetchDetailsWithSizeByProductId(product.product_id);
                    const quantitiesWithStatus = await Promise.all(quantitiesResponse.data.map(async (quantity) => {
                        const quantityId = quantity.quantity_id;
                        const statusResponse = await fetchProductStatusByQuantityId(quantityId);
                        const currentStatus = statusResponse ? statusResponse.status : "대여 가능";

                        return {
                            ...quantity,
                            product_name: product.product_name + (quantity.cloth_size || quantity.shoe_size ?
                                `_${quantity.cloth_size || quantity.shoe_size}` : ''),
                            current_status: currentStatus // 현재 상태 추가
                        };
                    }));

                    return quantitiesWithStatus; // 각 상품의 수량 정보 반환
                }));

                setData(productsWithStatus.flat()); // 플랫하여 최종 데이터 설정
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
            setData([]); // 선택된 시설이 없을 경우 데이터 초기화
        }
    };

    // 선택된 시설이 변경될 때마다 데이터 새로 고침
    useEffect(() => {
        fetchData();
    }, [selectedFacility]);

    // 상태 변경 핸들러
    const handleStatusChange = (value, record) => {
        const updatedItem = { ...record, status: value }; // 상태 변경
        setData((prevData) =>
            prevData.map((item) => (item.quantity_id === record.quantity_id ? updatedItem : item))
        );
        console.log("Updated status:", value);
    };

    // 재고 변경 핸들러
    const handleStockChange = (change, record) => {
        const newStock = record.stock + change; // 새로운 재고 계산
        if (newStock >= 0) {
            const updatedItem = { ...record, stock: newStock }; // 재고 변경
            setData((prevData) =>
                prevData.map((item) => (item.quantity_id === record.quantity_id ? updatedItem : item))
            );
        } else {
            notification.warning({
                message: '재고 부족',
                description: '재고가 부족하여 감소할 수 없습니다.'
            });
        }
    };

    // 개별 항목 저장 핸들러
    const handleSaveChanges = (record) => {
        console.log("Saving changes for:", record);
        const statusToUpdate = record.status || '대여 가능'; // 상태 설정
        const currentStatus = record.current_status;
        const statusChanged = currentStatus !== statusToUpdate; // 상태 변경 여부 체크

        // 상태와 재고 업데이트
        Promise.all([
            updateProductStatus(record.quantity_id, statusChanged ? statusToUpdate : currentStatus), // 상태 업데이트
            updateStock(record.quantity_id, record.stock) // 재고 업데이트
        ])
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

    // 다중 선택 저장 핸들러
    const handleBulkSaveChanges = () => {
        const updates = selectedRowKeys.map(key => {
            const record = data.find(item => item.quantity_id === key); // 체크된 항목 찾기
            const statusToUpdate = record.status || '대여 가능'; // 상태 설정
            const currentStatus = record.current_status;
            const statusChanged = currentStatus !== statusToUpdate; // 상태 변경 여부 체크

            return Promise.all([
                updateProductStatus(record.quantity_id, statusChanged ? statusToUpdate : currentStatus), // 상태 업데이트
                updateStock(record.quantity_id, record.stock) // 재고 업데이트
            ]);
        });

        Promise.all(updates)
            .then(() => {
                notification.success({
                    message: '선택된 항목 저장 완료',
                    description: '선택된 품목의 변경된 내용이 데이터베이스에 저장되었습니다.'
                });
                fetchData(); // 데이터 새로 고침
                setSelectedRowKeys([]); // 체크박스 초기화
            })
            .catch(error => {
                console.error("변경 적용 중 오류 발생: ", error);
                notification.error({
                    message: '변경 실패',
                    description: '변경 적용 중 오류 발생'
                });
            });
    };

    // 엑셀로 내보내기 핸들러
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

    // 테이블에서 체크박스 설정
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys); // 체크된 행의 키 상태 업데이트
        },
    };

    return (
        <div>
            <h1>대여 품목 관리 대시보드</h1>
            <Select
                style={{ width: 200, marginBottom: 20 }}
                onChange={(value) => setSelectedFacility(value)} // 시설 선택 변경
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
            <Button type='primary' onClick={handleBulkSaveChanges} style={{ marginBottom: 20 }}>
                선택된 항목 저장
            </Button>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table
                    rowSelection={rowSelection} // 체크박스 설정
                    dataSource={data}
                    columns={[
                        {
                            title: '선택',
                            dataIndex: 'selection',
                            render: (_, record) => (
                                <input
                                    type="checkbox"
                                    checked={selectedRowKeys.includes(record.quantity_id)} // 체크 상태
                                    onChange={() => {
                                        const newSelectedRowKeys = selectedRowKeys.includes(record.quantity_id)
                                            ? selectedRowKeys.filter(key => key !== record.quantity_id)
                                            : [...selectedRowKeys, record.quantity_id];
                                        setSelectedRowKeys(newSelectedRowKeys); // 체크박스 상태 업데이트
                                    }}
                                />
                            ),
                        },
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
                                    onChange={(value) => handleStatusChange(value, record)} // 상태 변경 핸들러
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
                                <Button onClick={() => handleSaveChanges(record)}>저장</Button> // 개별 저장 버튼
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