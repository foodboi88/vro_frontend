import { Button, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import CArrangeBar from "../../components/ArrangeBar/CArrangeBar";
import CAuthorIntroduction from "../../components/AuthorIntroduction/CAuthorIntroduction";
import CFilter from "../../components/Filter/CFilter";
import CProductCard from "../../components/ProductCard/CProductCard";
import "./styles.advancedsearching.scss";
import { motion } from "framer-motion";
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
import Meta from "antd/lib/card/Meta";
import { useNavigate } from "react-router-dom";
import { useSelectorRoot } from "../../redux/store";
import CPagination from "../../components/Pagination/CPagination";
import { IFilteredSketch } from "../../common/sketch.interface";

interface CardData {
    id: number;
    title: string;
    type: string;
    price: number;
    view: number;
    imageUrl: string;
}
const data: CardData[] = [
    {
        id: 1,
        title: "Bản vẽ biệt thự 2 tầng",
        type: "File Sketchup",
        price: 500000,
        view: 96,
        imageUrl: DrawHomeImage1,
    },
    {
        id: 2,
        title: "Bản vẽ biệt thự 4 tầng",
        type: "File 3D Max",
        price: 1500000,
        view: 105,
        imageUrl: DrawHomeImage2,
    },
    {
        id: 3,
        title: "Bản vẽ biệt thự 3 tầng",
        type: "File Sketchup",
        price: 0,
        view: 365,
        imageUrl: DrawHomeImage3,
    },
    {
        id: 4,
        title: "Thiết kế nhà gác lửng hiện đại",
        type: "File Auto Cad",
        price: 0,
        view: 25,
        imageUrl: DrawHomeImage4,
    },
    {
        id: 5,
        title: "Dựng ngoại cảnh căn biệt thự",
        type: "File Auto cad",
        price: 0,
        view: 245,
        imageUrl: DrawHomeImage5,
    },
    {
        id: 6,
        title: "Thiết kế biệt thự 2 tầng",
        type: "File Sketchup",
        price: 0,
        view: 32,
        imageUrl: DrawHomeImage6,
    },
    {
        id: 7,
        title: "Bản vẽ biệt thự 2 tầng",
        type: "File Sketchup",
        price: 0,
        view: 26,
        imageUrl: DrawHomeImage7,
    },
    {
        id: 8,
        title: "Bản vẽ biệt thự 2 tầng",
        type: "File Sketchup",
        price: 0,
        view: 85,
        imageUrl: DrawHomeImage8,
    },
    {
        id: 9,
        title: "Bản vẽ biệt thự 3 tầng cổ điển",
        type: "File 3D Max",
        price: 0,
        view: 265,
        imageUrl: DrawHomeImage9,
    },
    {
        id: 10,
        title: "Bản vẽ nhà xưởng",
        type: "File Revit",
        price: 0,
        view: 500,
        imageUrl: DrawHomeImage10,
    },
    {
        id: 11,
        title: "Bản vẽ biệt thự phong cách Nhật",
        type: "File Revit",
        price: 0,
        view: 65,
        imageUrl: DrawHomeImage11,
    },
    {
        id: 12,
        title: "Biệt thự phong cách Roman",
        type: "File 3D Max",
        price: 0,
        view: 152,
        imageUrl: DrawHomeImage12,
    },
    {
        id: 13,
        title: "Biệt thự mái thái",
        type: "File Revit",
        price: 0,
        view: 65,
        imageUrl: DrawHomeImage13,
    },
    {
        id: 14,
        title: "Biệt thự Tân cổ điển",
        type: "File Auto cad",
        price: 0,
        view: 98,
        imageUrl: DrawHomeImage14,
    },
];

const AdvancedSeaching = () => {
    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
    const [isShowButtonFilter, setIsShowButtonFilter] =
        useState<boolean>(false);

    const {
        toolList,
        architectureList,
        styleList,
        filteredSketchs,
        filteredAuthors,
        currentSearchValue,
    } = useSelectorRoot((state) => state.sketch);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);
    const [newfilteredSketchs, setNewFilteredSketchs] = useState<IFilteredSketch[]>();
    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 900) {
            setSpanCol(6);
            setIsShowButtonFilter(false);
        }
        if (window.innerWidth <= 900) {
            setSpanCol(8);
            setIsShowButtonFilter(true);
        }
        if (window.innerWidth <= 600) {
            setSpanCol(12);
        }
        if (window.innerWidth <= 400) {
            setSpanCol(24);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [window.innerWidth]);

    const goToDetailPageHandle = (id: string) => {
        navigate(`/detail-sketch/${id}`);
    };

    const onChangePage = (page: number) => {
        setCurrentPage(page);
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        if (!filteredSketchs) return;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentItems = filteredSketchs?.slice(startIndex, endIndex);
        setNewFilteredSketchs(currentItems);
    }, [currentPage, filteredSketchs]);

    return (
        <div className="main">
            <CFilter />
            <div className="filtered-items">
                <div className="author-introduction">

                </div>
                <div className="sketch-list">

                    <CArrangeBar />
                    <Row className="detail-list" gutter={[16, 24]}>
                        {newfilteredSketchs &&
                            newfilteredSketchs.map((card) => (
                                <Col
                                    onClick={() => {
                                        goToDetailPageHandle(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.image}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                        idTool={card.typeOfArchitectureId || ''}

                                    // type={card.}
                                    />
                                </Col>
                            ))}
                    </Row>
                </div>
                <CPagination
                    total={filteredSketchs?.length}
                    currentPage={currentPage}
                    onChange={onChangePage}
                />
            </div>
        </div>
    );
};

export default AdvancedSeaching;
