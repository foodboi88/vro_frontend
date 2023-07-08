import React, { useState } from 'react'
import './style.profile.scss'
import { BiGridAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsShop } from 'react-icons/bs'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { RiMoneyDollarCircleLine, RiBillLine } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { AiOutlineKey, AiFillGift, AiOutlineGift, AiOutlineEdit, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineLock } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Button, Image, Form, Input } from 'antd'
import UserIcon from '../../images/user-image.png'
import TextArea from 'antd/lib/input/TextArea'
const Profile = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState<number>(1)
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
    };
    return (
        <div className="main-profile">
            <div className='profile-navbar'>
                <div className={'profile-navbar-item' + (active === 1 ? ' active' : '')} onClick={() => setActive(1)}>
                    <BiGridAlt className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Hồ sơ cá nhân</span>
                </div>
                <div className={'profile-navbar-item' + (active === 2 ? ' active' : '')} onClick={() => setActive(2)}>
                    <AiOutlineSetting className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Cài đặt chung</span>
                </div>
                <div className={'profile-navbar-item' + (active === 3 ? ' active' : '')} onClick={() => setActive(3)}>
                    <BsShop className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Trở thành người bán</span>
                </div>
                <div className={'profile-navbar-item' + (active === 4 ? ' active' : '')} onClick={() => setActive(4)}>
                    <AiOutlineLock className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Thay đổi mật khẩu</span>
                </div>
                <div className={'profile-navbar-item' + (active === 5 ? ' active' : '')} onClick={() => setActive(5)}>
                    <RiBillLine className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Đơn mua</span>
                </div>
                <div className={'profile-navbar-item' + (active === 6 ? ' active' : '')} onClick={() => setActive(6)}>
                    <AiOutlineGift className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Kho Voucher</span>
                </div>
                <div className={'profile-navbar-item' + (active === 7 ? ' active' : '')} onClick={() => setActive(7)}>
                    <AiOutlineQuestionCircle className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Hỗ trợ</span>
                </div>
            </div>
            {active === 1 &&
                <div className='profile-content'>
                    <div className='profile-content-left'>
                        <img className='profile-content-avatar' src={UserIcon} alt='' />
                        <Button className='profile-content-button'>
                            <AiOutlineEdit />
                            Đổi ảnh đại điện
                        </Button>
                    </div>
                    <div className='profile-content-right'>
                        <Form
                            layout={'vertical'}
                            form={form}
                            onFinish={onFinish}

                        >
                            <Form.Item
                                label="Tên shop"
                                name="shopName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên shop' }]}
                            >
                                <Input placeholder='Nhập tên shop' />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="Email"
                                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            >
                                <Input placeholder='Nhập email' />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <Input placeholder='Nhập số điện thoại' />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            >
                                <Input placeholder='Nhập địa chỉ' />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            >
                                <TextArea placeholder='Nhập mô tả' />
                            </Form.Item>
                            <Form.Item>
                                <Button className='button-submit' type="primary" htmlType="submit">Lưu thông tin</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile