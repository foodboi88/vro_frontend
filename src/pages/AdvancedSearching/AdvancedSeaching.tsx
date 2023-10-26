import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFilteredSketch } from "../../common/sketch.interface";
import CArrangeBar from "../../components/ArrangeBar/CArrangeBar";
import CFilter from "../../components/Filter/CFilter";
import CPagination from "../../components/Pagination/CPagination";
import CProductCard from "../../components/ProductCard/CProductCard";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./styles.advancedsearching.scss";

const AdvancedSeaching = () => {
    const navigate = useNavigate();
    const dispatch = useDispatchRoot();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
    const [isShowButtonFilter, setIsShowButtonFilter] =
        useState<boolean>(false);

    const {
        filteredSketchs,
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
                                        // idTool={card.typeOfArchitectureId || ''}

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
