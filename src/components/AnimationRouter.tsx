import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import AdvancedSeaching from "../pages/AdvancedSearching/AdvancedSeaching";
import { AnimatePresence } from "framer-motion";
import DetailSketch from "../pages/DetailSketch/DetailSketch";
import UploadSketch from "../pages/seller/UploadSketch/UploadSketch";
import Cart from "../pages/Cart/Cart";
import AuthorPage from "../pages/AuthorPage/AuthorPage";
import PrivateSellerRoutes from "./PrivateSellerRoutes";
import PrivateBuyerRoutes from "./PrivateBuyerRoutes";
import Profile from "../pages/Profile/Profile";
import PurchaseSuccessfully from "../pages/purchased-successfully/purchased-successfully";
import SellerLayout from "../layouts/seller/seller-layout";
import SellerWithdraw from "../pages/seller/seller-withdraw/seller-withdraw";
import SellerGeneral from "../pages/seller/seller-general/seller-general";

// Dùng để set animation cho các router với nhau
const AnimationRouter = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>

                {/* Trang kỹ sư - công ty */}
                <Route element={<PrivateSellerRoutes />}>
                    <Route path="/seller" element={<SellerLayout/>}>
                        <Route path="/seller" element={<SellerGeneral />}></Route>
                        <Route path="/seller/upload-sketch" element={<UploadSketch />}></Route>
                        <Route path="/seller/withdraw" element={<SellerWithdraw/>}></Route>
                    </Route>
                </Route>


                {/* Trang người mua */}
                <Route element={<PrivateBuyerRoutes />}>
                    <Route path="/buyer" >
                        <Route path="/buyer/registration-seller"></Route>
                        <Route path="/buyer/profile" element={<Profile />}></Route>
                    </Route>
                </Route>
                
                {/* Public route */}
                <Route path="/" element={<Home />}></Route>
                <Route path="/searching" element={<AdvancedSeaching />}></Route>
                <Route
                    path="/detail-sketch/:sketchId"
                    element={<DetailSketch />}
                ></Route>
                <Route
                    path="/author-page/:authorId"
                    element={<AuthorPage />}
                ></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/purchased-successfully" element={<PurchaseSuccessfully />}></Route>


            </Routes>
        </AnimatePresence>
    );
};

export default AnimationRouter;


// http://vroteam.online:3000/purchased-successfully?
// vnp_Amount=22000000&
// vnp_BankCode=NCB&
// vnp_BankTranNo=VNP14062588&
// vnp_CardType=ATM&
// vnp_OrderInfo=Thanh+toan+cho+ma+GD%3A0b0ecaff-b6a8-4ea8-ad86-2e746f0191bb&
// vnp_PayDate=20230710165116&
// vnp_ResponseCode=00&
// vnp_TmnCode=VKCTCEMP&
// vnp_TransactionNo=14062588&
// vnp_TransactionStatus=00&
// vnp_TxnRef=0b0ecaff-b6a8-4ea8-ad86-2e746f0191bb&
// vnp_SecureHash=b1d165c371892f74362d4dac7cf22117191fa0e28375dc78598ec8c75749eae6a2a7f0b1771f83d12a87ecd1fad9625fdcf35160af6416bacf22c6d4c44fbe7d
