import { DownOutlined } from '@ant-design/icons'
import { Button, Rate } from 'antd'
import React, { useState } from 'react'
import Avatar from '../../images/detail/avatar.png'
import Avatar2 from '../../images/detail/avata-comment-2.png'
import Avatar3 from '../../images/detail/avata-comment-3.png'

import './styles.comment.scss'
import { motion } from 'framer-motion'

const commentList = [
    {
        user: {
            name: "Bùi Thị Hương",
            avatar: Avatar,
        },
        comment: {
            content: "Lorem ipsum dolor sit amet consectetur. Ut scelerisque imperdiet fermentum amet nisl turpis ultricies lectus gravida. Id quam in egestas at eu et convallis. Dui velit pretium feugiat vel in tellus tempus platea. Vel turpis sapien pulvinar orci. Venenatis faucibus non aenean tellus amet tellus leo.",
            time: "3 phút trước",
            rate: 3
        }
    },
    {
        user: {
            name: "Nguyễn Hồ Tân",
            avatar: Avatar2,
        },
        comment: {
            content: "Lorem ipsum dolor sit amet consectetur. Ut scelerisque imperdiet fermentum amet nisl turpis ultricies lectus gravida. Id quam in egestas at eu et convallis. Dui velit pretium feugiat vel in tellus tempus platea. Vel turpis sapien pulvinar orci. Venenatis faucibus non aenean tellus amet tellus leo. Maecenas volutpat nisl pellentesque dis ultrices aliquet neque.",
            time: "1 ngày trước",
            rate: 2
        }
    },
    {
        user: {
            name: "Đỗ Đình Nam",
            avatar: Avatar3,
        },
        comment: {
            content: "Lorem ipsum dolor sit amet consectetur. Ut scelerisque imperdiet fermentum amet nisl turpis ultricies lectus gravida. Id quam in egestas at eu et convallis. Dui velit pretium feugiat vel in tellus tempus platea. Vel turpis sapien pulvinar orci. Venenatis faucibus non aenean tellus amet tellus leo. ",
            time: "02/12/2022",
            rate: 1
        }
    },
]

const CComment = () => {
    const [activeButton, setActiveButton] = useState<number>(1);

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber);
    };
    return (
        <div className='main-comment'>
            <div className='title'>Bình luận (3)</div>
            <div className='btn-group-and-total-rate'>
                <Button.Group>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 1 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(1)}
                        >
                            Tất cả
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 2 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(2)}
                        >
                            3 sao (0)
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 3 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(3)}
                        >
                            2 sao (56)
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 4 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(4)}
                        >
                            1 sao (32)
                        </Button>
                    </motion.div>
                </Button.Group>
                <div
                    className='total-rate'
                >
                    <div className='number'>2,9</div>
                    <Rate
                        allowHalf
                        defaultValue={2}
                        count={3}
                        disabled
                    />
                </div>
            </div>
            <div className='comment-list'>
                {
                    commentList.map((item) => (
                        <div className='comment'>
                            <div className='avatar'>
                                <img src={item.user.avatar} />
                            </div>
                            <div className='content'>
                                <div className='name'>{item.user.name}</div>
                                <div>
                                    <Rate
                                        allowHalf
                                        defaultValue={item.comment.rate}
                                        count={3}
                                        disabled
                                    />
                                </div>
                                <div className='comment-content'>{item.comment.content}</div>
                                <div className='time'>{item.comment.time}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='more-comment'>
                <div className='text'>Xem thêm</div>
                <div className='icon'>
                    <DownOutlined />
                </div>
            </div>
        </div>
    )
}

export default CComment