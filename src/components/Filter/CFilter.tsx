import { Checkbox, Col, Form, Row, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import "./styles.filter.scss"
import React from 'react'
import { FormatPainterOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons'

const CFilter = () => {
  return (
    <div className='main-filter'>
        <Form>
            <Form.Item className='form-item' name="checkbox-group">
                <div className='title'>
                    <div className='icon'>
                        <ToolOutlined />
                    </div>
                    <div className='text'>Công cụ</div>
                </div>
                <Checkbox.Group>
                    {/* <Row>
                        <Col span={30}> */}
                            <Checkbox value="A" style={{ lineHeight: '32px',     marginLeft: '8px'
 }}>
                            Autocad
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            3D Max
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Revit
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Sketch up
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Khác
                            </Checkbox>
                        {/* </Col>
                    
                    </Row> */}
                </Checkbox.Group>
            </Form.Item>
            <Form.Item className='form-item' name="checkbox-group">
                <div className='title'>
                    <div className='icon'>
                        <HomeOutlined />
                    </div>
                    <div className='text'>Kiến trúc</div>
                </div>
                <Checkbox.Group>
                    {/* <Row>
                        <Col span={30}> */}
                            <Checkbox value="A" style={{ lineHeight: '32px',     marginLeft: '8px' }}>
                            Biệt thự
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Nhà phố
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Nhà xưởng
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Nội thất
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Ngoại thất
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Bản vẽ khác
                            </Checkbox>
                        {/* </Col>
                    
                    </Row> */}
                </Checkbox.Group>
            </Form.Item>
            <Form.Item className='form-item' name="checkbox-group">
                <div className='title'>
                    <div className='icon'>
                        <FormatPainterOutlined />
                    </div>
                    <div className='text'>Công cụ</div>
                </div>
                <Checkbox.Group>
                    {/* <Row>
                        <Col span={30}> */}
                            <Checkbox value="A" style={{ lineHeight: '32px',     marginLeft: '8px' }}>
                            Cổ điển
                            </Checkbox>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                            Hiện đại
                            </Checkbox>
                            
                        {/* </Col>
                    
                    </Row> */}
                </Checkbox.Group>
            </Form.Item>
        </Form>
    </div>
  )
}

export default CFilter