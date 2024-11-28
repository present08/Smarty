import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { getProductRentalUser } from '../../api/userApi';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, pdf, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Nanum Gothic',
    src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf',
});

const styles = StyleSheet.create({
    page: { fontFamily: 'Nanum Gothic', backgroundColor: '#FFFFFF', padding: 40, },
    header: { marginBottom: 30, borderBottom: '2 solid #EEEEEE', paddingBottom: 20, },
    title: { fontSize: 28, textAlign: 'center', marginBottom: 15, color: '#2B3A55', fontWeight: 'bold', },
    companyInfo: { fontSize: 11, color: '#666666', textAlign: 'center', lineHeight: 1.5, },
    receiptInfo: { marginBottom: 30, fontSize: 11, backgroundColor: '#F8F9FA', padding: 15, borderRadius: 5, },
    infoRow: { flexDirection: 'row', marginBottom: 8, alignItems: 'center', },
    label: { width: 100, color: '#2B3A55', fontWeight: 'bold', },
    value: { flex: 1, color: '#333333', },
    table: { marginBottom: 30, },
    tableHeader: { flexDirection: 'row', backgroundColor: '#2B3A55', paddingVertical: 10, paddingHorizontal: 8, color: 'white', fontSize: 11, fontWeight: 'bold', marginBottom: 2, },
    tableRow: { flexDirection: 'row', borderBottomColor: '#EEEEEE', borderBottomWidth: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 11, color: '#333333', },
    col1: { width: '50%', }, col2: { width: '15%', textAlign: 'center', }, col3: { width: '35%', textAlign: 'right', },
    summary: { marginTop: 30, backgroundColor: '#F8F9FA', padding: 20, borderRadius: 5, },
    summaryRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8, fontSize: 11, },
    summaryLabel: { width: 120, textAlign: 'right', marginRight: 15, color: '#2B3A55', fontWeight: 'bold', },
    summaryValue: { width: 100, textAlign: 'right', color: '#333333', },
    totalRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#DDDDDD', },
    totalLabel: { width: 120, textAlign: 'right', marginRight: 15, color: '#2B3A55', fontWeight: 'bold', fontSize: 13, },
    totalValue: { width: 100, textAlign: 'right', color: '#2B3A55', fontWeight: 'bold', fontSize: 13, },
    footer: { position: 'absolute', bottom: 40, left: 40, right: 40, fontSize: 9, color: '#888888', textAlign: 'center', borderTop: '1 solid #EEEEEE', paddingTop: 20, lineHeight: 1.5, },
});

// PDF 렌더링
const ReceiptDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>영수증</Text>
                <Text style={styles.companyInfo}>
                    SMARTY{'\n'}
                    경기 성남시 분당구 돌마로 46 5층{'\n'}
                    Tel: 031-712-7447
                </Text>
            </View>

            <View style={styles.receiptInfo}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>발행일</Text>
                    <Text style={styles.value}>{data.date}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>고객명</Text>
                    <Text style={styles.value}>{data.customerName}</Text>
                </View>
            </View>

            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.col1}>품목</Text>
                    <Text style={styles.col2}>사이즈</Text>
                    <Text style={styles.col3}>금액</Text>
                </View>
                {data.items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.col1}>{item.name}</Text>
                        <Text style={styles.col2}>{item.size}</Text>
                        <Text style={styles.col3}>{item.price.toLocaleString()}원</Text>
                    </View>
                ))}
            </View>

            <View style={styles.summary}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>부가세 (10%)</Text>
                    <Text style={styles.summaryValue}>
                        {(data.items.reduce((sum, item) => sum + item.price, 0) * 0.1).toLocaleString()}원
                    </Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>합계</Text>
                    <Text style={styles.totalValue}>
                        {(data.items.reduce((sum, item) => sum + item.price, 0) * 1.1).toLocaleString()}원
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text>
                    본 영수증은 공식 영수증으로 사용될 수 있습니다.{'\n'}
                    문의사항: SMARTY.kr | www.SMARTY.kr{'\n'}
                    Copyright © 2024 SMARTY Company. All rights reserved.
                </Text>
            </View>
        </Page>
    </Document>
);

// ReceiptButton 컴포넌트
const ReceiptButton = ({ user }) => {
    const [rentalData, setRentalData] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchRentalData = async () => {
                try {
                    const response = await getProductRentalUser(user.user_id);
                    setRentalData(response || []);
                } catch (error) {
                    console.error('Error fetching rental data:', error);
                }
            };
            fetchRentalData();
        }
    }, [user]);

    const receiptData = {
        date: new Date().toLocaleDateString(),
        customerName: user?.user_name || 'N/A',
        items: rentalData.map(item => ({
            name: item.product_name,
            size: item.size || 'N/A',
            price: item.price || 0,
        })),
    };


    // 모달 열기
    const receiptModalOpen = () => {
        setModal(true);
    };

    // 모달 닫기
    const receiptModalClose = (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        setModal(false);
    };

    const handleDownload = async () => {
        // PDF 문서 생성
        const blob = await pdf(<ReceiptDocument data={receiptData} />).toBlob();

        // 다운로드 링크 생성
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '영수증.pdf';

        // 다운로드 실행
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div onClick={handleDownload} style={{ width: '90%', height: '85px', backgroundColor: '#58a3bc', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', margin: '0 auto', borderRadius: '20px' }}>
            <div style={{ width: '100%', height: '100%', }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50px', border: 'none', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                            <FaUser style={{ color: 'white ', width: '30px', height: '30px', }} />
                        </div>
                    </div>
                    <div style={{ width: '70%', height: '60%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <h3 style={{ marginTop: '0.3rem', color: 'white' }}>영수증 발급</h3>
                        <p style={{ fontSize: '12px', marginTop: '0.5rem', color: 'white', fontWeight: '400' }}>영수증이 필요하시면 눌러주세요~</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ReceiptButton;