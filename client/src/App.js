import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import MobilePhones from "./pages/MobilePhones";
import MyOrders from "./pages/MyOrders";
import HomePage from "./pages/HomePage";
import AuthProvider from "./context/authContext";
import CartProvider from "./context/cartContext";
import CreateProduct from "./pages/CreateProduct";
import CartPage from "./pages/CartPage";
import Auth from "./pages/Auth";

function App() {
  //let routes;

  // const { token } = useAuth();
  // if (token) {
  //   console.log(token);
  //   routes = (
  //     <Routes>
  //       <Route path="/" element={<HomePage />} />
  //       <Route exact path="/My-Orders" element={<MyOrders />} />
  //       <Route path="/Mobile-Phones" element={<MobilePhones />} />
  //       <Route path="/Contact" element={<Contact />} />
  //       <Route path="*" element={<Navigate to="/" />} />
  //     </Routes>
  //   );
  // } else {
  //   console.log("no token");
  //   routes = (
  //     <Routes>
  //       <Route path="/" element={<HomePage />} />
  //       <Route exact path="/Login" element={<Login />} />
  //       <Route exact path="/Register" element={<Register />} />
  //       <Route path="/Mobile-Phones" element={<MobilePhones />} />
  //       <Route path="/Contact" element={<Contact />} />
  //       <Route path="*" element={<Navigate to="/" />} />
  //     </Routes>
  //   );
  // }

  let routes = (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route exact path="/My-Orders" element={<MyOrders />} />
      <Route exact path="/Shop-Orders" element={<MyOrders shopOrders />} />
      <Route exact path="/Create-Product" element={<CreateProduct />} />
      <Route path="/Mobile-Phones" element={<MobilePhones />} />
      <Route path="/Contact" element={<Contact />} />
      <Route exact path="/Cart" element={<CartPage />} />
      {/* <Route exact path="/Login" element={<Login />} />
      <Route exact path="/Register" element={<Register />} /> */}
      <Route exact path="/Login-Register" element={<Auth />} />

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
