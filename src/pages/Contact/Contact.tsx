import { Form, Input, Button } from 'antd'
import form from 'antd/lib/form'
import React from 'react'
import './style.contact.scss'
const Contact = () => {

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    }


    return (
        <div className='main-contact'>
            <div className="mission-item item-4"
                style={{
                    alignItems: 'center'
                }}
            >
                <div className="mission-item-left"
                    style={{
                        maxWidth: '600px',

                    }}
                >
                    <div className="title">
                        Hãy kết nối với chúng tôi
                        <strong>
                            .
                        </strong>
                    </div>
                    <div className="sub-title">
                        Nếu bạn là một kiến trúc sư có đam mê, một khách hàng tìm kiếm sự đổi mới hoặc chỉ đơn giản muốn quan không gian sáng tạo của chúng tôi, hãy kết nối với chúng tôi ngay hôm nay. Chúng tôi rất sẵn lòng chào đón bạn để xây dựng những điều tuyệt vời cùng nhau
                        <br />
                        <br />
                        Hãy cùng nhau tạo nên sự khác biệt, tạo nên tương lai!</div>
                </div>
                <div className="mission-item-right">
                    <div className='form-contailer'>
                        <Form
                            form={form}
                            name="user_form"
                            onFinish={onFinish}
                            className='form-mission'
                            layout='vertical'
                        // change form layout

                        >
                            <Form.Item
                                name="username"
                                label={<span>Người liên hệ <strong>*</strong></span>}
                                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                            >
                                <Input placeholder="Nhập họ tên" />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label={<span>Số điện thoại <strong>*</strong></span>}
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label={<span>Email người liên hệ<strong>*</strong></span>}
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ!'
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập email" />
                            </Form.Item>

                            <Form.Item
                                name="content"
                                label={<span>Nội dung <strong>*</strong></span>}
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                            >
                                <Input.TextArea
                                    placeholder="Nhập nội dung"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Gửi thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
