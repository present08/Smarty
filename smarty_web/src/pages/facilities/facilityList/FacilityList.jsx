import { useEffect, useState } from "react"
import "./facilityList.css"
import { getList } from "../../../api/facilityApi"
import { Link } from "react-router-dom"

const initState = {
    facility_id: '',
    facility_name: '',
    quantity: 0,
    open_time: '',
    close_time: '',
    default_time: 0,
    basic_fee: 0,
    extra_fee: 0,
    contact: '',
    info: '',
    caution: '',
    court: false,
    facility_status: false,
    files: [],
    file_name: []
}

export default function FacilityList() {
    const [data, setData] = useState(initState)

    // const handleDelete = (id) => {
    //     setData(data.filter(item => item.facility_id !== id))
    // }

    useEffect(() => {
        getList().then(data => {
            setData(data)
            console.log(data)
        }).catch((error) => console.error('Error fetching list : ', error))
    }, [])

    return (
        <div className="facilityList">
            <div className="facilityTitleContainer">
                <h1 className="facilityTitle">Facility</h1>
                <Link to="/newFacility">
                    <button className="facilityAddButton">Create</button>
                </Link>
            </div>
            <div className="facilityData">
                {data.facility_id}
            </div>
        </div>
    )
}
