import React, { useState } from 'react'
import './style.profile.scss'
import { BiGridAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsShop } from 'react-icons/bs'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { RiMoneyDollarCircleLine, RiBillLine } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { AiOutlineKey, AiFillGift, AiOutlineGift, AiOutlineEdit, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineLock } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Button, Image, Form, Input, Radio, DatePicker } from 'antd'
import UserIcon from '../../images/user-image.png'
import BecomeSellerImage1 from '../../images/become-seller-image1.png'
import BecomeSellerImage2 from '../../images/become-seller-image2.png'
import TextArea from 'antd/lib/input/TextArea'
const Profile = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState<number>(1)
    const [form] = Form.useForm();
    const [formIndividuals] = Form.useForm();
    const [formCompany] = Form.useForm();


    const [valueRadio, setValueRadio] = useState<number>(1)
    const [page, setPage] = useState<number>(1)
    const onFinish = (values: any) => {
    };

    const handleChangeValueRadio = (e: any) => {
        console.log(e.target.value);
        setValueRadio(e.target.value)
    }

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

            {(active === 3 && page === 1) &&
                <div className='profile-content become-seller'>
                    <div className='profile-content-title'>Vui lòng lựa chọn ... của bạn!</div>
                    <div className='profile-content-option'>
                        <Radio.Group className='profile-content-option-group' name="radiogroup" defaultValue={1} onChange={handleChangeValueRadio}>
                            <div className='profile-content-option-item'>
                                <img src={BecomeSellerImage1} alt="" />
                                <Radio className='profile-content-option-item-radio' value={1} >Cá nhân (Kiến trúc sư)</Radio>
                            </div>
                            <div className='profile-content-option-item'>
                                <img src={BecomeSellerImage2} alt="" />
                                <Radio className='profile-content-option-item-radio' value={2}>Pháp nhân (Công ty kiến trúc, xây dựng)</Radio>
                            </div>
                        </Radio.Group>
                    </div>
                    <Button className='button-submit' type="primary" htmlType="submit" onClick={() => setPage(2)}>Tiếp tục</Button>
                </div>
            }
            {(active === 3 && page === 2 && valueRadio === 1) &&
                <div className='profile-content form-individuals'>
                    <div className='profile-content-title'>Điền thông tin của bạn vào ô dưới đây!</div>
                    <div className="profile-content-sub-title">Admin sẽ duyệt thông tin của bạn và phản hồi lại trong vòng 15p nếu thông tin của bạn hợp lệ.</div>
                    <Form
                        layout={'vertical'}
                        form={formIndividuals}
                        onFinish={onFinish}
                        className='form-individuals-content'
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="userName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                        >
                            <Input placeholder='Nhập họ và tên' />
                        </Form.Item>

                        <Form.Item
                            label="Số CCCD"
                            name="CCCD"
                            rules={[{ required: true, message: 'Vui lòng nhập số CCCD' }]}
                        >
                            <Input placeholder='Nhập số CCCD' />
                        </Form.Item>
                        <div className='flex-col' >
                            <Form.Item
                                label="Ngày cấp"
                                name="dateOfIssue"
                                rules={[{ required: true, message: 'Vui lòng nhập ngày cấp' }]}
                            >
                                <DatePicker placeholder='Nhập ngày cấp' />
                            </Form.Item>
                            <Form.Item
                                label="Nơi cấp"
                                name="placeOfIssue"
                                rules={[{ required: true, message: 'Vui lòng nhập nơi cấp' }]}
                            >
                                <Input placeholder='Nhập nơi cấp' />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Mã số thuế cá nhân"
                            name="taxCode"
                            rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
                        >
                            <Input placeholder='Nhập mã số thuế' />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        >
                            <Input placeholder='Nhập địa chỉ' />
                        </Form.Item>
                        <div className="flex-col">

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
                        </div>
                        <div className="flex-col">

                            <Form.Item
                                label="Số tài khoản"
                                name="accountNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
                            >
                                <Input placeholder='Nhập số tài khoản' />
                            </Form.Item>
                            <Form.Item
                                label="Tên tài khoản"
                                name="accountName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                            >
                                <Input placeholder='Nhập tên tài khoản' />
                            </Form.Item>
                        </div>
                        <div className="flex-col">

                            <Form.Item
                                label="Ngân hàng"
                                name="bank"
                                rules={[{ required: true, message: 'Vui lòng nhập ngân hàng' }]}
                            >
                                <Input placeholder='Nhập ngân hàng' />
                            </Form.Item>
                            <Form.Item
                                label="Chi nhánh"
                                name="branch"
                                rules={[{ required: true, message: 'Vui lòng nhập chi nhánh' }]}
                            >
                                <Input placeholder='Nhập chi nhánh' />
                            </Form.Item>
                        </div>

                        <Form.Item >
                            <div className='button-groud'>
                                <Button className='button-back' onClick={() => setPage(1)}>Quay lại</Button>
                                <Button className='button-submit' type="primary" htmlType="submit">Gửi thông tin</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            }
            {(active === 3 && page === 2 && valueRadio === 2) &&
                <div className='profile-content form-individuals'>
                    <div className='profile-content-title'>Điền thông tin của bạn vào ô dưới đây!</div>
                    <div className="profile-content-sub-title">Admin sẽ duyệt thông tin của bạn và phản hồi lại trong vòng 15p nếu thông tin của bạn hợp lệ.</div>
                    <Form
                        layout={'vertical'}
                        form={formCompany}
                        onFinish={onFinish}
                        className='form-individuals-content'
                    >
                        <Form.Item
                            label="Tên doanh nghiệp"
                            name="companyName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên doanh nghiệp' }]}
                        >
                            <Input placeholder='Nhập tên doanh nghiệp' />
                        </Form.Item>

                        <Form.Item
                            label="Đăng ký kinh doanh"
                            name="businessRegistration"
                            rules={[{ required: true, message: 'Vui lòng nhập đăng ký kinh doanh' }]}
                        >
                            <Input placeholder='Nhập đăng ký kinh doanh' />
                        </Form.Item>
                        <div className='flex-col' >
                            <Form.Item
                                label="Ngày cấp"
                                name="dateOfIssue"
                                rules={[{ required: true, message: 'Vui lòng nhập ngày cấp' }]}
                            >
                                <DatePicker placeholder='Nhập ngày cấp' />
                            </Form.Item>
                            <Form.Item
                                label="Nơi cấp"
                                name="placeOfIssue"
                                rules={[{ required: true, message: 'Vui lòng nhập nơi cấp' }]}
                            >
                                <Input placeholder='Nhập nơi cấp' />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Mã số thuế cá nhân"
                            name="taxCode"
                            rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
                        >
                            <Input placeholder='Nhập mã số thuế' />
                        </Form.Item>
                        <Form.Item
                            label="Người đại diện"
                            name="representative"
                            rules={[{ required: true, message: 'Vui lòng nhập người đại diện' }]}
                        >
                            <Input placeholder='Nhập người đại diện' />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        >
                            <Input placeholder='Nhập địa chỉ' />
                        </Form.Item>
                        <div className="flex-col">

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
                        </div>
                        <div className="flex-col">

                            <Form.Item
                                label="Số tài khoản"
                                name="accountNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
                            >
                                <Input placeholder='Nhập số tài khoản' />
                            </Form.Item>
                            <Form.Item
                                label="Tên tài khoản"
                                name="accountName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                            >
                                <Input placeholder='Nhập tên tài khoản' />
                            </Form.Item>
                        </div>
                        <div className="flex-col">

                            <Form.Item
                                label="Ngân hàng"
                                name="bank"
                                rules={[{ required: true, message: 'Vui lòng nhập ngân hàng' }]}
                            >
                                <Input placeholder='Nhập ngân hàng' />
                            </Form.Item>
                            <Form.Item
                                label="Chi nhánh"
                                name="branch"
                                rules={[{ required: true, message: 'Vui lòng nhập chi nhánh' }]}
                            >
                                <Input placeholder='Nhập chi nhánh' />
                            </Form.Item>
                        </div>

                        <Form.Item >
                            <div className='button-groud'>
                                <Button className='button-back' onClick={() => setPage(1)}>Quay lại</Button>
                                <Button className='button-submit' type="primary" htmlType="submit">Gửi thông tin</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            }
        </div>
    )
}

export default Profile