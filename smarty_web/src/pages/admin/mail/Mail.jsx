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
} from '@mui/material';
import { getMailList } from '../../../api/admin/mailApi';

export default function Mail() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [customEmail, setCustomEmail] = useState('');
    const [mailContent, setMailContent] = useState({
        subject: '',
        content: '',
    });

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

    // 전체 선택 처리
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedUsers(users.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    // 개별 선택 처리
    const handleSelect = (userId) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    // 메일 발송 처리
    const handleSendMail = () => {
        const recipients = [...selectedUsers];
        if (customEmail) {
            recipients.push(customEmail);
        }

        console.log('메일 발송:', {
            recipients,
            subject: mailContent.subject,
            content: mailContent.content,
        });
        // API 호출 로직 추가
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
                        <TextField
                            fullWidth
                            label="추가 이메일 주소"
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                            placeholder="직접 이메일 입력"
                        />
                    </Stack>
                </Paper>

                {/* 사용자 목록 */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={handleSelectAll}
                                        checked={users.length > 0 && selectedUsers.length === users.length}
                                        indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                                    />
                                </TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>클래스명</TableCell>
                                <TableCell>사용자 ID</TableCell>
                                <TableCell>가입일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleSelect(user.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{user.user_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.class_name}</TableCell>
                                    <TableCell>{user.user_id}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
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
                        disabled={selectedUsers.length === 0 && !customEmail}
                    >
                        메일 발송
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}
