import { Button, Modal } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './ActiveAccount.scss';
interface MyProps {
    email: string;
}

const ActiveAccountModel = (props: MyProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal
                className='ActiveAccountModel'
                title="Đã gửi email xác nhận"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className='title'>Đã gửi email xác nhận</div>
                <div className='content'>Để đăng nhập cần phải xác nhận email. Vui lòng kiểm tra tài khoản email của bạn và xác nhận email!</div>
                <div className='email-account'>Đã gửi tới email: <strong> kienn11000@gmail.com</strong></div>
                <motion.div className='button-confirm' whileHover={{ scale: 1.1 }}>
                    <Button onClick={handleCancel}>Xác nhận</Button>
                </motion.div>

            </Modal>
        </>
    );
};

export default ActiveAccountModel;
