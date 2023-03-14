/* eslint-disable jsx-a11y/iframe-has-title */
import { EyeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, notification } from 'antd';
import Meta from 'antd/lib/card/Meta'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Variants, motion, useTransform, useViewportScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageOfIntro from '../../images/home_image_1.png';
import HowToUse from '../../images/home_image_2.png';
import HowToUse1 from '../../images/how_to_use1.png';
import HowToUse2 from '../../images/how_to_use2.png';
import HowToUse3 from '../../images/how_to_use3.png';
import HowToUse4 from '../../images/how_to_use4.png';
import HowToUse5 from '../../images/how_to_use5.png';
import RightOfUseImage1 from '../../images/right_of_use_image_1.png';
import RightOfUseImage2 from '../../images/right_of_use_image_2.png';
import RightOfUseImage3 from '../../images/right_of_use_image_3.png';
import RightOfUseImage4 from '../../images/right_of_use_image_4.png';
import RightOfUseImage5 from '../../images/right_of_use_image_5.png';
import { useSelectorRoot } from '../../redux/store';
import BietThu from '../../images/homepage/bietthu1.png';
import Notification from '../../images/homepage/notification.png'
import './styles.home.scss';
import CProductCard from '../../components/ProductCard/CProductCard';
interface CardData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const cardData: CardData[] = [
    {
        id: 1,
        title: 'Card 1',
        description: 'This is the first card',
        imageUrl: 'https://picsum.photos/id/1/200/300',
    },
    {
        id: 2,
        title: 'Card 2',
        description: 'This is the second card',
        imageUrl: 'https://picsum.photos/id/2/200/300',
    },
    {
        id: 3,
        title: 'Card 3',
        description: 'This is the third card',
        imageUrl: 'https://picsum.photos/id/3/200/300',
    },
    {
        id: 4,
        title: 'Card 4',
        description: 'This is the fourth card',
        imageUrl: 'https://picsum.photos/id/4/200/300',
    },
    {
        id: 5,
        title: 'Card 5',
        description: 'This is the fifth card',
        imageUrl: 'https://picsum.photos/id/5/200/300',
    },
    {
        id: 6,
        title: 'Card 6',
        description: 'This is the sixth card',
        imageUrl: 'https://picsum.photos/id/6/200/300',
    },
];

const imageVariants: Variants = {
    offscreen: {
        y: 100,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2
        }
    }
};

const hoverVariants = {
    hover: {
        scale: 1.1,
        opacity: 0.8,
        borderRadius: '30px'
    },
    tap: {
        scale: 0.8
    },
};

// Phần trang chủ của trang web
const Home = () => {
    const { tokenLogin, user } = useSelectorRoot((state) => state.login);
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


    // useEffect(() => {

    // })


    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextCard = () => {
        setCurrentIndex((currentIndex + 1) % cardData.length);
    };

    const handlePrevCard = () => {
        setCurrentIndex(currentIndex === 0 ? cardData.length - 1 : currentIndex - 1);
    };
    return (
        <motion.div
            className='main-home'
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >

            <div className='main-notification'>
                <img className='image' src={Notification} alt="main notification" />
            </div>

            <div className='tool-of-web'>
                <div className="title">
                    <div>
                        Danh sách bản vẽ nổi bật
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm ->'}
                    </div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={handlePrevCard} disabled={currentIndex === 0 && true} />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {cardData.slice(currentIndex, currentIndex + numberOfCardShow).map((card) => (
                            <Col span={spanCol} key={card.id}>
                                <Card
                                    className='card'
                                    hoverable
                                    cover={<img alt="example" src={BietThu} />}
                                >
                                    <div className='title-and-price'>
                                        <Meta title={card.title} description={card.description} />
                                        <span>500.000Đ</span>
                                    </div>
                                    <div className='seen-times'>
                                        <EyeOutlined />
                                        <span>100</span>
                                    </div>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Col>
                        <Button icon={<ArrowRightOutlined />} onClick={handleNextCard} disabled={currentIndex >= numberOfCardNext - 2 && true} />
                    </Col>
                </div>
            </div>
            <div className='tool-of-web'>
                <div className="title">
                    <div>
                        Danh sách bản vẽ nổi bật
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm ->'}
                    </div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={handlePrevCard} disabled={currentIndex === 0 && true} />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {cardData.slice(currentIndex, currentIndex + numberOfCardShow).map((card) => (
                            <Col span={spanCol} key={card.id}>
                                <Card
                                    className='card'
                                    hoverable
                                    cover={<img alt="example" src={BietThu} />}
                                >
                                    <div className='title-and-price'>
                                        <Meta title={card.title} description={card.description} />
                                        <span>500.000Đ</span>
                                    </div>
                                    <div className='seen-times'>
                                        <EyeOutlined />
                                        <span>100</span>
                                    </div>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Col>
                        <Button icon={<ArrowRightOutlined />} onClick={handleNextCard} disabled={currentIndex >= numberOfCardNext - 2 && true} />
                    </Col>
                </div>
            </div>
            <div className='tool-of-web'>
                <div className="title">
                    <div>
                        Danh sách bản vẽ nổi bật
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm ->'}
                    </div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={handlePrevCard} disabled={currentIndex === 0 && true} />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {cardData.slice(currentIndex, currentIndex + numberOfCardShow).map((card) => (
                            <Col span={spanCol} key={card.id}>
                                <Card
                                    className='card'
                                    hoverable
                                    cover={<img alt="example" src={BietThu} />}
                                >
                                    <div className='title-and-price'>
                                        <Meta title={card.title} description={card.description} />
                                        <span>500.000Đ</span>
                                    </div>
                                    <div className='seen-times'>
                                        <EyeOutlined />
                                        <span>100</span>
                                    </div>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Col>
                        <Button icon={<ArrowRightOutlined />} onClick={handleNextCard} disabled={currentIndex >= numberOfCardNext - 2 && true} />
                    </Col>
                </div>
            </div>
            <div className='tool-of-web'>
                <div className="title">
                    <div>
                        Danh sách bản vẽ nổi bật
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm ->'}
                    </div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button icon={<ArrowLeftOutlined />} onClick={handlePrevCard} disabled={currentIndex === 0 && true} />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {cardData.slice(currentIndex, currentIndex + numberOfCardShow).map((card) => (
                            <Col span={spanCol} key={card.id}>
                                <Card
                                    className='card'
                                    hoverable
                                    cover={<img alt="example" src={BietThu} />}
                                >
                                    <div className='title-and-price'>
                                        <Meta title={card.title} description={card.description} />
                                        <span>500.000Đ</span>
                                    </div>
                                    <div className='seen-times'>
                                        <EyeOutlined />
                                        <span>100</span>
                                    </div>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Col>
                        <Button icon={<ArrowRightOutlined />} onClick={handleNextCard} disabled={currentIndex >= numberOfCardNext - 2 && true} />
                    </Col>
                </div>
            </div>


        </motion.div>
    )
}

export default Home