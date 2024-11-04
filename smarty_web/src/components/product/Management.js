import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Select, notification, Button, Modal } from 'antd';
import { fetchProductByFacility, fetchFacilities, fetchProductStatus, updateProductStatus, updateStock } from '../../api/intellijApi';
import * as XLSX from 'xlsx';

const { Option } = Select;

const Management = () => {
    const [data, setData] = useState([]); // 데이터 상태를 저장
    const [facilities, setFacilities] = useState([]); // 시설 목록 상태
    const [selectedFacility, setSelectedFacility] = useState('all'); // 선택된 시설
    const [pendingChanges, setPendingChanges] = useState([]); // 변경 사항 추적
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 창 상태

    useEffect(() => {
        fetchFacilities()
            .then(response => {
                setFacilities(response.data); // 시설 목록 설정
            })
            .catch(error => {
                console.error("시설 목록을 불러오는 중 오류 발생 : ", error);
            });
    }, []);

    useEffect(() => {
        // 선택된 시설에 따라 데이터를 불러옴
        if (selectedFacility === 'all') {
            fetchProductStatus()
                .then(response => setData(response.data)) // 전체 물품 상태 데이터를 설정
                .catch(error => console.error("전체 물품 상태 데이터를 불러오는 중 오류 발생:", error));
        } else {
            fetchProductByFacility(selectedFacility)
                .then(response => setData(response.data)) // 특정 시설의 물품 상태 데이터를 설정
                .catch(error => console.error(`${selectedFacility}의 물품 상태 데이터를 불러오는 중 오류 발생:`, error));
        }
    }, [selectedFacility]);

    // 상태 변경 핸들러 (변경 사항을 pendingChanges에 추가)
    const handleStatusChange = (value, record) => {
        const updatedItem = { ...record, status: value };
        setPendingChanges((prevChanges) => {
            const existingIndex = prevChanges.findIndex(item => item.quantity_id === record.quantity_id);
            if (existingIndex !== -1) {
                const updatedChanges = [...prevChanges];
                updatedChanges[existingIndex] = updatedItem;
                return updatedChanges;
            }
            return [...prevChanges, updatedItem];
        });
        setData((prevData) =>
            prevData.map((item) => (item.quantity_id === record.quantity_id ? updatedItem : item))
        );
    };

    // 재고 변경 핸들러 (재고 증감 시 데이터와 pendingChanges 업데이트)
    const handleStockChange = (change, record) => {
        const newStock = record.stock + change;
        if (newStock >= 0) {
            const updatedItem = { ...record, stock: newStock };
            setPendingChanges((prevChanges) => {
                const existingIndex = prevChanges.findIndex(item => item.quantity_id === record.quantity_id);
                if (existingIndex !== -1) {
                    const updatedChanges = [...prevChanges];
                    updatedChanges[existingIndex] = updatedItem;
                    return updatedChanges;
                }
                return [...prevChanges, updatedItem];
            });
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

    // 모달 창 열기
    const showModal = () => {
        setIsModalVisible(true);
    };

    // 변경 사항을 데이터베이스에 적용
    const handleConfirmChanges = () => {
        Promise.all(
            pendingChanges.map((change) =>
                updateProductStatus(change.product_id, change.status).then(() => updateStock(change.quantity_id, change.stock))
            )
        ).then(() => {
            notification.success({
                message: '변경 사항이 적용되었습니다.',
                description: '모든 변경된 내용이 데이터베이스에 저장되었습니다.'
            });
            setPendingChanges([]); // 변경 사항 초기화
            setIsModalVisible(false);
        }).catch(error => {
            console.error("변경 적용 중 오류 발생: ", error);
            notification.error({
                message: '변경 실패',
                description: '변경 적용 중 오류 발생'
            });
        });
    };

    // 변경 사항 취소
    const handleCancelChanges = () => {
        setIsModalVisible(false);
    };

    // 엑셀 파일 내보내기
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
            {/* 시설 선택 Dropdown */}
            <Select
                style={{ width: 200, marginBottom: 20 }}
                onChange={(value) => setSelectedFacility(value)}
                defaultValue="all"
            >
                <Option value="all">모든 시설</Option>
                {facilities.map(facility => (
                    <Option key={facility.facility_id} value={facility.facility_id}>
                        {facility.facility_name}
                    </Option>
                ))}
            </Select>
            {/* 엑셀 내보내기 버튼 */}
            <Button type='primary' onClick={exportToExcel} style={{ marginBottom: 20 }}>
                엑셀 파일로 내보내기
            </Button>
            {/* 테이블 렌더링 */}
            <Table
                dataSource={data}
                columns={[
                    { title: '상품명', dataIndex: 'product_name', key: 'product_name' }, // 상품명 열
                    { title: '상품 ID', dataIndex: 'product_id', key: 'product_id' }, // 상품 ID 열
                    {
                        title: '전체 재고량',
                        dataIndex: 'total_stock',
                        key: 'total_stock',
                        render: (text) => text || 'N/A' // 전체 재고량 표시, 없을 경우 N/A
                    },
                    {
                        title: '재고',
                        dataIndex: 'stock',
                        key: 'stock',
                        render: (text, record) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {/* 재고 감소 버튼 */}
                                <Button onClick={() => handleStockChange(-1, record)}>&lt;</Button>
                                <InputNumber
                                    value={record.stock} // 현재 재고 수량
                                    readOnly
                                    style={{ width: 60, margin: '0 10px' }}
                                />
                                {/* 재고 증가 버튼 */}
                                <Button onClick={() => handleStockChange(1, record)}>&gt;</Button>
                            </div>
                        )
                    },
                    {
                        title: '상태',
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
                    { title: '업데이트 시각', dataIndex: 'updated_at', key: 'updated_at' } // 업데이트 시각 열
                ]}
                rowKey="quantity_id" // 고유 키 설정
            />
            {/* 변경 확인 버튼 */}
            <Button type='primary' onClick={showModal} style={{ marginTop: 20 }}>변경 확인</Button>
            {/* 모달 창 */}
            <Modal
                title='변경 사항 확인'
                open={isModalVisible}
                onOk={handleConfirmChanges}
                onCancel={handleCancelChanges}
            >
                <p>선택된 변경 사항을 저장하시겠습니까?</p>
            </Modal>
        </div>
    );
};

export default Management;
