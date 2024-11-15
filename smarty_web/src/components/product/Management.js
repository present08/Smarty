import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Select, notification, Button, Spin } from 'antd';
import {
    fetchProductStatusByFacility, fetchFacilities, updateProductStatus, updateProductStock
} from '../../api/intellijApi';
import * as XLSX from 'xlsx';
import '../css/Management.css';

const { Option } = Select;

const Management = () => {
    const [data, setData] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modifiedData, setModifiedData] = useState({});

    useEffect(() => {
        fetchFacilities()
            .then(response => {
                setFacilities([{
                    facility_id: '',
                    facility_name: '================'
                }, ...response.data]);
            })
            .catch(error => {
                console.error("시설 목록을 불러오는 중 오류 발생 : ", error);
            });
    }, []);

    const fetchData = async () => {
        if (selectedFacility) {
            setLoading(true);
            try {
                const response = await fetchProductStatusByFacility(selectedFacility);
                setData(response.data);
                setModifiedData({});
            } catch (error) {
                console.error("데이터 가져오는 중 오류 발생:", error);
                notification.error({
                    message: '데이터 가져오기 실패',
                    description: '상품 데이터를 가져오는 중 오류가 발생했습니다.'
                });
            } finally {
                setLoading(false);
            }
        } else {
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedFacility]);

    const handleStatusChange = (value, record) => {
        setModifiedData((prev) => ({
            ...prev,
            [record.status_id]: { ...prev[record.status_id], product_status: value }
        }));
    };

    const handleStockChange = (change, record) => {
        const newStock = record.stock + change;
        if (newStock >= 0) {
            setModifiedData((prev) => ({
                ...prev,
                [record.status_id]: { ...prev[record.status_id], stock: newStock }
            }));
        } else {
            notification.warning({
                message: '재고 부족',
                description: '재고가 부족하여 감소할 수 없습니다.'
            });
        }
    };

    const handleSaveChanges = (record) => {
        const modifiedRecord = modifiedData[record.status_id];
        const isStatusChanged = modifiedRecord?.product_status !== undefined 
            && modifiedRecord.product_status !== record.product_status;

        const isStockChanged = modifiedRecord?.stock !== undefined
            && modifiedRecord.stock !== record.stock;

        // 상태 또는 수량이 변경된 경우만 저장을 진행
        if (isStatusChanged || isStockChanged) {
            const promises = [
                isStatusChanged 
                    ? updateProductStatus(record.status_id, modifiedRecord.product_status)
                    : Promise.resolve(),
                isStockChanged
                    ? updateProductStock(record.product_id, modifiedRecord.stock)
                    : Promise.resolve()
            ];

            Promise.all(promises)
                .then(() => {
                    notification.success({
                        message: '변경 사항이 적용되었습니다.',
                        description: '해당 품목의 변경된 내용이 데이터베이스에 저장되었습니다.'
                    });
                    fetchData();
                })
                .catch(error => {
                    console.error("변경 적용 중 오류 발생: ", error);
                    notification.error({
                        message: '변경 실패',
                        description: '변경 적용 중 오류 발생'
                    });
                });
        }
    };

    const handleBulkSaveChanges = () => {
        const updates = selectedRowKeys.map(key => {
            const modifiedRecord = modifiedData[key];
            const record = data.find(item => item.status_id === key);
            if (!modifiedRecord) return null;

            const isStatusChanged = modifiedRecord.product_status !== undefined 
                && modifiedRecord.product_status !== record.product_status;

            const isStockChanged = modifiedRecord.stock !== undefined
                && modifiedRecord.stock !== record.stock;

            if (isStatusChanged || isStockChanged) {
                return Promise.all([
                    isStatusChanged 
                        ? updateProductStatus(record.status_id, modifiedRecord.product_status)
                        : Promise.resolve(),
                    isStockChanged
                        ? updateProductStock(record.product_id, modifiedRecord.stock)
                        : Promise.resolve()
                ]);
            } else {
                return null;
            }
        }).filter(Boolean); // null 필터링

        Promise.all(updates)
            .then(() => {
                notification.success({
                    message: '선택된 항목 저장 완료',
                    description: '선택된 품목의 변경된 내용이 데이터베이스에 저장되었습니다.'
                });
                fetchData();
                setSelectedRowKeys([]);
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

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <div className="management-container">
            <h1 className="management-title">대여 품목 관리 대시보드</h1>
            <Select
                className="management-select"
                onChange={(value) => setSelectedFacility(value)}
                value={selectedFacility}
            >
                {facilities.map(facility => (
                    <Option key={facility.facility_id} value={facility.facility_id}>
                        {facility.facility_name}
                    </Option>
                ))}
            </Select>
            <Button type='primary' onClick={exportToExcel} className="management-button">
                엑셀 파일로 내보내기
            </Button>
            <Button type='primary' onClick={handleBulkSaveChanges} className="management-button">
                선택된 항목 저장
            </Button>
            {loading ? (
                <Spin size="large" className="management-spinner" />
            ) : (
                <Table
                    rowSelection={rowSelection}
                    dataSource={data}
                    columns={[
                        { title: '상품명', dataIndex: 'product_name', key: 'product_name' },
                        { title: '상태 ID', dataIndex: 'status_id', key: 'status_id' },
                        {
                            title: '현재 상태',
                            dataIndex: 'product_status',
                            key: 'product_status',
                            render: (text) => (
                                <span>{text || '대여 가능'}</span>
                            )
                        },
                        {
                            title: '상태 변경',
                            dataIndex: 'product_status',
                            key: 'product_status',
                            render: (text, record) => (
                                <Select
                                    value={modifiedData[record.status_id]?.product_status || '대여 가능'}
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
                                <div className="stock-control-container">
                                    <Button onClick={() => handleStockChange(-1, record)} className="stock-control-button">&lt;</Button>
                                    <InputNumber
                                        value={modifiedData[record.status_id]?.stock ?? record.stock}
                                        readOnly
                                        className="stock-display"
                                    />
                                    <Button onClick={() => handleStockChange(1, record)} className="stock-control-button">&gt;</Button>
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
                    rowKey="status_id"
                    className="management-table"
                />
            )}
        </div>
    );
};

export default Management;
