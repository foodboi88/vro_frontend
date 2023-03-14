import { Breadcrumb, Button, Col, Rate, Row } from 'antd'
import { Carousel } from 'react-responsive-carousel';
import React from 'react'
import CAuthorIntroduction from '../../components/AuthorIntroduction/CAuthorIntroduction'
import CComment from '../../components/Comment/CComment'
import CProductCard from '../../components/ProductCard/CProductCard'
import Image1 from '../../images/homepage/bietthu1.png'
import "./styles.detailsketch.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader




const DetailSketch = () => {
  return (
    <div className='main-detail'>
        <div className='breadcrumb'>
            <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                
                <Breadcrumb.Item>Danh sách bản vẽ nổi bật</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <div className='detail-sketch'>
            <div className='image-carousel'>
                <Carousel >
                    <div>
                        <img src={Image1}/>
                    </div>
                    <div>
                        <img src={Image1}/>
                    </div>
                    <div>
                        <img src={Image1}/>
                    </div>
                    <div>
                        <img src={Image1}/>

                    </div>
                </Carousel>
            </div>
            <div className='content'>
                <div className='title'>Biệt thự 2 tầng</div>
                <div className='price'>500.000Đ</div>
                <div className='rate'>
                    <Rate allowHalf defaultValue={2.5} />
                </div>
                <div className='property'>
                    <div>
                        <div>Ngày đăng:</div>
                        <div>Phong cách:</div>
                        <div>Công cụ:</div>
                    </div>
                    <div>
                        <div>Dung lượng file:</div>
                        <div>Kích thước:</div>
                        <div>Hạng mục:</div>
                    </div>
                </div>
                <div className='description'>
                    <div className='des-title'>Mô tả</div>
                    <div>Lorem ipsum dolor sit amet consectetur. Vitae in integer euismod sit vehicula hac sit eget sed. Sociis commodo sit a feugiat molestie blandit. Sed massa eu facilisi proin at morbi hac. Et varius vitae eleifend in velit id scelerisque. Viverra elementum mi eleifend bibendum. Odio erat cursus ac mus ornare rhoncus auctor. Amet pharetra ac sed ornare arcu facilisi. Dictumst tellus id dictum id libero pharetra. Mi enim massa diam laoreet neque ut. Placerat nulla enim sit quis ullamcorper quam nullam et auctor. Nec urna magna rhoncus leo facilisi libero. Justo tellus nunc ac vitae arcu in. Elementum enim sit at et cursus felis sodales.
Vel non pharetra eget nullam massa sapien nibh fermentum. Ut arcu eu nunc faucibus libero. Dictumst tincidunt eros imperdiet massa nam at ut diam. Ipsum facilisis placerat bibendum nulla velit potenti est purus tristique. Senectus in molestie vel sollicitudin gravida. Ornare at et amet et </div>

                </div>
                <div className='action'>
                    <Button style={{marginRight: '15px'}}>Thêm vào giỏ</Button>
                    <Button>Tải xuống ngay</Button>
                </div>
            </div>
        </div>
        <CAuthorIntroduction/>
        <div className='comment'>
            <CComment/>
        </div>
        <div className='similar-sketch'>
            <div className='title'>
                <div style={{fontSize: '20px', fontWeight: '550'}}>
                    Bản vẽ tương tự
                </div>
                <div>
                    Xem thêm
                </div>
            </div>
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
            </Row>
        </div>
    </div>
  )
}

export default DetailSketch