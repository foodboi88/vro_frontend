import { Input, List } from 'antd'
import React, { useState } from 'react'
import VirtualList from 'rc-virtual-list';

import Step1 from '../../images/upload-sketch/Step1.png'
import Step2 from '../../images/upload-sketch/Step2.png'
import Step3 from '../../images/upload-sketch/Step3.png'

import './styles.uploadsketch.scss'
import { MinusOutlined } from '@ant-design/icons';

const TypeList = [
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
    ,
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    }
]

const UploadSketch = () => {
    const [step,setStep] = useState<string>('type');

    const onScroll = () => {

    }

    const selectStepHandle = (value: string) => {
        setStep(value)
    }

    return (
        <div className='main-upload'>
            
            <div className='upload-area'>
                <div className='upload-step'>
                    <div className='step1' onClick={()=>selectStepHandle('type')}>
                        <img src={Step1}/>
                        <div className='text'>Danh mục bản vẽ</div>
                    </div>
                    <MinusOutlined className='connector-icon' />
                    <div className='step2' onClick={()=>selectStepHandle('description')}>
                        <img src={Step2}/>
                        <div className='text'>Mô tả bản vẽ</div>
                    </div>
                    <MinusOutlined />
                    <div className='step3' onClick={()=>selectStepHandle('information')}>
                        <img src={Step3}/>
                        <div className='text'>Thông tin bản vẽ</div>
                    </div>
                </div>
                <div className='sketch-content-area'>
                    {
                        step === 'type' && 
                        <div className='type-of-sketch'>
                            <div className='title'>Danh mục bản vẽ</div>
                            <div className='description'>Vui lòng nhập các thông tin chung</div>
                            <Input>
                            </Input>
                            <List>
                                <VirtualList
                                    data={TypeList}
                                    itemHeight={47}
                                    itemKey="id"
                                    height={400}
                                    onScroll={onScroll}
                                >
                                    {(item: any) => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        />
                                        <div>Content</div>
                                    </List.Item>
                                    )}
                                </VirtualList>
                            </List>
                        </div>
                    }
                    {
                        step === 'description' &&
                        <div className='description-of-sketch'>

                        </div>
                    }
                    {
                        step === 'information' &&
                        <div className='information-of-sketch'>

                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default UploadSketch