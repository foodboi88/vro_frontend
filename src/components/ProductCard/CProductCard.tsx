import React from 'react'
import { Variants, motion, useTransform, useViewportScroll } from 'framer-motion';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { EyeOutlined } from '@ant-design/icons';
import BietThu from '../../images/homepage/bietthu1.png';



const CProductCard = () => {
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
  return (
    <motion.div
        className="tool"
        whileHover="hover"
        whileTap="tap"
        variants={hoverVariants}
    >
        <Card
            className='card'
            hoverable
            cover={<img alt="example" src={BietThu} />}
        >
            <div className='title-and-price'>
                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                <span>500.000Đ</span>
            </div>
            <div className='seen-times'>
                <EyeOutlined />
                <span>100</span>
            </div>

        </Card>
    </motion.div>
  )
}

export default CProductCard