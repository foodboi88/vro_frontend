import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/home/Home'
import AboutUs from '../pages/AboutUs/AboutUs'
import JudgementMain from '../pages/Judgement/JudgementMain'
import Login from '../pages/login/Login'
import { AnimatePresence } from 'framer-motion'
import News from '../pages/news/News'
import ActiveAccount from '../pages/ActiveAccount/ActiveAccount'

// Dùng để set animation cho các router với nhau
const AnimationRouter = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about_us" element={<AboutUs />}></Route>
                <Route path="/test" element={<JudgementMain />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/new" element={<News />}></Route>
                <Route path="*" element={<ActiveAccount />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimationRouter