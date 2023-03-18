import { Button, Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import {
    UserOutlined,
    SearchOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import CArrangeBar from '../../components/ArrangeBar/CArrangeBar';
import CAuthorIntroduction from '../../components/AuthorIntroduction/CAuthorIntroduction';
import CFilter from '../../components/Filter/CFilter';
import CProductCard from '../../components/ProductCard/CProductCard';
import "./styles.advancedsearching.scss";
import { motion } from 'framer-motion';
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
import Meta from 'antd/lib/card/Meta';
import { useNavigate } from 'react-router-dom';

interface CardData {
    id: number;
    title: string;
    type: string;
    price: string;
    view: number;
    imageUrl: string;
}
const data: CardData[] = [
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
    {
        id: 5,
        title: 'Dựng ngoại cảnh căn biệt thự',
        type: 'File Auto cad',
        price: '865.000VNĐ',
        view: 245,
        imageUrl: DrawHomeImage5,
    },
    {
        id: 6,
        title: 'Thiết kế biệt thự 2 tầng',
        type: 'File Sketchup',
        price: 'Free',
        view: 32,
        imageUrl: DrawHomeImage6,
    },
    {
        id: 7,
        title: 'Bản vẽ biệt thự 2 tầng',
        type: 'File Sketchup',
        price: '300.000VNĐ',
        view: 26,
        imageUrl: DrawHomeImage7,
    },
    {
        id: 8,
        title: 'Bản vẽ biệt thự 2 tầng',
        type: 'File Sketchup',
        price: 'Free',
        view: 85,
        imageUrl: DrawHomeImage8,
    },
    {
        id: 9,
        title: 'Bản vẽ biệt thự 3 tầng cổ điển',
        type: 'File 3D Max',
        price: 'Free',
        view: 265,
        imageUrl: DrawHomeImage9,
    },
    {
        id: 10,
        title: 'Bản vẽ nhà xưởng',
        type: 'File Revit',
        price: 'Free',
        view: 500,
        imageUrl: DrawHomeImage10,
    },
    {
        id: 11,
        title: 'Bản vẽ biệt thự phong cách Nhật',
        type: 'File Revit',
        price: '3.500.000VNĐ',
        view: 65,
        imageUrl: DrawHomeImage11,
    },
    {
        id: 12,
        title: 'Biệt thự phong cách Roman',
        type: 'File 3D Max',
        price: '10.000.000VNĐ',
        view: 152,
        imageUrl: DrawHomeImage12,
    },
    {
        id: 13,
        title: 'Biệt thự mái thái',
        type: 'File Revit',
        price: '700.000VNĐ',
        view: 65,
        imageUrl: DrawHomeImage13,
    },
    {
        id: 14,
        title: 'Biệt thự Tân cổ điển',
        type: 'File Auto cad',
        price: '670.000VNĐ',
        view: 98,
        imageUrl: DrawHomeImage14,
    },
    {
        id: 15,
        title: 'Bản vẽ biệt thự mái thái',
        type: 'File Sketchup',
        price: 'Free',
        view: 32,
        imageUrl: DrawHomeImage15,
    },
    {
        id: 16,
        title: 'Bản vẽ quán ăn',
        type: 'File Auto cad',
        price: 'Free',
        view: 75,
        imageUrl: DrawHomeImage16,
    },
];

const AdvancedSeaching = () => {
    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
    const [isShowButtonFilter, setIsShowButtonFilter] = useState<boolean>(false);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);
        if (window.innerWidth > 900) {
            setSpanCol(6);
            setIsShowButtonFilter(false)
        }
        if (window.innerWidth <= 900) {
            setSpanCol(8);
            setIsShowButtonFilter(true)
        }
        if (window.innerWidth <= 600) {
            setSpanCol(12);
        }
        if (window.innerWidth <= 400) {
            setSpanCol(24);
        }
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [window.innerWidth]);
    return (
        <div className='main'>
            <CFilter />
            <div className='filtered-items'>
                <div className='author-introduction'>
                    <div className='searched-author-title'>
                        <div className='text-title'><UserOutlined /> Tác giả liên quan đến <strong>{'"Bản vẽ biệt thự 2 tầng"'}</strong> </div>

                        <motion.div
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.95 }}>
                            <div className='text-title results'>Thêm kết quả</div>
                        </motion.div>
                    </div>
                    <CAuthorIntroduction />
                </div>
                <div className='sketch-list'>
                    <div className='searched-sketch-title'>
                        <SearchOutlined /> Bản vẽ liên quan tới <strong>{'"Bản vẽ biệt thự 2 tầng"'}</strong>
                    </div>
                    <CArrangeBar
                    />
                    <Row className='detail-list' gutter={[16, 24]}>
                        {data.map((card) => (
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
                </div>
            </div>
        </div>
    )
}

export default AdvancedSeaching