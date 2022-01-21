import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Verification from "./pages/Verification";
import Contact from "./pages/Contact";
import MobilePhones from "./pages/MobilePhones";
import MyOrders from "./pages/MyOrders";
import HomePage from "./pages/HomePage";
import AuthProvider from "./context/authContext";
import CartProvider from "./context/cartContext";
import CreateProduct from "./pages/CreateProduct";
import CartPage from "./pages/CartPage";
import Auth from "./pages/Auth";
import AfterCheckout from "./pages/AfterCheckout";
import { AuthState } from "./context/authContext";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

function App() {
  // const state = useSelector((state) => state);
  // const dispatch = useDispatch();
  // const { depositMoney, withdrawMoney } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // );

  //let routes;
  // const auth = AuthState();

  // useEffect(() => {
  //   if (auth.token) {
  //     //console.log(auth.token);
  //     return (routes = (
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //         <Route exact path="/My-Orders" element={<MyOrders />} />
  //         <Route exact path="/Shop-Orders" element={<MyOrders shopOrders />} />

  //         <Route exact path="/Cart" element={<CartPage />} />
  //         <Route path="/Mobile-Phones" element={<MobilePhones />} />
  //         <Route exact path="/Create-Product" element={<CreateProduct />} />
  //         <Route path="/Contact" element={<Contact />} />
  //         <Route path="*" element={<Navigate to="/" />} />
  //         <Route exact path="/Order-Message" element={<AfterCheckout />} />
  //       </Routes>
  //     ));
  //   } else {
  //     console.log("no token");
  //     return (routes = (
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //         <Route exact path="/Login-Register" element={<Auth />} />
  //         <Route path="/Mobile-Phones" element={<MobilePhones />} />
  //         <Route path="/Contact" element={<Contact />} />
  //         <Route exact path="/Verification" element={<Verification />} />
  //         <Route exact path="/Cart" element={<CartPage />} />
  //         <Route path="*" element={<Navigate to="/" />} />
  //       </Routes>
  //     ));
  //   }
  // }, [auth]);

  let routes = (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route exact path="/My-Orders" element={<MyOrders />} />
      <Route exact path="/Shop-Orders" element={<MyOrders shopOrders />} />
      <Route exact path="/Create-Product" element={<CreateProduct />} />
      <Route path="/Mobile-Phones" element={<MobilePhones />} />
      <Route path="/Contact" element={<Contact />} />
      <Route exact path="/Cart" element={<CartPage />} />
      <Route exact path="/Order-Message" element={<AfterCheckout />} />
      <Route exact path="/Login-Register" element={<Auth />} />
      <Route exact path="/Verification" element={<Verification />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Header />
            {routes}
            <Footer />
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
