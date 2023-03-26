/* eslint-disable jsx-a11y/iframe-has-title */
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BietThu from "../../images/homepage/bietthu1.png";
import Notification from "../../images/homepage/notification.png";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./styles.home.scss";

import DrawHomeImage1 from "../../images/homepage/home_img_1.png";
import DrawHomeImage2 from "../../images/homepage/home_img_2.png";
import DrawHomeImage3 from "../../images/homepage/home_img_3.png";
import DrawHomeImage4 from "../../images/homepage/home_img_4.png";
import DrawHomeImage5 from "../../images/homepage/home_img_5.png";
import DrawHomeImage6 from "../../images/homepage/home_img_6.png";
import DrawHomeImage7 from "../../images/homepage/home_img_7.png";
import DrawHomeImage8 from "../../images/homepage/home_img_8.png";
import DrawHomeImage9 from "../../images/homepage/home_img_9.png";
import DrawHomeImage10 from "../../images/homepage/home_img_10.png";
import DrawHomeImage11 from "../../images/homepage/home_img_11.png";
import DrawHomeImage12 from "../../images/homepage/home_img_12.png";
import DrawHomeImage13 from "../../images/homepage/home_img_13.png";
import DrawHomeImage14 from "../../images/homepage/home_img_14.png";
import DrawHomeImage15 from "../../images/homepage/home_img_15.png";
import DrawHomeImage16 from "../../images/homepage/home_img_16.png";
import CProductCard from "../../components/ProductCard/CProductCard";
import {
    getHomeListSketchRequest,
    getLatestSketchRequest,
} from "../../redux/controller";
import { IReqGetLatestSketchs } from "../../common/sketch.interface";

interface CardData {
    id: number;
    title: string;
    type: string;
    price: string;
    view: number;
    imageUrl: string;
}

const featuredLst: CardData[] = [
    {
        id: 1,
        title: "Bản vẽ biệt thự 2 tầng",
        type: "File Sketchup",
        price: "500.000VNĐ",
        view: 96,
        imageUrl: DrawHomeImage1,
    },
    {
        id: 2,
        title: "Bản vẽ biệt thự 4 tầng",
        type: "File 3D Max",
        price: "1.500.000VNĐ",
        view: 105,
        imageUrl: DrawHomeImage2,
    },
    {
        id: 3,
        title: "Bản vẽ biệt thự 3 tầng",
        type: "File Sketchup",
        price: "Free",
        view: 365,
        imageUrl: DrawHomeImage3,
    },
    {
        id: 4,
        title: "Thiết kế nhà gác lửng hiện đại",
        type: "File Auto Cad",
        price: "2.500.000VNĐ",
        view: 25,
        imageUrl: DrawHomeImage4,
    },
];
const newLst: CardData[] = [
    {
        id: 1,
        title: "Dựng ngoại cảnh căn biệt thự",
        type: "File Auto cad",
        price: "865.000VNĐ",
        view: 245,
        imageUrl: DrawHomeImage5,
    },
    {
        id: 2,
        title: "Thiết kế biệt thự 2 tầng",
        type: "File Sketchup",
        price: "Free",
        view: 32,
        imageUrl: DrawHomeImage6,
    },
    {
        id: 3,
        title: "Bản vẽ biệt thự 2 tầng",
        type: "File Sketchup",
        price: "300.000VNĐ",
        view: 26,
        imageUrl: DrawHomeImage7,
    },
    {
        id: 4,
        title: "Bản vẽ biệt thự 2 tầng",
        type: "File Sketchup",
        price: "Free",
        view: 85,
        imageUrl: DrawHomeImage8,
    },
];
const suggestLst: CardData[] = [
    {
        id: 1,
        title: "Bản vẽ biệt thự 3 tầng cổ điển",
        type: "File 3D Max",
        price: "Free",
        view: 265,
        imageUrl: DrawHomeImage9,
    },
    {
        id: 2,
        title: "Bản vẽ nhà xưởng",
        type: "File Revit",
        price: "Free",
        view: 500,
        imageUrl: DrawHomeImage10,
    },
    {
        id: 3,
        title: "Bản vẽ biệt thự phong cách Nhật",
        type: "File Revit",
        price: "3.500.000VNĐ",
        view: 65,
        imageUrl: DrawHomeImage11,
    },
    {
        id: 4,
        title: "Biệt thự phong cách Roman",
        type: "File 3D Max",
        price: "10.000.000VNĐ",
        view: 152,
        imageUrl: DrawHomeImage12,
    },
];
const webSuggestLst: CardData[] = [
    {
        id: 1,
        title: "Biệt thự mái thái",
        type: "File Revit",
        price: "700.000VNĐ",
        view: 65,
        imageUrl: DrawHomeImage13,
    },
    {
        id: 2,
        title: "Biệt thự Tân cổ điển",
        type: "File Auto cad",
        price: "670.000VNĐ",
        view: 98,
        imageUrl: DrawHomeImage14,
    },
    {
        id: 3,
        title: "Bản vẽ biệt thự mái thái",
        type: "File Sketchup",
        price: "Free",
        view: 32,
        imageUrl: DrawHomeImage15,
    },
    {
        id: 4,
        title: "Bản vẽ quán ăn",
        type: "File Auto cad",
        price: "Free",
        view: 75,
        imageUrl: DrawHomeImage16,
    },
];
const imageVariants: Variants = {
    offscreen: {
        y: 100,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2,
        },
    },
};

const hoverVariants = {
    hover: {
        scale: 1.1,
        opacity: 0.8,
        borderRadius: "30px",
    },
    tap: {
        scale: 0.8,
    },
};

// Phần trang chủ của trang web
const Home = () => {
    const { tokenLogin, user } = useSelectorRoot((state) => state.login);
    const dispatch = useDispatchRoot();

    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(4);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(4);

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 900) {
            setSpanCol(6);
            setNumberOfCardShow(4);
            setNumberOfCardNext(4);
        }
        if (window.innerWidth <= 900) {
            setSpanCol(8);
            setNumberOfCardShow(3);
            setNumberOfCardNext(5);
        }
        if (window.innerWidth <= 600) {
            setSpanCol(12);
            setNumberOfCardShow(2);
            setNumberOfCardNext(6);
        }
        if (window.innerWidth <= 400) {
            setSpanCol(24);
            setNumberOfCardShow(1);
            setNumberOfCardNext(7);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    useEffect(() => {
        dispatch(getHomeListSketchRequest());
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextCard = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const handlePrevCard = () => {
        setCurrentIndex(currentIndex - 1);
    };
    return (
        <motion.div
            className="main-home"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            <div className="main-notification">
                <img
                    className="image"
                    src={Notification}
                    alt="main notification"
                />
            </div>

            <div className="tool-of-web">
                <div className="title">
                    <div>Danh sách bản vẽ nổi bật</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCard}
                            disabled={currentIndex === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {featuredLst
                            .slice(
                                currentIndex,
                                currentIndex + numberOfCardShow
                            )
                            .map((card) => (
                                <Col span={spanCol} key={card.id}>
                                    <CProductCard
                                        imageUrl={card.imageUrl}
                                        title={card.title}
                                        view={card.view}
                                        price={card.price}
                                        type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCard}
                            disabled={
                                currentIndex >= numberOfCardNext - 4 && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <div className="tool-of-web">
                <div className="title">
                    <div>Bài vẽ mới hôm nay</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCard}
                            disabled={currentIndex === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {newLst
                            .slice(
                                currentIndex,
                                currentIndex + numberOfCardShow
                            )
                            .map((card) => (
                                <Col span={spanCol} key={card.id}>
                                    <CProductCard
                                        imageUrl={card.imageUrl}
                                        title={card.title}
                                        view={card.view}
                                        price={card.price}
                                        type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCard}
                            disabled={
                                currentIndex >= numberOfCardNext - 4 && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <div className="tool-of-web">
                <div className="title">
                    <div>Gợi ý cho bạn</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCard}
                            disabled={currentIndex === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {suggestLst
                            .slice(
                                currentIndex,
                                currentIndex + numberOfCardShow
                            )
                            .map((card) => (
                                <Col span={spanCol} key={card.id}>
                                    <CProductCard
                                        imageUrl={card.imageUrl}
                                        title={card.title}
                                        view={card.view}
                                        price={card.price}
                                        type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCard}
                            disabled={
                                currentIndex >= numberOfCardNext - 4 && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <div className="tool-of-web">
                <div className="title">
                    <div>Vro Group đề xuất</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCard}
                            disabled={currentIndex === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {webSuggestLst
                            .slice(
                                currentIndex,
                                currentIndex + numberOfCardShow
                            )
                            .map((card) => (
                                <Col span={spanCol} key={card.id}>
                                    <CProductCard
                                        imageUrl={card.imageUrl}
                                        title={card.title}
                                        view={card.view}
                                        price={card.price}
                                        type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCard}
                            disabled={
                                currentIndex >= numberOfCardNext - 4 && true
                            }
                        />
                    </Col>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
