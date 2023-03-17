import { Badge, Button, Col, Row } from 'antd'
import React from 'react'
import Avatar from '../../images/advance-searching/avatar1.png'
import './styles.authorintro.scss'
import { motion } from 'framer-motion'

const CAuthorIntroduction = () => {
    return (
        <div className='main-intro'>
            <div className='container'>
                <div className='left-side'>
                    <div className='avatar'>
                        <img src={Avatar} />
                    </div>
                    <div className='name-status-contact'>
                        <div className='name'>Thiết kế GENZ</div>
                        <div className='status'>
                            <Badge status="success" text="Online" />
                        </div>
                        <div className='contact-and-view'>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button className='contact' >Liên hệ</Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button className='view'>Xem trang</Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className='right-side'>
                    <div className='grid-lst'>
                        <div className='grid-item' >
                            Đánh giá: <strong>5,8k</strong>
                        </div>
                        <div className='grid-item'>
                            Tỉ lệ phản hồi: <strong>100%</strong>
                        </div>
                        <div className='grid-item'>
                            Tham gia: <strong>10 năm trước</strong>
                        </div>
                        <div className='grid-item'>
                            Sản phẩm: <strong>856k</strong>
                        </div>
                        <div className='grid-item'>
                            Thời gian phản hồi: <strong>trong vài giờ</strong>
                        </div>
                        <div className='grid-item'>
                            Theo dõi: <strong>1M</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CAuthorIntroduction