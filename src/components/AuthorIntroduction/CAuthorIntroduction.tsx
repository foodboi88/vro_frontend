import { Button, Col, Row } from 'antd'
import React from 'react'
import Avatar from '../../images/advance-searching/avatar1.png'
import './styles.authorintro.scss'

const CAuthorIntroduction = () => {
  return (
    <div className='main-intro'>
        <div className='container'>
            <div className='left-side'>
                <div className='avatar'>
                    <img src={Avatar}/>
                </div>
                <div className='name-status-contact'>
                    <div className='name'>Thiết kế GENZ</div>
                    <div className='status'>Đang trực tuyến</div>
                    <div className='contact'>
                        <Button className='button1'>Liên hệ</Button>
                        <Button>Xem trang</Button>
                    </div>
                </div>
            </div>
            <div className='right-side'>
                <Row className='container' gutter={[16, 16]}>
                    <Col span={8}>
                        Đánh giá: 
                    </Col>
                    <Col span={8}>
                        Tỷ lệ phản hồi: 
                    </Col>
                    <Col span={8}>
                        Tham gia: 
                    </Col>
                    <Col span={8}>
                        Sản phẩm: 
                    </Col>
                    <Col span={8}>
                        Thời gian phản hồi: 
                    </Col>
                    <Col span={8}>
                        Theo dõi: 
                    </Col>
                </Row>
            </div>
        </div>
    </div>
  )
}

export default CAuthorIntroduction