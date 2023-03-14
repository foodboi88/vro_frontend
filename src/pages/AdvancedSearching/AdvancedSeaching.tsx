import { Col, Row } from 'antd';
import React from 'react'
import CArrangeBar from '../../components/ArrangeBar/CArrangeBar';
import CAuthorIntroduction from '../../components/AuthorIntroduction/CAuthorIntroduction';
import CFilter from '../../components/Filter/CFilter';
import CProductCard from '../../components/ProductCard/CProductCard';
import "./styles.advancedsearching.scss";

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };


const AdvancedSeaching = () => {
  return (
    <div className='main'>
        <div className='sidebar'>
            <CFilter/>
        </div>
        <div className='filtered-items'>
            <div className='author-introduction'>
                <div className='searched-author-title'>
                    <div>Tác giả liên quan đến {'Bản vẽ biệt thự 2 tầng'}</div>
                    <div>Thêm kết quả</div>
                </div>
                <CAuthorIntroduction/>
            </div>
            <div className='sketch-list'>
                <div className='searched-sketch-title'>
                    Bản vẽ liên quan tới {'Bản vẽ biệt thự 2 tầng'}
                </div>
                <CArrangeBar
                
                />
                <Row className='detail-list' gutter={[16, 24]}>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>                    
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>                    
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>                    
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <CProductCard/>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
  )
}

export default AdvancedSeaching