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
import { Carousel } from 'antd';
import CDeclare from "../../components/Declare/CDeclare";


interface CardData {
    id: number;
    title: string;
    type: string;
    price: number;
    view: number;
    imageUrl: string;
}

const suggestLst: CardData[] = [
    {
        id: 1,
        title: "Bản vẽ biệt thự 3 tầng cổ điển",
        type: "File 3D Max",
        price: 0,
        view: 265,
        imageUrl: DrawHomeImage9,
    },
    {
        id: 2,
        title: "Bản vẽ nhà xưởng",
        type: "File Revit",
        price: 0,
        view: 500,
        imageUrl: DrawHomeImage10,
    },
    {
        id: 3,
        title: "Bản vẽ biệt thự phong cách Nhật",
        type: "File Revit",
        price: 3500000,
        view: 65,
        imageUrl: DrawHomeImage11,
    },
    {
        id: 4,
        title: "Biệt thự phong cách Roman",
        type: "File 3D Max",
        price: 10000000,
        view: 152,
        imageUrl: DrawHomeImage12,
    },
];
const webSuggestLst: CardData[] = [
    {
        id: 1,
        title: "Biệt thự mái thái",
        type: "File Revit",
        price: 700000,
        view: 65,
        imageUrl: DrawHomeImage13,
    },
    {
        id: 2,
        title: "Biệt thự Tân cổ điển",
        type: "File Auto cad",
        price: 670000,
        view: 98,
        imageUrl: DrawHomeImage14,
    },
    {
        id: 3,
        title: "Bản vẽ biệt thự mái thái",
        type: "File Sketchup",
        price: 0,
        view: 32,
        imageUrl: DrawHomeImage15,
    },
    {
        id: 4,
        title: "Bản vẽ quán ăn",
        type: "File Auto cad",
        price: 0,
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
    const { latestSketchsList, mostViewedSketchList, villaSketchList, factorySketchList, streetHouseSketchList, interiorSketchList } = useSelectorRoot(
        (state) => state.sketch
    ); // Lst cac ban ve

    const dispatch = useDispatchRoot();

    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(10);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(10);

    const [currentIndexMostViewedSketch, setCurrentIndexMostViewedSketch] = useState(0);
    const [currentIndexLatestSketch, setCurrentIndexLatestSketch] = useState(0);
    const [currentIndexVillaSketch, setCurrentIndexVillaSketch] = useState(0);
    const [currentIndexStreetHouseSketch, setCurrentIndexStreetHouseSketch] = useState(0);
    const [currentIndexFactorySketch, setCurrentIndexFactorySketch] = useState(0);
    const [currentIndexInteriorSketch, setCurrentIndexInteriorSketch] = useState(0);

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 1000) {
            setSpanCol(6);
            setNumberOfCardShow(4);
        }
        if (window.innerWidth <= 1000) {
            setSpanCol(8);
            setNumberOfCardShow(3);
            setNumberOfCardNext(5);
        }
        if (window.innerWidth <= 800) {
            setSpanCol(12);
            setNumberOfCardShow(2);
            setNumberOfCardNext(6);
        }
        if (window.innerWidth <= 600) {
            setSpanCol(24);
            setNumberOfCardShow(100);
            setNumberOfCardNext(7);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    useEffect(() => {
        dispatch(getHomeListSketchRequest());
    }, []);

    // Handle pagination most view sketch
    const handleNextCardMostViewedSketch = () => {
        setCurrentIndexMostViewedSketch(currentIndexMostViewedSketch + 1);
    };
    const handlePrevCardMostViewedSketch = () => {
        setCurrentIndexMostViewedSketch(currentIndexMostViewedSketch - 1);
    };

    // Handle pagination latest sketch
    const handleNextCardLatestSketch = () => {
        setCurrentIndexLatestSketch(currentIndexLatestSketch + 1);
    };
    const handlePrevCardLatestSketch = () => {
        setCurrentIndexLatestSketch(currentIndexLatestSketch - 1);
    };

    // Handle pagination villa sketch
    const handleNextCardVillaSketch = () => {
        setCurrentIndexVillaSketch(currentIndexVillaSketch + 1);
    };
    const handlePrevCardVillaSketch = () => {
        setCurrentIndexVillaSketch(currentIndexVillaSketch - 1);
    };

    // Handle pagination latest sketch
    const handleNextCardStreetHouseSketch = () => {
        setCurrentIndexStreetHouseSketch(currentIndexStreetHouseSketch + 1);
    };
    const handlePrevCardStreetHouseSketch = () => {
        setCurrentIndexStreetHouseSketch(currentIndexStreetHouseSketch - 1);
    };

    // Handle pagination factory sketch
    const handleNextCardFactorySketch = () => {
        setCurrentIndexFactorySketch(currentIndexFactorySketch + 1);
    };
    const handlePrevCardFactorySketch = () => {
        setCurrentIndexFactorySketch(currentIndexFactorySketch - 1);
    };

    // Handle pagination interior sketch
    const handleNextCardInteriorSketch = () => {
        setCurrentIndexInteriorSketch(currentIndexInteriorSketch + 1);
    };
    const handlePrevCardInteriorSketch = () => {
        setCurrentIndexInteriorSketch(currentIndexInteriorSketch - 1);
    };


    const handleClickCard = (sketchId: string) => {
        console.log("sketchId", sketchId);
        navigate(`/detail-sketch/${sketchId}`);
        // setTimeout(() => {
        //     window.location.reload();
        // }, 500);

    };

    return (
        <motion.div
            className="main-home"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            {/* <div className="main-notification"> */}
            <Carousel autoplay>
                <div>
                    <img
                        className="image"
                        src={Notification}
                        alt="main notification"
                    />
                </div>
                <div>
                    <img
                        className="image"
                        src={Notification}
                        alt="main notification"
                    />
                </div>
                <div>
                    <img
                        className="image"
                        src={Notification}
                        alt="main notification"
                    />
                </div>

            </Carousel>
            {/* </div> */}

            <div className="tool-of-web">
                <div className="title">
                    <div>Bản vẽ được nhiều người lựa chọn</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardMostViewedSketch}
                            disabled={currentIndexMostViewedSketch === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {mostViewedSketchList
                            .slice(
                                currentIndexMostViewedSketch,
                                currentIndexMostViewedSketch + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.images[0]}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardMostViewedSketch}
                            disabled={
                                currentIndexMostViewedSketch >= mostViewedSketchList.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <CDeclare
                content="Chỉnh sửa thiết kế theo yêu cầu"
            />
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
                            onClick={handlePrevCardLatestSketch}
                            disabled={currentIndexLatestSketch === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {latestSketchsList
                            .slice(
                                currentIndexLatestSketch,
                                currentIndexLatestSketch + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.images[0]}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardLatestSketch}
                            disabled={
                                currentIndexLatestSketch >= latestSketchsList.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <CDeclare
                content="Luôn cập nhật xu hướng mới nhất"
            />
            <div className="tool-of-web">
                <div className="title">
                    <div>Bản vẽ biệt thự</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardVillaSketch}
                            disabled={currentIndexVillaSketch === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {villaSketchList
                            .slice(
                                currentIndexVillaSketch,
                                currentIndexVillaSketch + numberOfCardShow
                            )
                            .map((card: any) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.image}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardVillaSketch}
                            disabled={
                                currentIndexVillaSketch >= villaSketchList.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <CDeclare
                content="Chỉnh sửa thiết kế theo yêu cầu"
            />
            <div className="tool-of-web">
                <div className="title">
                    <div>Bài vẽ nhà phố</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardStreetHouseSketch}
                            disabled={currentIndexStreetHouseSketch === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {streetHouseSketchList
                            .slice(
                                currentIndexStreetHouseSketch,
                                currentIndexStreetHouseSketch + numberOfCardShow
                            )
                            .map((card: any) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.image}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardStreetHouseSketch}
                            disabled={
                                currentIndexStreetHouseSketch >= streetHouseSketchList.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <CDeclare
                content="Chỉnh sửa thiết kế theo yêu cầu"
            />
            <div className="tool-of-web">
                <div className="title">
                    <div>Bài vẽ nhà xưởng</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardFactorySketch}
                            disabled={currentIndexFactorySketch === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {factorySketchList
                            .slice(
                                currentIndexFactorySketch,
                                currentIndexFactorySketch + numberOfCardShow
                            )
                            .map((card: any) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.image}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardFactorySketch}
                            disabled={
                                currentIndexFactorySketch >= factorySketchList.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>
            <CDeclare
                content="Chỉnh sửa thiết kế theo yêu cầu"
            />
            <div className="tool-of-web">
                <div className="title">
                    <div>Bài vẽ nội thất</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardInteriorSketch}
                            disabled={currentIndexInteriorSketch === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {interiorSketchList
                            .slice(
                                currentIndexInteriorSketch,
                                currentIndexInteriorSketch + numberOfCardShow
                            )
                            .map((card: any) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.image}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardInteriorSketch}
                            disabled={
                                currentIndexInteriorSketch >= interiorSketchList.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>
            {/* <div className="tool-of-web">
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
            </div> */}
        </motion.div>
    );
};

export default Home;
