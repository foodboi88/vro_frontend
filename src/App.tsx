import { useEffect, useState } from "react";
import "./App.css";
import "./App.scss";
// import CMainRouter from './components/CMainRouter';
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import AnimationRouter from "./components/AnimationRouter";
import CFooter from "./components/Footer/CFooter";
import { CHeader } from "./components/Header/CHeader";

function App() {
    return (
        <Layout>
            <CHeader />
            <AnimationRouter />
            {/* <CFooter /> */}
        </Layout>
    );
}

export default App;
