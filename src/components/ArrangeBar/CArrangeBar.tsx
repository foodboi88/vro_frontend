import { Button, Select } from 'antd';
import React from 'react';
import './styles.arrangebar.scss';

const CArrangeBar = () => {
    return (
        <div className='main-arrange'>
            <div className='container'>
                <div className='title'>Sắp xếp theo</div>
                <div className='button1'>
                    <Button>Mới nhất</Button>
                </div>
                <div className='button2'>
                    <Button>Thuê nhiều nhất</Button>
                </div>
                <div className='select-box'>
                    <Select
                        defaultValue="1"
                        style={{ width: 200 }}
                        onChange={() => {

                        }}
                        options={[
                            { value: '1', label: 'Từ cao đến thấp' },
                            { value: '2', label: 'Từ thấp đến cao' }
                        ]}
                    >

                    </Select>
                </div>
            </div>
        </div>
    )
}

export default CArrangeBar