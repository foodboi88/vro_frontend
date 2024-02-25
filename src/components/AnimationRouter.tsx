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
import SellerBill from "../pages/seller/seller-bill/seller-bill";
import SellerSketchs from "../pages/seller/seller-sketchs/seller-sketchs";
import ProfileResume from "../pages/Profile/profile-resume/ProfileResume";
import ProfileBecomeSeller from "../pages/Profile/profile-become-seller/ProfileBecomeSeller";
import PurchasedSketchs from "../pages/purchased-sketchs/purchased-sketchs";
import ActiveAccount from "../pages/ActiveAccount/ActiveAccount";
import ChangePassword from "./ChangePassword/ChangePassword";
import Mission from "../pages/Mission/Mission";
import Contact from "../pages/Contact/Contact";
import AdvancedSeachingArchitect from "../pages/AdvancedSearchingArchitect/AdvancedSeachingArchitect";
import CustomerNeed from "../pages/CustomerNeed/CustomerNeed";
import ChangeAvatar from "./ChangeAvatar/ChangeAvatar";

// Dùng để set animation cho các router với nhau
const AnimationRouter = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>

                {/* Trang kỹ sư - công ty */}
                <Route element={<PrivateSellerRoutes />}>
                    <Route path="/seller" element={<SellerLayout />}>
                        <Route path="/seller" element={<SellerGeneral />}></Route>
                        <Route path="/seller/upload-sketch" element={<UploadSketch />}></Route>
                        <Route path="/seller/withdraw" element={<SellerWithdraw />}></Route>
                        <Route path="/seller/order" element={<SellerBill />}></Route>
                        <Route path="/seller/withdraw" element={<SellerWithdraw />}></Route>
                        <Route path="/seller/management-sketch" element={<SellerSketchs />}></Route>
                        <Route path="/seller/purchased-sketchs" element={<PurchasedSketchs />}></Route>
                        <Route path="/seller/cart" element={<Cart />}></Route>
                        <Route path="/seller/profile" element={<ProfileResume />}></Route>
                        <Route path="/seller/change-password" element={<ChangePassword />}></Route>
                        <Route path="/seller/change-avatar" element={<ChangeAvatar />}></Route>
                    </Route>
                </Route>


                {/* Trang người mua */}
                <Route element={<PrivateBuyerRoutes />}>

                    <Route path="/buyer" element={<Profile />}>
                        <Route path="/buyer" element={<ProfileResume />}></Route>
                        <Route path="/buyer/become-seller" element={<ProfileBecomeSeller />}></Route>
                        <Route path="/buyer/purchased-sketchs" element={<PurchasedSketchs />}></Route>
                        <Route path="/buyer/cart" element={<Cart />}></Route>
                        <Route path="/buyer/change-password" element={<ChangePassword />}></Route>
                        <Route path="/buyer/change-avatar" element={<ChangeAvatar />}></Route>
                    </Route>
                </Route>

                {/* Public route */}
                <Route path="/" element={<Home />}></Route>

                <Route path="/searching" element={<AdvancedSeaching />}></Route>
                <Route
                    path="/detail-sketch/:sketchId"
                    element={<DetailSketch />}
                ></Route>

                <Route path="/searching-architect" element={<AdvancedSeachingArchitect />}></Route>
                <Route
                    path="/author-page/:authorId"
                    element={<AuthorPage />}
                ></Route>
                <Route path="/purchased-successfully" element={<PurchaseSuccessfully />}></Route>
                <Route path="/mission" element={<Mission />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/customer-need" element={<CustomerNeed />}></Route>
                <Route path="*" element={<ActiveAccount />} />

            </Routes>
        </AnimatePresence>
    );
};

export default AnimationRouter;