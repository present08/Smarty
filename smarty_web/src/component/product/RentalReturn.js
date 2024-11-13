import axios from 'axios'
import React from 'react'

const RentalReturn = ({rental}) => {
    const handleReturn = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/rentals/return`, null, {
                params: { rental_id: rental.rental_id}
            })
            alert(response.data)
        }catch (error) {
            alert("반납 중 오류가 발생")
        }
    }
  return (
    
    <div className='"rental-return'>
        <p>대여 물품: {rental.product_id}</p>
        <p>대여일: {rental.rental_date}</p>
        <p>반납일: {rental.return_date ? rental.return_date : "미반납"}</p>
        {!rental.return_date && (<button onClick={handleReturn}>반납</button>
    )}
    </div>
   
  )
}

export default RentalReturn