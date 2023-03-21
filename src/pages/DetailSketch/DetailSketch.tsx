import { Breadcrumb, Button, Col, Rate, Row } from 'antd'
import { Carousel } from 'react-responsive-carousel';
import React, { useEffect, useState } from 'react'
import CAuthorIntroduction from '../../components/AuthorIntroduction/CAuthorIntroduction'
import CComment from '../../components/Comment/CComment'
import CProductCard from '../../components/ProductCard/CProductCard'
import "./styles.detailsketch.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeftOutlined, ArrowRightOutlined, EyeOutlined } from '@ant-design/icons';

import DrawHomeImage1 from '../../images/homepage/home_img_1.png';
import DrawHomeImage2 from '../../images/homepage/home_img_2.png';
import DrawHomeImage3 from '../../images/homepage/home_img_3.png';
import DrawHomeImage4 from '../../images/homepage/home_img_4.png';
import DrawHomeImage5 from '../../images/homepage/home_img_5.png';
import DrawHomeImage6 from '../../images/homepage/home_img_6.png';
import DrawHomeImage7 from '../../images/homepage/home_img_7.png';
import DrawHomeImage8 from '../../images/homepage/home_img_8.png';
import DrawHomeImage9 from '../../images/homepage/home_img_9.png';
import DrawHomeImage10 from '../../images/homepage/home_img_10.png';
import DrawHomeImage11 from '../../images/homepage/home_img_11.png';
import DrawHomeImage12 from '../../images/homepage/home_img_12.png';
import DrawHomeImage13 from '../../images/homepage/home_img_13.png';
import DrawHomeImage14 from '../../images/homepage/home_img_14.png';
import DrawHomeImage15 from '../../images/homepage/home_img_15.png';
import DrawHomeImage16 from '../../images/homepage/home_img_16.png';
import DrawDetailImage1 from '../../images/detail/DrawDetailImage1.png';
import DrawDetailImage2 from '../../images/detail/DrawDetailImage2.png';
import DrawDetailImage3 from '../../images/detail/DrawDetailImage3.png';
import DrawDetailImage4 from '../../images/detail/DrawDetailImage4.png';
import IconDetail1 from '../../images/detail/icon-detail-1.png';
import IconDetail2 from '../../images/detail/icon-detail-2.png';
import IconDetail3 from '../../images/detail/icon-detail-3.png';
import IconDetail4 from '../../images/detail/icon-detail-4.png';
import IconDetail5 from '../../images/detail/icon-detail-5.png';
import IconDetail6 from '../../images/detail/icon-detail-6.png';

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
        title: 'Bản vẽ biệt thự 2 tầng',
        type: 'File Sketchup',
        price: '500.000VNĐ',
        view: 96,
        imageUrl: DrawHomeImage1,
    },
    {
        id: 2,
        title: 'Bản vẽ biệt thự 4 tầng',
        type: 'File 3D Max',
        price: '1.500.000VNĐ',
        view: 105,
        imageUrl: DrawHomeImage2,
    },
    {
        id: 3,
        title: 'Bản vẽ biệt thự 3 tầng',
        type: 'File Sketchup',
        price: 'Free',
        view: 365,
        imageUrl: DrawHomeImage3,
    },
    {
        id: 4,
        title: 'Thiết kế nhà gác lửng hiện đại',
        type: 'File Auto Cad',
        price: '2.500.000VNĐ',
        view: 25,
        imageUrl: DrawHomeImage4,
    },
];



const DetailSketch = () => {
    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(4);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(4);
    const [currentIndex, setCurrentIndex] = useState(0);


    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);
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
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const handleNextCard = () => {
        setCurrentIndex((currentIndex + 1));
    };

    const handlePrevCard = () => {
        setCurrentIndex(currentIndex - 1);
    };

    return (
        <div className='main-detail'>
            <div className='breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate('/')}>Trang chủ</Breadcrumb.Item>

                    <Breadcrumb.Item className='current-link'>Danh sách bản vẽ nổi bật</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='detail-sketch'>
                <div className='image-carousel'>
                    <Carousel >
                        <motion.div
                        >
                            <img alt='' src={DrawDetailImage1} />
                        </motion.div>
                        <motion.div
                        >
                            <img alt='' src={DrawDetailImage2} />
                        </motion.div>
                        <motion.div
                        >
                            <img alt='' src={DrawDetailImage3} />
                        </motion.div>
                        <motion.div
                        >
                            <img alt='' src={DrawDetailImage4} />
                        </motion.div>
                    </Carousel>
                </div>
                <div className='content'>
                    <div className='title'>Biệt thự 2 tầng</div>
                    <div className='price'>500.000Đ</div>
                    <div className='rate'>
                        <Rate defaultValue={2} disabled count={3} />
                    </div>
                    <div className='property'>
                        <div className='content'>
                            <img src={IconDetail1} />
                            <div className='text'>Ngày đăng: 03/02/2023</div>
                        </div>
                        <div className='content'>
                            <img src={IconDetail2} />
                            <div className='text'>Phong cách: Hiện đại</div>
                        </div>
                        <div className='content'>
                            <img src={IconDetail3} />
                            <div className='text'>Công cụ: 3D Max</div>
                        </div>
                        <div className='content'>
                            <img src={IconDetail4} />
                            <div className='text'>Dung lượng file: 68 MB</div>
                        </div>
                        <div className='content'>
                            <img src={IconDetail5} />
                            <div className='text'>Kích thước: Rộng 4m, Dài 15,5m, DT 62 m2</div>
                        </div>
                        <div className='content'>
                            <img src={IconDetail6} />
                            <div className='text'>Hạng mục:Kiến trúc, phối cảnh</div>
                        </div>
                    </div>
                    <div className='description'>
                        <div className='des-title'>Mô tả</div>
                        <div className='des-text'>Lorem ipsum dolor sit amet consectetur. Vitae in integer euismod sit vehicula hac sit eget sed. Sociis commodo sit a feugiat molestie blandit. Sed massa eu facilisi proin at morbi hac. Et varius vitae eleifend in velit id scelerisque. Viverra elementum mi eleifend bibendum. Odio erat cursus ac mus ornare rhoncus auctor. Amet pharetra ac sed ornare arcu facilisi. </div>

                    </div>
                    <div className='action'>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}>
                            <Button className='add-to-card' >Thêm vào giỏ hàng</Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}>
                            <Button className='download-now'>Tải xuống ngay</Button>
                        </motion.div>
                    </div>
                </div>
            </div>
            <CAuthorIntroduction />
            <div className='comment'>
                <CComment />
            </div>
            <div className='similar-sketch'>
                <div className="title">
                    <div>
                        Bản vẽ tương tự
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm'}
                    </div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} className='btn-icon' onClick={handlePrevCard} disabled={currentIndex === 0 && true} />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {featuredLst.slice(currentIndex, currentIndex + numberOfCardShow).map((card) => (
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
                        <Button icon={<ArrowRightOutlined />} className='btn-icon' onClick={handleNextCard} disabled={currentIndex >= numberOfCardNext - 4 && true} />
                    </Col>
                </div>
            </div>
        </div>
    )
}

export default DetailSketch