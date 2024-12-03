import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { permission, permissionWait } from '../../../api/admin/statusApi';
import "./../../../pages/admin/classes/classList/classList.css"

const Permission = () => {
    const [permissionList, setPermissionList] = useState([])

    useEffect(() => {
        permissionWait().then(e => setPermissionList(e))
    }, [])

    const checkPermission = (id) => {
        permission(id).then(e => setPermissionList(e))
    }


    const columns = [
        { field: 'enrollment_id', headerName: '예약번호', width: 180 },
        { field: 'class_name', headerName: '강의명', width: 160 },
        { field: 'user_id', headerName: '유저ID', width: 160 },
        { field: 'user_name', headerName: '유저명', width: 130 },
        { field: 'start_date', headerName: '개강일', width: 130 },
        { field: 'end_date', headerName: '종강일', width: 130 },
        { field: 'amount', headerName: '결제가격', width: 130 },
        {
            field: 'enrollment_status', headerName: '승인', width: 150, renderCell: (params) => {
                return (
                    <div className="classAction">
                        <button className="classListButton" onClick={() => checkPermission(params.row.enrollment_id)}>승인</button>
                    </div>
                )
            }
        }
    ];
    const paginationModel = { page: 0, pageSize: 10 };

    return (
        <div className="classList">
            <div className="classContainer">
                <div className="classContainerTop">
                </div>
                <DataGrid
                    className="classTable"
                    rows={permissionList}
                    disableRowSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row.enrollment_id}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </div>
        </div>
    )
}

export default Permission