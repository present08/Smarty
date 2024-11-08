import axios from "axios";
import { useEffect, useState } from "react";

// 사용자 입력 초기값
const initUser = {
  user_name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  birthday: "",
  level: ""
}
const initProduct ={
  facility_id: 0,
  product_name: "",
  price: 0
}
const initFacility = {
  facility_name: "",
  price: 0,
  day_rate: 0.0,
  night_rate: 0.0,
  open_time: "00:00:00",
  close_time: "00:00:00"
}
const initRental ={
  user_id: 0,
  product_id: 0,
  rental_date: "2024-00-00T00:00:00",
  return_date: "2024-00-00T00:00:00"
}

function App() {

  const [loading, setLoading] = useState(true); // 로딩 상태, 서버 응답 전후 로딩 상태를 관리
  
  //유저 User
  const [user, setUser] = useState({ ...initUser }); // 유저 입력 폼 초기화, 입력된 사용자 정보를 저장
  const [userList, setUserList] = useState([]); // 유저 목록을 배열로 초기화, 서버에서 받아온 사용자 목록을 저장
  
  //상품 Product
  const [product, setProduct] = useState(initProduct)
  const [productList, setProductList] = useState([]);

  //시설 Facility
  const [facility, setFacility] = useState(initFacility)
  const [facilityList, setFacilityList] = useState([])

  //렌탈 Rental
  const [rental, setRental] = useState(initRental)
  const [rentalList, setRentalList] = useState([])

  //유저 목록 User 
  const response = async () => {
    const data = await axios.get("http://localhost:8080/api/users")
    console.log(data)
  }
  //상품 목록 Product
  const responseProduct = async () => {
    const data = await axios.get("http://localhost:8080/api/products")
    console.log(data)
  }
  //시설 목록 Facility
  const responseFacility = async () => {
    const data = await axios.get("http://localhost:8080/api/facilitys")
    console.log(data)
  }
  //렌탈 목록 Rental
  const responseRental = async () => {
    const data = await axios.get("http://localhost:8080/api/rentals")
    console.log(data)
  }

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    fetchProduct();
  }, [])
  
useEffect(() => {
  fetchFacility();
}, [])

useEffect(() => {
  fetchRental();
}, [])



  //유저 목록 가져오기
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      if (Array.isArray(response.data)) {
        setUserList(response.data); // 유저 목록을 상태에 저장
      } else {
        console.error("Error shit", response.data) // 데이터 형식이 잘못된 경우
      }
    } catch (error) {
      console.error("Error shit", error) // API 호출 실패 시 오류 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  //상품 목록 가져오기
  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      if (Array.isArray(response.data)) {
        setProductList(response.data); 
      } else {
        console.error("Error shit", response.data) 
      }
    } catch (error) {
      console.error("Error shit", error) 
    } finally {
      setLoading(false); 
    }
  };
  
  //시설 목록 가져오기
  const fetchFacility = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/facilitys");
      if (Array.isArray(response.data)) {
        setFacilityList(response.data); 
      } else {
        console.error("Error shit", response.data) 
      }
    } catch (error) {
      console.error("Error shit", error) 
    } finally {
      setLoading(false); 
    }
  };

  //렌탈 목록 가져오기
  const fetchRental = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rentals");
      if (Array.isArray(response.data)) {
        setRentalList(response.data); 
      } else {
        console.error("Error shit", response.data) 
      }
    } catch (error) {
      console.error("Error shit", error) 
    } finally {
      setLoading(false); 
    }
  };

  const handleChangeUser = (e) => {
    user[e.target.name] = e.target.value //입력된 값 업데이트
    console.log(user)
    setUser({ ...user })// 상태 업데이트
  }

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value
    console.log(product)
    setProduct({...product})
  }
  
  const handleChangeFacility = (e) => {
    facility[e.target.name] = e.target.value
    console.log(facility)
    setFacility({...facility})
  }

  const handelChangeRental = (e) => {
    rental[e.target.name] = e.target.value
    console.log(rental)
    setRental({...rental})
  }
  //사용자가 입력한 데이터를 서버에 전송, 데이터는 user상태에 저장
  const postUser = async (user) => {
    const data = await axios.post("http://localhost:8080/api/users", user)
    console.log(data)
  }

  const postProduct = async (product) => {
    const data = await axios.post("http://localhost:8080/api/products", product)
    console.log(data)
  }
  
  const postFacility = async (facility) => {
    const data = await axios.post("http://localhost:8080/api/facilitys", facility)
    console.log(data)
  }

  const postRental = async (rental) => {
    const data = await axios.post("http://localhost:8080/api/rentals", rental)
    console.log(data)
  }

  

  return (
    <>
      <button onClick={response}>User</button>
      <button onClick={responseProduct}>Product</button>
      <button onClick={responseFacility}>Facility</button>
      <button onClick={responseRental}>Rental</button>
      
      <h1> User Input </h1>
      <div>
        <label htmlFor="name">user</label>
        <input type="text" id="name" name="user_name" value={user.user_name} onChange={handleChangeUser} /><br />

        <label htmlFor="email">email</label>
        <input type="text" id="email" name="email" value={user.email} onChange={handleChangeUser} /><br />

        <label htmlFor="password">password</label>
        <input type="text" id="password" name="password" value={user.password} onChange={handleChangeUser} /><br />

        <label htmlFor="phone">phone</label>
        <input type="text" id="phone" name="phone" value={user.phone} onChange={handleChangeUser} /><br />

        <label htmlFor="address">address</label>
        <input type="text" id="address" name="address" value={user.address} onChange={handleChangeUser} /><br />

        <label htmlFor="birthday">birthday</label>
        <input type="text" id="birthday" name="birthday" value={user.birthday} onChange={handleChangeUser} /><br />

        <label htmlFor="level">level</label>
        <input type="text" id="level" name="level" value={user.level} onChange={handleChangeUser} /><br />

        <button type="submit" onClick={() => postUser(user)}>submit</button>
      </div>

      <h1>Product Input</h1>
      <div>
        <label htmlFor="facility_id">facility_id</label>
        <input type="text" id="facility_id" name="facility_id" value={product.facility_id} onChange={handleChangeProduct}/><br />
        
        <label htmlFor="product_name">product_name</label>
        <input type="text" id="product_name" name="product_name" value={product.product_name} onChange={handleChangeProduct}/><br />
        
        <label htmlFor="price">price</label>
        <input type="text" id="price" name="price" value={product.price} onChange={handleChangeProduct}/><br />
      
        <button type="submit" onClick={() => postProduct(product)}>submit</button>
      </div>

      <h1>Facility Input</h1>
      <div>
        <label htmlFor="facility_name">facility_name</label>
        <input type="text" id="facility_name" name="facility_name" value={facility.facility_name} onChange={handleChangeFacility}/><br />
        
        <label htmlFor="price">price</label>
        <input type="number" id="price" name="price" value={facility.price} onChange={handleChangeFacility}/><br />
        
        <label htmlFor="day_rate">day_rate</label>
        <input type="number" id="day_rate" name="day_rate" value={facility.day_rate} onChange={handleChangeFacility}/><br />
        
        <label htmlFor="night_rate">night_rate</label>
        <input type="number" id="night_rate" name="night_rate" value={facility.night_rate} onChange={handleChangeFacility}/><br />
        
        <label htmlFor="open_time">open_time</label>
        <input type="time" id="open_time" name="open_time" value={facility.open_time} onChange={handleChangeFacility}/><br />
      
        <label htmlFor="close_time">close_time</label>
        <input type="time" id="close_time" name="close_time" value={facility.close_time} onChange={handleChangeFacility}/><br />
      
        <button type="submit" onClick={() => postFacility(facility)}>submit</button>
      </div>

      <h1>Rental Input</h1>
      <div>
        <label htmlFor="user_id">user_id</label>
        <input type="text" id="user_id" name="user_id" value={rental.user_id} onChange={handelChangeRental}/><br />
        
        <label htmlFor="product_id">product_id</label>
        <input type="text" id="product_id" name="product_id" value={rental.product_id} onChange={handelChangeRental}/><br />
        
        <label htmlFor="rental_date">rental_date</label>
        <input type="datetime-local" id="rental_date" name="rental_date" value={rental.rental_date} onChange={handelChangeRental}/><br />
        
        <label htmlFor="return_date">return_date</label>
        <input type="datetime-local" id="return_date" name="return_date" value={rental.return_date} onChange={handelChangeRental}/><br />
      
        <button type="submit" onClick={() => postRental(rental)}>submit</button>
      </div>

      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p> // 로딩 중일 때 표시
      ) : (
        <ul>
          {Array.isArray(userList) && userList.length > 0 ? (
            userList.map((u) => (
              <li key={u.user_id}>
                {u.user_name} ({u.email}) - {u.phone} - {u.address} - {u.birthday} - {u.level}
              </li>
            ))
          ) : (
            <p>No users available</p> // 유저가 없을 때 표시
          )}
        </ul>
      )}

      <h2>Product List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Array.isArray(productList) && productList.length > 0 ? (
            productList.map((u) => (
              <li key={u.product_id}>
                {u.product_name} ({u.facility_id}) - {u.price}
              </li>
            ))
          ) : (
            <p>No users available</p>
          )}
        </ul>
      )}
      
      <h2>Facility List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Array.isArray(facilityList) && facilityList.length > 0 ? (
            facilityList.map((u) => (
              <li key={u.facility_id}>
                {u.facility_name} - {u.price} - {u.day_rate} - {u.night_rate} - {u.open_time} - {u.close_time}
              </li>
            ))
          ) : (
            <p>No users available</p>
          )}
        </ul>
      )}
      
      <h2>Rental List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Array.isArray(rentalList) && rentalList.length > 0 ? (
            rentalList.map((u) => (
              <li key={u.rental_id}>
                {u.user_id} - {u.product_id} - {u.rental_time} - {u.return_time}
              </li>
            ))
          ) : (
            <p>No users available</p>
          )}
        </ul>
      )}

    </>
  );
}

export default App;
