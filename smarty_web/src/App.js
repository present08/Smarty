import "./app.css"
import Home from "./pages/dashboard/Dashboard";
import { Route, RouterProvider, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import FacilityList from "./pages/facilityList/FacilityList";
import Facility from "./pages/facilities/Facility";
import NewFacility from "./pages/newFacility/NewFacility";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      {/* <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/newuser" element={<NewUser />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:productsId" element={<Product />} />
        <Route path="/newproduct" element={<NewProduct />} />

        <Route path="/facilities" element={<FacilityList />} />
        <Route path="/facility/:facilityId" element={<Facility />} />
        <Route path="/newfacility" element={<NewFacility />} />
      </Routes> */}
      <RouterProvider router={root} />
    </Layout>
  );
}

export default App;
