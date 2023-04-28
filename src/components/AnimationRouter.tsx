import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import AdvancedSeaching from "../pages/AdvancedSearching/AdvancedSeaching";
import { AnimatePresence } from "framer-motion";
import DetailSketch from "../pages/DetailSketch/DetailSketch";
import UploadSketch from "../pages/UploadSketch/UploadSketch";
import Cart from "../pages/Cart/Cart";
import AuthorPage from "../pages/AuthorPage/AuthorPage";

// Dùng để set animation cho các router với nhau
const AnimationRouter = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
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
                <Route path="/upload-sketch" element={<UploadSketch />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimationRouter;
