import React from 'react'
import './style.mission.scss'
import Mission1 from '../../images/mission/mission1.png'
import Mission2 from '../../images/mission/mission2.png'
import Mission3 from '../../images/mission/mission3.png'
import Mission4 from '../../images/mission/mission4.png'
import Banner1 from '../../images/mission/banner1.png'
import Banner2 from '../../images/mission/banner2.png'
import { Button, Form, Input } from 'antd'
const Mission = () => {

    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };


    return (
        <div className='main-mission'>
            <div className="mission-item item-1">
                <div className="mission-item-left">
                    <div className="title">
                        Tạo nên kết nối,
                        <br />
                        Xây dựng tương lai
                        <strong>
                            .
                        </strong>
                    </div>
                    <div className="sub-title">
                        Chào mừng đến với chúng tôi, nơi những ý tưởng và tinh thần kiến trúc được biến thành hiện thực. Chúng tôi là những người xây dựng không gian, kết nối những khát vọng với sức sáng tạo, tạo nên những nền tảng để tương tác và lan tỏa ý tưởng.
                    </div>
                </div>
                <div className="mission-item-right">
                    <img src={Mission1} alt="" />
                </div>
            </div>

            <div className="mission-banner"
                style={{
                    backgroundImage: `url(${Banner1})`
                }}
            >
                <div className="title">
                    Sứ mệnh của chúng tôi
                </div>
                <div className="sub-title">
                    Chúng tôi tin rằng mỗi dự án kiến trúc không chỉ là việc xây dựng cấu trúc vật liệu mà còn là việc khơi nguồn cảm hứng và thể hiện tinh thần động lực. Sứ mẹnh của chúng tôi không chỉ đơn thuần là tạo ra một trang web kế nối, mà là một cơ hội cho sự gặp gỡ, giao lưu và sáng tạo
                </div>
            </div>

            <div className="mission-item item-2">
                <div className="mission-item-left">
                    <img src={Mission2} alt="" />
                </div>
                <div className="mission-item-right">
                    <div className="title">
                        Dẫn dắt sự kết nối
                        <strong>
                            .
                        </strong>
                    </div>
                    <div className="sub-title">
                        Chúng tôi là những người góp phần tạo ra những môi trường kỳ diệu. Đối với kiến trúc sư, chúng tôi mở ra cánh cửa cho bạn, để bạn có thể truyền tải tinh thần và cái nhìn của minh thông qua từng nét vẽ, từng công trình, từng ý tưởng. Bạn không chỉ là người thiết kế, bạn là nhà kiến tạo không gia và truyền cảm hứng.                    </div>
                </div>
            </div>

            <div className="mission-item item-3">
                <div className="title">
                    Đôi bên kết nối <strong>.</strong>
                </div>
                <div className='content'>
                    <div className='text'
                        style={{
                            backgroundImage: `url(${Mission3})`
                        }}
                    >
                        Khách hàng là những người tìm kiếm nơi có thể biến những ước mơ thành hiện thực. Chúng tôi không chỉ cung cấp dịch vụ, chúng tôi xây dựng cầu nối giữa bạn và các tài năng sáng tạo. Chúng tôi chào đón mọi ý tưởng, mọi yêu cầu để kích thích sáng tạo và tạo nên không gian đáng sống
                    </div>
                    <img src={Mission4} alt="" />
                </div>
            </div>

            <div className="mission-banner banner-2"
                style={{
                    backgroundImage: `url(${Banner2})`
                }}
            >
                <div className="title">
                    Vươn ra tương lai
                </div>
                <div className="sub-title">
                    Sứ mệnh của chúng tôi không chỉ dừng lại ở hiện tại. Chúng tôi muốn xây dựng một cộng đồng, một không gian mà mỗi ý tưởng đều được tôn trọng và thăng hoa. Chúng tôi không ngừng cải tiến, để dẫn dắt sự phát triển và tương lai của ngành kiến trúc.                </div>
            </div>

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

export default Mission
