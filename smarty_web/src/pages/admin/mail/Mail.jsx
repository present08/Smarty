import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    TextField,
    Button,
    Typography,
    Stack,
    Snackbar,
} from '@mui/material';
import { getMailList, sendMail } from '../../../api/admin/mailApi';

export default function Mail() {
    const [users, setUsers] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [customEmail, setCustomEmail] = useState('');
    const [customUserName, setCustomUserName] = useState('');
    const [mailContent, setMailContent] = useState({
        subject: '',
        content: '',
    });
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // 메일 리스트 불러오기
    useEffect(() => {
        const fetchMailList = async () => {
            try {
                const data = await getMailList();
                setUsers(data);
            } catch (error) {
                console.error('메일 리스트 불러오기 실패:', error);
                // 에러 처리 로직 추가 필요
            }
        };

        fetchMailList();
    }, []);

    // 사용자 수신자 목록에 추가
    const handleAddRecipient = (user) => {
        setRecipients(prev => {
            if (prev.find(r => r.email === user.email)) {
                return prev;
            }
            return [...prev, user];
        });
    };

    // 수신자 목록에서 제거
    const handleRemoveRecipient = (email) => {
        setRecipients(prev => prev.filter(r => r.email !== email));
    };

    // 직접 입력한 이메일 추가
    const handleAddCustomEmail = () => {
        if (customEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customEmail)) {
            handleAddRecipient({
                email: customEmail,
                user_name: customUserName || '직접 입력'
            });
            setCustomEmail('');
            setCustomUserName('');
        }
    };

    // 메일 발송 처리
    const handleSendMail = async () => {
        setLoading(true);
        try {
            const emailList = recipients.map(r => r.email);
            const requestData = {
                email: emailList,
                subject: mailContent.subject,
                content: mailContent.content
            };

            const data = await sendMail(requestData);

            if (data) {
                setSnackbarMessage('발송이 완료되었습니다.');
                setRecipients([]);
                setMailContent({ subject: '', content: '' });
            }
        } catch (error) {
            setSnackbarMessage(`발송 실패: ${error.response?.data?.error || '알 수 없는 오류'}`);
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    // 스낵바 닫기
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>메일 발송</Typography>
            <Stack spacing={3}>
                {/* 메일 작성 폼 */}
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="제목"
                            value={mailContent.subject}
                            onChange={(e) => setMailContent(prev => ({ ...prev, subject: e.target.value }))}
                        />
                        <TextField
                            fullWidth
                            label="내용"
                            multiline
                            rows={4}
                            value={mailContent.content}
                            onChange={(e) => setMailContent(prev => ({ ...prev, content: e.target.value }))}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="수신자 정보"
                                value={customUserName}
                                onChange={(e) => setCustomUserName(e.target.value)}
                                placeholder="수신자 이름 입력"
                                sx={{ width: '30%' }}
                            />
                            <TextField
                                fullWidth
                                label="추가 이메일 주소"
                                value={customEmail}
                                onChange={(e) => setCustomEmail(e.target.value)}
                                placeholder="직접 이메일 입력"
                            />
                            <Button variant="contained" onClick={handleAddCustomEmail}>
                                추가
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>

                {/* 수신자 목록 */}
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>수신자 목록</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>수신자정보</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>작업</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipients.map((recipient) => (
                                <TableRow key={recipient.email}>
                                    <TableCell>{recipient.user_name}</TableCell>
                                    <TableCell>{recipient.email}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="error"
                                            onClick={() => handleRemoveRecipient(recipient.email)}
                                        >
                                            제거
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                {/* 사용자 목록 테이블 */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>이름</TableCell>
                                <TableCell>사용자 ID</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>작업</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.user_name}</TableCell>
                                    <TableCell>{user.user_id}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleAddRecipient(user)}
                                        >
                                            추가
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMail}
                        disabled={recipients.length === 0 || loading}
                    >
                        {loading ? '발송 중...' : '메일 발송'}
                    </Button>
                </Box>
            </Stack>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Box>
    );
}
