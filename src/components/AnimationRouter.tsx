import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import AdvancedSeaching from '../pages/AdvancedSearching/AdvancedSeaching'
import { AnimatePresence } from 'framer-motion'

// Dùng để set animation cho các router với nhau
const AnimationRouter = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path='/searching' element={<AdvancedSeaching/>}></Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimationRouter