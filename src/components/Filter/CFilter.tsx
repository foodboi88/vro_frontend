import { Checkbox, Col, Form, Row, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import "./styles.filter.scss"
import React from 'react'
import { FormatPainterOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

interface props {
}

const optionsTools = [
    { label: 'Autocad', value: 'Autocad' },
    { label: '3D max', value: '3D max' },
    { label: 'Revit', value: 'Revit' },
    { label: 'Sketchup', value: 'Sketchup' },
    { label: 'Khác', value: 'Khác' },
];
const architectureTools = [
    { label: 'Biệt thự', value: 'Biệt thự' },
    { label: 'Nhà phố', value: 'Nhà phố' },
    { label: 'Nhà xưởng', value: 'Nhà xưởng' },
    { label: 'Nội thất', value: 'Nội thất' },
    { label: 'Ngoại thất', value: 'Ngoại thất' },
    { label: 'Bản vẽ khác', value: 'Bản vẽ khác' },
];
const stylesTools = [
    { label: 'Cổ điển', value: 'Cổ điển' },
    { label: 'Hiện đại', value: 'Hiển đại' },
];
const CFilter = (props: props) => {
    return (
        <motion.div className='main-filter'
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}>
            <Form>
                <Form.Item className='form-item' name="checkbox-group">
                    <div className='title'>
                        <div className='icon'>
                            <ToolOutlined />
                        </div>
                        <div className='text'>Công cụ</div>
                    </div>
                    <Checkbox.Group options={optionsTools} />
                </Form.Item>
                <Form.Item className='form-item' name="checkbox-group">
                    <div className='title'>
                        <div className='icon'>
                            <HomeOutlined />
                        </div>
                        <div className='text'>Kiến trúc</div>
                    </div>
                    <Checkbox.Group options={architectureTools} />

                </Form.Item>
                <Form.Item className='form-item' name="checkbox-group">
                    <div className='title'>
                        <div className='icon'>
                            <FormatPainterOutlined />
                        </div>
                        <div className='text'>Phong cách</div>
                    </div>
                    <Checkbox.Group options={stylesTools} />

                </Form.Item>
            </Form>
        </motion.div>
    )
}

export default CFilter