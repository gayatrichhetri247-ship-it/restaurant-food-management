import { Route, Routes } from "react-router";
import Home from "./pages/public/Home";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/public/NotFound";
import LoginUser from "./pages/auth/LoginUser";
import Navbar from "./components/Navbar";
import Menu from "./pages/public/Menu";
import MenuDetails from "./pages/public/MenuDetails";
import Cart from "./pages/public/cart/Cart";
import Payment from "./pages/payment/Payment";
import Success from "./pages/payment/Success";
import Dashboard from "./admin/Dashboard";
import UserManagement from "./admin/UserManagement";
import OrderManagement from "./admin/OrderManagement";
import FoodManagement from "./admin/FoodManagement";
import AddFood from "./admin/AddFood";
import EditFood from "./admin/EditFood";
import { useDispatch, useSelector } from "react-redux";
import ProtectedAdmin from "./admin/ProtectedAdmin";
import { useEffect } from "react";

const AppRoutes = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await getUser();
      dispatch(AuthSuccess(data.user));
    } catch (error) {
      console.log(error);
    }
  };

  fetchUser();
}, [dispatch]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginUser />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/menu/:id" element={<MenuDetails />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        <Route element={<ProtectedAdmin />}>
          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<FoodManagement />} />
            <Route path="food-management" element={<FoodManagement />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="order-management" element={<OrderManagement />} />
            <Route path="add-food" element={<AddFood />} />
            <Route path="edit-food" element={<EditFood />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
