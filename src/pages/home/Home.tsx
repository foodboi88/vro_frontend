/* eslint-disable jsx-a11y/iframe-has-title */
import {
    ArrowLeftOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.home.scss";

import SeeMore from '../../images/homepage/discovermore2.png';


import { ICurrentSearchValue, IFilteredSketch, IReqGetLatestSketchs } from "../../common/sketch.interface";
import { IAuthor } from "../../common/user.interface";
import CStyleCard from "../../components/CStyleCard/CStyleCard";
import CDeclare from "../../components/Declare/CDeclare";
import CProductCard from "../../components/ProductCard/CProductCard";
import CEO from '../../images/homepage/CEO.png';
import Company1 from '../../images/homepage/company.png';
import Declare1 from '../../images/homepage/declare2.jpg';
import ExcellentArchitect1 from "../../images/homepage/excellentArchitect1.png";
import ExcellentArchitect2 from "../../images/homepage/excellentArchitect2.png";
import ExcellentArchitect3 from "../../images/homepage/excellentArchitect3.png";
import ExcellentArchitect4 from "../../images/homepage/excellentArchitect4.png";
import HomepageFooter from '../../images/homepage/homepage-footer.png';
import IntroImage from "../../images/homepage/introImage.png";
import StyleList1 from "../../images/homepage/styleList1.png";
import StyleList2 from "../../images/homepage/styleList2.png";
import StyleList3 from "../../images/homepage/styleList3.png";
import CustomerRequirementImage1 from '../../images/homepage/customer-requirement-1.svg';
import CustomerRequirementImage2 from '../../images/homepage/customer-requirement-2.svg';
import CustomerRequirementImage3 from '../../images/homepage/customer-requirement-3.svg';
import CustomerRequirementImage4 from '../../images/homepage/customer-requirement-4.svg';
import CustomerRequirementImage5 from '../../images/homepage/customer-requirement-5.svg';
import CustomerRequirementImage6 from '../../images/homepage/customer-requirement-6.svg';

import CategoryImage1 from '../../images/homepage/category-image-1.png';
import CategoryImage2 from '../../images/homepage/category-image-2.png';
import CategoryImage3 from '../../images/homepage/category-image-3.png';
import CategoryImage4 from '../../images/homepage/category-image-4.png';
import CategoryImage5 from '../../images/homepage/category-image-5.png';
import CategoryImage6 from '../../images/homepage/category-image-6.png';
import CategoryImage7 from '../../images/homepage/category-image-7.png';
import CategoryImage8 from '../../images/homepage/category-image-8.png';
import CategoryImage9 from '../../images/homepage/category-image-9.png';
import CategoryImage10 from '../../images/homepage/category-image-10.png';
import CategoryImage11 from '../../images/homepage/category-image-11.png';
import CategoryImage12 from '../../images/homepage/category-image-12.png';

import {
    advancedSearchingRequest,
    getAllArchitecturesRequest,
    getAllStylesRequest,
    // getAllToolsRequest,
    getHomeListSketchRequest,
    getTopArchitectsRequest
} from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import Login from "../login/Login";
import Register from "../login/Register";
import "./styles.home.scss";
import { FaRegClock } from "react-icons/fa";

interface CardData {
    id: number;
    title: string;
    type: string;
    price: number;
    view: number;
    imageUrl: string;
}
const CustomerRequirementsList = [
    {
        avatar: CustomerRequirementImage1,
        name: 'Phạm Thảo Mai',
        time: '16:00 - 24/11/2023',
        title: 'Cần tìm KTS thiết kế biệt thự tân cổ điển 3 tầng ở khu vực Hà Đông',
        content: 'Mình cần tìm KTS thiết kế trọn gói và thi công biệt thự 3 tầng, bao gồm cả sân..'
    },
    {
        avatar: CustomerRequirementImage2,
        name: 'Phạm Thảo Mai',
        time: '16:00 - 24/11/2023',
        title: 'Cần tìm KTS thiết kế biệt thự tân cổ điển 3 tầng ở khu vực Hà Đông',
        content: 'Mình cần tìm KTS thiết kế trọn gói và thi công biệt thự 3 tầng, bao gồm cả sân..'
    },
    {
        avatar: CustomerRequirementImage3,
        name: 'Lương Bá Sơn',
        time: '16:00 - 24/11/2023',
        title: 'Cần tìm KTS thiết kế biệt thự tân cổ điển 3 tầng ở khu vực Hà Đông',
        content: 'Mình cần tìm KTS thiết kế trọn gói và thi công biệt thự 3 tầng, bao gồm cả sân..'
    },
    {
        avatar: CustomerRequirementImage4,
        name: 'Lương Bá Sơn',
        time: '16:00 - 24/11/2023',
        title: 'Cần tìm KTS thiết kế biệt thự tân cổ điển 3 tầng ở khu vực Hà Đông',
        content: 'Mình cần tìm KTS thiết kế trọn gói và thi công biệt thự 3 tầng, bao gồm cả sân..'
    },
    {
        avatar: CustomerRequirementImage5,
        name: 'Lương Bá Sơn',
        time: '16:00 - 24/11/2023',
        title: 'Cần tìm KTS thiết kế biệt thự tân cổ điển 3 tầng ở khu vực Hà Đông',
        content: 'Mình cần tìm KTS thiết kế trọn gói và thi công biệt thự 3 tầng, bao gồm cả sân..'
    },
    {
        avatar: CustomerRequirementImage6,
        name: 'Lương Bá Sơn',
        time: '16:00 - 24/11/2023',
        title: 'Cần tìm KTS thiết kế biệt thự tân cổ điển 3 tầng ở khu vực Hà Đông',
        content: 'Mình cần tìm KTS thiết kế trọn gói và thi công biệt thự 3 tầng, bao gồm cả sân..'
    }
]

const CategoryList = [
    {
        imageUrl: CategoryImage1,
        name: 'Phòng khách',
        id: '64231026edf9dd11e488c250'
    },
    {
        imageUrl: CategoryImage2,
        name: 'Phòng bếp',
        id: '64231026edf9dd11e488c251'
    },
    {
        imageUrl: CategoryImage3,
        name: 'Phòng ngủ',
        id: '64231026edf9dd11e488c252'
    },
    {
        imageUrl: CategoryImage4,
        name: 'Phòng tắm',
        id: '64231026edf9dd11e488c253'
    },
    {
        imageUrl: CategoryImage5,
        name: 'Phòng làm việc',
        id: '64231026edf9dd11e488c254'
    },
    {
        imageUrl: CategoryImage6,
        name: 'Phòng thờ',
        id: '64231026edf9dd11e488c255'
    },
    {
        imageUrl: CategoryImage7,
        name: 'Phòng khách',
        id: '64231026edf9dd11e488c256'
    },
    {
        imageUrl: CategoryImage8,
        name: 'Phòng bếp',
        id: '64231026edf9dd11e488c257'
    },
    {
        imageUrl: CategoryImage9,
        name: 'Phòng ngủ',
        id: '64231026edf9dd11e488c258'
    },
    {
        imageUrl: CategoryImage10,
        name: 'Phòng tắm',
        id: '64231026edf9dd11e488c259'
    },
    {
        imageUrl: CategoryImage11,
        name: 'Phòng làm việc',
        id: '64231026edf9dd11e488c260'
    },
    {
        imageUrl: CategoryImage12,
        name: 'Phòng thờ',
        id: '64231026edf9dd11e488c261'
    },
]
// Phần trang chủ của trang web
const Home = () => {
    const { latestSketchsList, mostViewedSketchList, freeSketchList, cloneArchitecturelist, filteredSketchs, cloneStyleList, currentSearchValue, architectList } = useSelectorRoot(
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
    const [currentIndexStyle, setCurrentIndexStyle] = useState(0);
    const [currentIndexCategory, setCurrentIndexCategory] = useState(0);
    const [cloneFilteredSketchs, setCloneFilteredSketchs] = useState<IFilteredSketch[]>([]);
    const [cloneArchitects, setCloneArchitects] = useState<IAuthor[]>([]);
    const [categoryLst, setCategoryLst] = useState<any[]>([]);
    const [currentIndexFreeSketch, setCurrentIndexFreeSketch] = useState(0);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        console.log(cloneArchitecturelist);
        let tmp: any[] = []
        cloneArchitecturelist && cloneArchitecturelist.length > 0 && cloneArchitecturelist.map((item, index) => {
            tmp.push({
                ...item,
                imageUrl: CategoryList[index].imageUrl,
            })
        })
        setCategoryLst(tmp);
    }, [cloneArchitecturelist])

    useEffect(() => {
        let lastSketch = {
            "id": "last",
            "title": "",
            "price": -1,
            "views": 56,
            "likes": 0,
            "quantityPurchased": 0,
            "typeOfArchitectureId": "",
            "image": SeeMore
        };
        setCloneFilteredSketchs([...filteredSketchs, lastSketch])

        let lastArchitect = {
            name: '',
            phone: '',
            address: '',
            totalRating: 0,
            totalProduct: 0,
            createdAt: '',
            updateAt: '',
            linkImage: SeeMore,
            id: 'last',
        }
        setCloneArchitects([...architectList, lastArchitect])
    }, [filteredSketchs, architectList])


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
        dispatch(getTopArchitectsRequest());
        dispatch(getAllArchitecturesRequest(bodyrequest));
        dispatch(getAllStylesRequest(bodyrequest));
        dispatch(getTopArchitectsRequest());
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
                case 'style':
                    setCurrentIndexStyle(currentIndexStyle - 1);
                    break;
                case 'architect':
                    setCurrentIndexArchitect(currentIndexArchitect - 1);
                    break;
                case 'company':
                    setCurrentIndexCompany(currentIndexCompany - 1);
                    break;
                case 'category':
                    setCurrentIndexCategory(currentIndexCategory - 1);
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
                case 'style':
                    setCurrentIndexStyle(currentIndexStyle + 1);
                    break;
                case 'architect':
                    setCurrentIndexArchitect(currentIndexArchitect + 1);
                    break;
                case 'company':
                    setCurrentIndexCompany(currentIndexCompany + 1);
                    break;
                case 'category':
                    setCurrentIndexCategory(currentIndexCategory + 1);
                    break;
                default:
                    break;
            }
        }
    }

    const handleClickCard = (sketchId: string) => {
        console.log("sketchId", sketchId);
        if (sketchId === 'last') {
            const bodyrequest: ICurrentSearchValue = {
                name: '',
                architecture: currentSearchValue.architecture,
                tool: currentSearchValue.tool,
                style: currentSearchValue.style,
            };
            dispatch(advancedSearchingRequest(bodyrequest));
            navigate("/searching");
        } else {
            navigate(`/detail-sketch/${sketchId}`);
        }
        // setTimeout(() => {
        //     window.location.reload();
        // }, 500);

    };

    const handleClickArchitect = (architectId: string) => {
        if (architectId === 'last') {
            // const bodyrequest: ICurrentSearchValue = {
            //     name: '',
            //     architecture: currentSearchValue.architecture,
            //     tool: currentSearchValue.tool,
            //     style: currentSearchValue.style,
            // };
            // dispatch(advancedSearchingRequest(bodyrequest));
            // navigate("/searching");
        } else {
            navigate(`/author-page/${architectId}`);
        }
    }

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
            size: 7,
            architecture: param,
            name: '', // Lay ra gia tri text luu trong redux
        };
        console.log(bodyrequest);

        dispatch(advancedSearchingRequest(bodyrequest));
    };

    useEffect(() => {
        console.log("currentSearchValue", currentSearchValue);

    }, [currentSearchValue]);

    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal registration hay chưa
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const checkIsLogin = (val: boolean) => {
        setIsLogin(val);
    };
    // Hàm chuyển đổi trạng thái đóng mở modal login
    const toggleLoginModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };
    // Hàm chuyển đổi trạng thái đóng mở modal registration
    const toggleRegisterModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };

    const handleCancelModal = () => {
        setIsOpenLoginModal(false);
        setIsOpenRegisterModal(false);
    }
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
                        Ngôi nhà của tôi,<br />
                        Phong cách của tôi.
                    </div>
                    <div className="sub-slogan">Kho bản vẽ với đa dạng chủng loại, là sản phẩm tâm huyết từ các Công ty xây dựng và Kiến trúc sư trên khắp Việt Nam.
                    </div>
                    <div className="button-group">
                        {!isLogin &&
                            <Button className="login-button" onClick={() => setIsOpenRegisterModal(true)}>Đăng ký ngay</Button>
                        }
                        <Login
                            checkIsLogin={checkIsLogin}
                            isOpenModal={isOpenLoginModal}
                            toggleLoginModal={toggleLoginModal}
                            toggleRegisterModal={toggleRegisterModal}
                            handleCancelModal={handleCancelModal}
                        />
                        <Register
                            isOpenModal={isOpenRegisterModal}
                            toggleLoginModal={toggleLoginModal}
                            toggleRegisterModal={toggleRegisterModal}
                            handleCancelModal={handleCancelModal}
                        />
                    </div>
                </div>
                <div className="right-header">
                    <img src={IntroImage} />
                </div>
            </div>


            {/* Filter bản vẽ đầu trang */}
            <div className="tool-of-web">
                <div className="title">
                    <div>DANH MỤC</div>
                    <div className="sub-title">
                        {
                            categoryLst &&
                            <>
                                <Col>
                                    <Button
                                        icon={<ArrowLeftOutlined />}
                                        className="btn-icon"
                                        onClick={() => handlePagination('prev', 'category')}
                                        disabled={currentIndexCategory === 0 && true}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        icon={<ArrowRightOutlined />}
                                        className="btn-icon"
                                        onClick={() => handlePagination('next', 'category')}
                                        disabled={
                                            currentIndexCategory >= categoryLst.length - numberOfCardShow && true
                                        }
                                    />
                                </Col>
                            </>
                        }
                    </div>
                </div>
                <div className={"lst-tool "}>

                    {
                        categoryLst.length > 0 &&
                        categoryLst
                            .slice(
                                currentIndexCategory,
                                currentIndexCategory + numberOfCardShow
                            )
                            .map((card) => (
                                <div
                                    onClick={() => onClickCategory(card.id)}
                                    key={card.name}
                                >
                                    <CStyleCard
                                        imageUrl={card.imageUrl}
                                        name={''}
                                        id={''}
                                    />
                                </div>
                            ))
                    }

                    {/* <Row gutter={[16, 16]}>
                        {categoryLst
                            .slice(
                                currentIndexCategory,
                                currentIndexCategory + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    span={spanCol}
                                    key={card.name}
                                    onClick={() => onClickCategory(card.id)}
                                >
                                    <CStyleCard
                                        imageUrl={card.imageUrl}
                                        name={''}
                                        id={''}
                                    />
                                </Col>
                            ))}
                    </Row> */}
                </div>
            </div>

            {/* Danh sách phong cách */}
            <div className="tool-of-web">
                <div className="title">
                    <div>PHONG CÁCH</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'style')}
                                disabled={currentIndexStyle === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'style')}
                                disabled={
                                    currentIndexStyle >= cloneStyleList.length - numberOfCardShow && true
                                    // currentIndexStyle >= styleList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className={"lst-tool "}>
                    {cloneStyleList.length > 0 &&
                        cloneStyleList
                            .slice(
                                currentIndexStyle,
                                currentIndexStyle + numberOfCardShow
                            )
                            .map((card) => (
                                <div
                                    onClick={() => {
                                        handleSearch(card.id);
                                    }}
                                    key={card.id}
                                >
                                    <CStyleCard
                                        imageUrl={card.imageUrl}
                                        name={card.name}
                                        id={card.id}
                                    />
                                </div>
                            ))

                    }

                    {/* <Row gutter={[16, 16]}>
                        {cloneStyleList
                            .slice(
                                currentIndexStyle,
                                currentIndexStyle + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    span={spanCol}
                                    key={card.name}
                                >
                                    <CStyleCard
                                        imageUrl={card.imageUrl}
                                        name={card.name}
                                        id={card.id}
                                    />
                                </Col>
                            ))}
                    </Row> */}
                </div>

            </div>

            <CDeclare
                content="Chỉnh sửa thiết kế theo yêu cầu"
                imageUrl={Declare1}
            />

            {/* Top kiến trúc sư */}
            <div className="tool-of-web">
                <div className="title">
                    <div>KIẾN TRÚC SƯ</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'architect')}
                                disabled={currentIndexArchitect === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'architect')}
                                disabled={
                                    currentIndexArchitect >= cloneArchitects.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className="lst-tool architect-card">
                    {cloneArchitects.length > 0 &&
                        cloneArchitects
                            .slice(
                                currentIndexArchitect,
                                currentIndexArchitect + numberOfCardShow
                            )
                            .map((card, index) => (
                                <div
                                    onClick={() => {
                                        handleClickArchitect(card.id || '');
                                    }}
                                    key={card.id}
                                >
                                    <CStyleCard
                                        imageUrl={card.linkImage}
                                        name={card.name || ''}
                                        id={card.name}
                                    />
                                </div>
                            ))
                    }


                    {/* <Row gutter={[16, 16]}>
                        {cloneArchitects
                            .slice(
                                currentIndexArchitect,
                                currentIndexArchitect + numberOfCardShow
                            )
                            .map((card, index) => (
                                <Col
                                    onClick={() => {
                                        handleClickArchitect(card.id || '');
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CStyleCard
                                        imageUrl={card.linkImage}
                                        name={card.name || ''}
                                        id={card.name}
                                    />
                                </Col>
                            ))}
                    </Row> */}

                </div>
            </div>

            {/* <div className="tool-of-web">
                <div className="title">
                    <div>CÔNG TY X Y DỰNG – KIẾN TRÚC
                    </div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'company')}
                                disabled={currentIndexCompany === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'company')}
                                disabled={
                                    currentIndexCompany >= companyList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className="lst-tool architect-card">

                    <Row gutter={[16, 16]}>
                        {companyList
                            .slice(
                                currentIndexCompany,
                                currentIndexCompany + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    span={spanCol}
                                >
                                    <CStyleCard
                                        imageUrl={card.imageUrl}
                                        name={''}
                                        id={''}
                                    />
                                </Col>
                            ))}
                    </Row>

                </div>
            </div> */}

            <CDeclare
                content="Bản vẽ miễn phí cho bạn"
                imageUrl={Declare1}

            />

            {/* Bản vẽ bán chạy */}
            <div className="tool-of-web">
                <div className="title">
                    <div>BẢN VẼ NỔI BẬT</div>
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
                <div className="lst-tool ">
                    {mostViewedSketchList.length > 0 &&
                        mostViewedSketchList
                            .slice(
                                currentIndexMostViewedSketch,
                                currentIndexMostViewedSketch + numberOfCardShow
                            )
                            .map((card) => (
                                <div
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.images[0]}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // idTool={card.designTools[0] || ''}

                                    // type={card.type}
                                    />
                                </div>
                            ))
                    }

                    {/* <Row gutter={[16, 16]}>
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
                                    span={mostViewedSketchList.length < numberOfCardShow - 1 ? (spanCol * (mostViewedSketchList.length)) : spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.images[0]}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // idTool={card.designTools[0] || ''}
                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row> */}

                </div>
            </div>

            {/* Bản vẽ miễn phí */}
            <div className="tool-of-web">
                <div className="title">
                    <div>BẢN VẼ CHÀO MỪNG</div>
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
                        {freeSketchList
                            .slice(
                                currentIndexFreeSketch,
                                currentIndexFreeSketch + numberOfCardShow
                            )
                            .map((card) => (
                                <div
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.images[0]}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                    // idTool={card.designTools[0] || ''}

                                    // type={card.type}
                                    />
                                </div>
                            ))
                        }

                        {/* <Row gutter={[16, 16]}>
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
                                        span={(freeSketchList.length < numberOfCardShow - 1) ? (spanCol * (freeSketchList.length)) : spanCol}
                                        // span={8}
                                        key={card.id}
                                    >
                                        <CProductCard
                                            imageUrl={card.images[0]}
                                            title={card.title}
                                            view={card.views}
                                            price={card.price}
                                        // idTool={card.designTools[0] || ''}

                                        // type={card.type}
                                        />
                                    </Col>
                                ))}
                        </Row> */}
                    </div>
                }
            </div>
            {/* Bản vẽ miễn phí */}
            <div className="tool-of-web">
                <div className="title">
                    <div>NHU CẦU KHÁCH HÀNG</div>
                    {/* <div className="sub-title">
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
                    </div> */}
                </div>
                {/* {freeSketchList.length > 0 &&
                    <div className={"lst-tool " + ((freeSketchList && freeSketchList.length < numberOfCardShow) && 'less-card')}>

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
                                        span={(freeSketchList.length < numberOfCardShow - 1) ? (spanCol * (freeSketchList.length)) : spanCol}
                                        key={card.id}
                                    >
                                        <CProductCard
                                            imageUrl={card.images[0]}
                                            title={card.title}
                                            view={card.views}
                                            price={card.price}
                                        // idTool={card.designTools[0] || ''}

                                        // type={card.type}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                } */}
                <div className="customer-requirement-lst">
                    <div className="customer-requirement-lst-left">
                        {(CustomerRequirementsList && CustomerRequirementsList.length > 0) && CustomerRequirementsList.slice(0, 3).map((item, index) => (
                            <div className="customer-requirement">
                                <div className="customer-requirement-header">
                                    <div className="avatar">
                                        <div className="customer-requirement-avatar">
                                            <img src={item.avatar} />
                                        </div>
                                        <div className="customer-requirement-info">
                                            <div className="customer-requirement-name">{item.name}</div>
                                            <div className="customer-requirement-time"><FaRegClock />{item.time}</div>
                                        </div>
                                    </div>

                                    <div className="info">
                                        Liên hệ
                                    </div>
                                </div>
                                <div className="customer-requirement-title">{item.title}</div>
                                <div className="customer-requirement-content">{item.content}</div>
                                <div className="line-break"></div>
                            </div>
                        ))}
                    </div>
                    <div className="customer-requirement-lst-left">
                        {(CustomerRequirementsList && CustomerRequirementsList.length > 0) && CustomerRequirementsList.slice(3, 6).map((item, index) => (
                            <div className="customer-requirement">
                                <div className="customer-requirement-header">
                                    <div className="avatar">
                                        <div className="customer-requirement-avatar">
                                            <img src={item.avatar} />
                                        </div>
                                        <div className="customer-requirement-info">
                                            <div className="customer-requirement-name">{item.name}</div>
                                            <div className="customer-requirement-time"><FaRegClock />{item.time}</div>
                                        </div>
                                    </div>

                                    <div className="info">
                                        Liên hệ
                                    </div>
                                </div>
                                <div className="customer-requirement-title">{item.title}</div>
                                <div className="customer-requirement-content">{item.content}</div>
                                <div className="line-break"></div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className='homepage-footer'>
                <div className="left-footer">
                    <div className="slogan">
                        <div>Lời chào từ VRO <strong>”</strong></div>
                    </div>
                    <div className="wellcome">Kính gửi Quý khách hàng – những người luôn muốn đem lại những gì tốt đẹp nhất cho ngôi nhà thân yêu; Gửi các bạn Kiến trúc sư, đối tác Công ty Xây dựng đầy tâm huyết.<br />Với sứ mệnh kết nối để tạo nên những công trình tuyệt vời, VRO đã tạo nên một không gian mở giới thiệu những thiết kế và công ty Xây dựng, KTS tới khách hàng. Hãy cùng nhau xây dựng nên cộng đồng để tôn vinh cái đẹp, sự tối ưu cho những công trình thân yêu.
                    </div>
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
