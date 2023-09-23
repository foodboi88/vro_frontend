/* eslint-disable jsx-a11y/iframe-has-title */
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    RightOutlined
} from "@ant-design/icons";
import { Button, Col, Image, Row } from "antd";
import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./styles.home.scss";
import CProductCard from "../../components/ProductCard/CProductCard";
import Declare1 from '../../images/homepage/declare2.jpg';
import Company1 from '../../images/homepage/company.png'
import CEO from '../../images/homepage/CEO.png'
import HomepageFooter from '../../images/homepage/homepage-footer.png'


import { Carousel } from 'antd';
import { ICurrentSearchValue, IReqGetLatestSketchs } from "../../common/sketch.interface";
import CDeclare from "../../components/Declare/CDeclare";
import {
    advancedSearchingRequest,
    getAllArchitecturesRequest,
    getAllToolsRequest,
    getHomeListSketchRequest
} from "../../redux/controller";
import IntroImage from "../../images/homepage/introImage.png";
import CArchitectCard from "../../components/CArchitectCard/CArchitectCard";
import CStyleCard from "../../components/CStyleCard/CStyleCard";

interface CardData {
    id: number;
    title: string;
    type: string;
    price: number;
    view: number;
    imageUrl: string;
}

// Phần trang chủ của trang web
const Home = () => {
    const { latestSketchsList, mostViewedSketchList, freeSketchList, cloneArchitecturelist, filteredSketchs, currentSearchValue } = useSelectorRoot(
        (state) => state.sketch
    ); // Lst cac ban ve

    const dispatch = useDispatchRoot();

    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(10);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(10);

    const [currentIndexMostViewedSketch, setCurrentIndexMostViewedSketch] = useState(0);
    const [currentIndexLatestSketch, setCurrentIndexLatestSketch] = useState(0);
    const [currentIndexArchitect, setCurrentIndexArchitect] = useState(0);
    const [currentIndexCompany, setCurrentIndexCompany] = useState(0);
    const [currentIndexFilteredSketch, setCurrentIndexFilteredSketch] = useState(0);


    const [currentIndexFreeSketch, setCurrentIndexFreeSketch] = useState(0);

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const excellentArchitect = [
        {
            imageUrl: '',
            name: 'Đỗ Trung Hiếu',
            email: 'austindo01@gmail.com'
        },
        {
            imageUrl: '',
            name: 'Đỗ Trung Hiếu',
            email: 'austindo01@gmail.com'
        },
        {
            imageUrl: '',
            name: 'Đỗ Trung Hiếu',
            email: 'austindo01@gmail.com'
        },
        {
            imageUrl: '',
            name: 'Đỗ Trung Hiếu',
            email: 'austindo01@gmail.com'
        },
    ]

    const companyList = [
        {
            imageUrl: Company1,

        },
        {
            imageUrl: Company1,

        },
        {
            imageUrl: Company1,

        },
        {
            imageUrl: Company1,

        },
    ]

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
        const bodyrequest: IReqGetLatestSketchs = {
            size: 50,
            offset: 0,
        };
        dispatch(getHomeListSketchRequest());
        dispatch(getAllToolsRequest(bodyrequest));
        dispatch(getAllArchitecturesRequest(bodyrequest));
        handleSearch('64231026edf9dd11e488c250');
    }, []);

    const handlePagination = (direction: string, type: string) => {
        if (direction === 'prev') {
            switch (type) {
                case 'mostView':
                    setCurrentIndexMostViewedSketch(currentIndexMostViewedSketch - 1);

                    break;
                case 'free':
                    setCurrentIndexFreeSketch(currentIndexFreeSketch - 1);

                    break;
                case 'latest':
                    setCurrentIndexLatestSketch(currentIndexLatestSketch - 1);
                    break;
                case 'filtered':
                    setCurrentIndexFilteredSketch(currentIndexFilteredSketch - 1);
                    break;
                default:
                    break;
            }
        } else {
            switch (type) {
                case 'mostView':
                    setCurrentIndexMostViewedSketch(currentIndexMostViewedSketch + 1);

                    break;
                case 'free':
                    setCurrentIndexFreeSketch(currentIndexFreeSketch + 1);

                    break;
                case 'latest':
                    setCurrentIndexLatestSketch(currentIndexLatestSketch + 1);

                    break;
                case 'filtered':
                    setCurrentIndexFilteredSketch(currentIndexFilteredSketch + 1);
                    break;
                default:
                    break;
            }
        }
    }

    const handleClickCategory = () => {

    }

    const handleClickCard = (sketchId: string) => {
        console.log("sketchId", sketchId);
        navigate(`/detail-sketch/${sketchId}`);
        // setTimeout(() => {
        //     window.location.reload();
        // }, 500);

    };

    const onClickCategory = (architectureId: string) => {
        const bodyrequest: ICurrentSearchValue = {
            name: '',
            architecture: architectureId,
            tool: '',
            style: '',
        };
        dispatch(advancedSearchingRequest(bodyrequest))
        navigate("/searching");
    }

    const handleSearch = (param: string) => {
        console.log(param);
        const bodyrequest = {
            architecture: param,
            name: '', // Lay ra gia tri text luu trong redux
        };
        console.log(bodyrequest);

        dispatch(advancedSearchingRequest(bodyrequest));
    };

    useEffect(() => {
        console.log("currentSearchValue", currentSearchValue);

    }, [currentSearchValue]);

    return (
        <motion.div
            className="main-home"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >


            <div className='header-homepage'>
                <div className="left-header">
                    <div className="slogan">
                        <div>Ngôi nhà của tôi,</div>
                        <div>Phong cách của tôi.</div>
                    </div>
                    <div className="sub-slogan">Kho bản vẽ với đa dạng chủng loại, cập nhật xu thế mới. Vro luôn là sự lựa chọn tin cậy của khách hàng trong việc cung cấp các giải pháp tư vấn bản vẽ thiết kế</div>
                    <div className="button-group">
                        <Button className="login-button">Đăng ký ngay</Button>
                        <div className="more">
                            <div>Xem sản phẩm</div>
                            <RightOutlined />
                        </div>
                    </div>
                </div>
                <div className="right-header">
                    <img src={IntroImage} />
                </div>
            </div>


            {/* Filter bản vẽ đầu trang */}
            <div className="tool-of-web">
                <div className="title">
                    <div className="category-list">
                        {
                            cloneArchitecturelist &&
                            cloneArchitecturelist.map(item => (
                                <Button
                                    className={'category-item ' + (currentSearchValue.architecture === item.id ? 'active' : '')}
                                    onClick={() => {
                                        handleSearch(item.id)
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))
                        }
                    </div>
                    <div className="sub-title">
                        {
                            filteredSketchs &&
                            <>
                                <Col>
                                    <Button
                                        icon={<ArrowLeftOutlined />}
                                        className="btn-icon"
                                        onClick={() => handlePagination('prev', 'filtered')}
                                        disabled={currentIndexFilteredSketch === 0 && true}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        icon={<ArrowRightOutlined />}
                                        className="btn-icon"
                                        onClick={() => handlePagination('next', 'filtered')}
                                        disabled={
                                            currentIndexFilteredSketch >= filteredSketchs.length - numberOfCardShow && true
                                        }
                                    />
                                </Col>
                            </>
                        }
                    </div>
                </div>
                <div className="lst-tool">
                    <Row gutter={[16, 16]}>
                        {filteredSketchs && filteredSketchs
                            .slice(
                                currentIndexFilteredSketch,
                                currentIndexFilteredSketch + numberOfCardShow
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
                                        imageUrl={card.image}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                        idTool={card.typeOfArchitectureId}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>

                </div>
            </div>

            {/* Danh sách phong cách */}
            <div className="tool-of-web">
                <div className="title">
                    <div>Phong cách</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', '')}
                                disabled={currentIndexArchitect === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', '')}
                                disabled={
                                    currentIndexArchitect >= excellentArchitect.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className="lst-tool">

                    <Row gutter={[16, 16]}>
                        {excellentArchitect
                            .slice(
                                currentIndexArchitect,
                                currentIndexArchitect + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    // onClick={() => {
                                    //     handleClickCard(card.id);
                                    // }}
                                    span={spanCol}
                                    key={card.name}
                                >
                                    <CStyleCard
                                        imageUrl={card.imageUrl}
                                        name={card.name}
                                        email={card.email}
                                    />
                                </Col>
                            ))}
                    </Row>

                </div>
            </div>

            <CDeclare
                content="Chỉnh sửa thiết kế theo yêu cầu"
                imageUrl={Declare1}
            />

            {/* Top kiến trúc sư */}
            <div className="tool-of-web">
                <div className="title">
                    <div>Top 10 kiến trúc sư xuất sắc nhất</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', '')}
                                disabled={currentIndexArchitect === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', '')}
                                disabled={
                                    currentIndexArchitect >= excellentArchitect.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className="lst-tool">

                    <Row gutter={[16, 16]}>
                        {excellentArchitect
                            .slice(
                                currentIndexArchitect,
                                currentIndexArchitect + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    // onClick={() => {
                                    //     handleClickCard(card.id);
                                    // }}
                                    span={spanCol}
                                    key={card.name}
                                >
                                    <CArchitectCard
                                        imageUrl={card.imageUrl}
                                        name={card.name}
                                    />
                                </Col>
                            ))}
                    </Row>

                </div>
            </div>

            {/* Công ty bán bản vẽ */}
            <div className="tool-of-web">
                <div className="title">
                    <div>Công ty bán bản vẽ</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', '')}
                                disabled={currentIndexCompany === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', '')}
                                disabled={
                                    currentIndexCompany >= companyList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className="lst-tool">

                    <Row gutter={[16, 16]}>
                        {companyList
                            .slice(
                                currentIndexCompany,
                                currentIndexCompany + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    // onClick={() => {
                                    //     handleClickCard(card.id);
                                    // }}
                                    span={spanCol}
                                >
                                    <img
                                        src={card.imageUrl}
                                    />
                                </Col>
                            ))}
                    </Row>

                </div>
            </div>

            <CDeclare
                content="Bản vẽ miễn phí cho bạn"
                imageUrl={Declare1}

            />

            {/* Bản vẽ bán chạy */}
            <div className="tool-of-web">
                <div className="title">
                    <div>Bản vẽ bán chạy</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'mostView')}
                                disabled={currentIndexMostViewedSketch === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'mostView')}
                                disabled={
                                    currentIndexMostViewedSketch >= mostViewedSketchList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className="lst-tool">
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
                                        idTool={card.designTools[0] || ''}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>

                </div>
            </div>

            {/* Bản vẽ miễn phí */}
            <div className="tool-of-web">
                <div className="title">
                    <div>Bản vẽ miễn phí</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'free')}
                                disabled={currentIndexFreeSketch === 0 && true}
                            />
                        </Col>

                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'free')}
                                disabled={
                                    currentIndexFreeSketch >= freeSketchList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                {freeSketchList.length > 0 &&
                    <div className="lst-tool">
                        <Row gutter={[16, 16]}>
                            {freeSketchList
                                .slice(
                                    currentIndexFreeSketch,
                                    currentIndexFreeSketch + numberOfCardShow
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
                                            idTool={card.designTools[0] || ''}

                                        // type={card.type}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                }
            </div>
            <div className='homepage-footer'>
                <div className="left-footer">
                    <div className="slogan">
                        <div>Lời chào từ VRO <strong>”</strong></div>
                    </div>
                    <div className="wellcome">Gửi các Quý khách hàng những người luôn quan tâm tới ngôi nhà thân yêu. Gửi tới các bạn Kiến trúc sư, Quý công ty Xây dựng Với sứ mệnh kết nối để đem lại những công trình tuyệt vời, Vro đã tạo nên sàn Thương mại điện tử nhằm kết nối khách hàng Với tiêu chí chuyên nghiệp, tạo mọi điều kiện tốt nhất cho khách hàng, chúng tôi sẽ.</div>
                    <div className="info">
                        <img src={CEO} />
                        <div className="more">
                            <div className="name-more">Hoàng Đức Thắng</div>
                            <div className="content-more">Chủ tịch Công ty VRO</div>
                        </div>
                    </div>
                </div>
                <div className="right-footer">
                    <img src={HomepageFooter} />
                </div>
            </div>

        </motion.div>
    );
};

export default Home;
