import { useEffect, useState } from "react";
import "./App.css";
import "./App.scss";
// import CMainRouter from './components/CMainRouter';
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import AnimationRouter from "./components/AnimationRouter";
import CFooter from "./components/Footer/CFooter";
import { CHeader } from "./components/Header/CHeader";
import { useDispatchRoot, useSelectorRoot } from "./redux/store";
import { getUserInfoRequest } from "./redux/controller";
import CLoading from "./components/Cloading";

function App() {
    const dispatch = useDispatchRoot();
    const { loading } = useSelectorRoot((state) => state.sketch); // Lấy ra dữ liệu detail sketch và danh sách comment từ redux

    useEffect(() => {
        let checkLogin = localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "";
        if (checkLogin) {
            checkLogin = checkLogin.slice(1);
            checkLogin = checkLogin.slice(0, checkLogin.length - 1);
            dispatch(getUserInfoRequest(checkLogin));
        }
    }, []);
    return (
        <Layout>
            <CHeader />
            <AnimationRouter />
            {loading && <CLoading />}
            <CFooter />
        </Layout>
    );
}

export default App;
