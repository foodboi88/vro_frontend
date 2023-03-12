import { DownOutlined } from '@ant-design/icons'
import { Button, Rate } from 'antd'
import React from 'react'
import Avatar from '../../images/detail/avatar.png'
import './styles.comment.scss'

const commentList = [
    {
        user: {
            name: "Bui Thi Huong",
            avatar: Avatar,
        },
        comment: {
            content: "Ban ve rat phu hop voi nhu cau cua toi nhe",
            time: "3 phút trước",
            rate: 3
        }
    },
    {
        user: {
            name: "Bui Thi Huong",
            avatar: Avatar,
        },
        comment: {
            content: "Ban ve rat phu hop voi nhu cau cua toi nhe",
            time: "3 phút trước",
            rate: 3
        }
    },
    {
        user: {
            name: "Bui Thi Huong",
            avatar: Avatar,
        },
        comment: {
            content: "Ban ve rat phu hop voi nhu cau cua toi nhe",
            time: "3 phút trước",
            rate: 3
        }
    },
]

const CComment = () => {
  return (
    <div className='main-comment'>
        <div className='title'>Bình luận (3)</div>
        <div className='btn-group-and-total-rate'>

            <div className='button-group'>
                <Button>Tất cả</Button>
                <Button>3 sao</Button>
                <Button>2 sao</Button>
                <Button>1 sao</Button>

            </div>
            <div
                className='total-rate'
            >
                <div className='number'>3</div>
                <Rate 
                    allowHalf 
                    defaultValue={3} 
                />
            </div>
        </div>
        <div className='comment-list'>
            {
                commentList.map((item)=> (
                    <div className='comment'>
                        <div className='avatar'>
                            <img src={item.user.avatar}/>
                        </div>
                        <div className='content'>
                            <div className='name'>{item.user.name}</div>
                            <div>
                                <Rate 
                                    allowHalf 
                                    defaultValue={item.comment.rate} 
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
            <div className='text'>Xem thêm bình luận</div>
            <div style={{marginTop: "-5px",marginLeft: "7px"}}>

                <DownOutlined />
            </div>
        </div>
    </div>
  )
}

export default CComment