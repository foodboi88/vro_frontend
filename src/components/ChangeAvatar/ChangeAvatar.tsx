import React, { useState } from 'react';
import { Form, Upload, Button, Input, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { changeAvatarRequest, changePasswordRequest } from '../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import axios from 'axios';

interface ChangeAvatarProps {
    userId: string;
}

const ChangeAvatar = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatchRoot();
    const { accesstokenExpỉred, userName, userId } = useSelectorRoot((state) => state.login);
    const [imageUploadLst, setImageUploadLst] = useState<any>([]);
    const [checkLstImageUploadLst, setCheckLstImageUploadLst] = useState<any>([]);
    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChangeFileLst: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setCheckLstImageUploadLst(newFileList);
    };


    const onFinish = async (values: any) => {
        console.log('Success:', values);
        console.log("imageUploadLst", imageUploadLst[0]);
        // Lấy ra token từ local storage
        let tokenLogin: any = localStorage.getItem('token');
        tokenLogin = tokenLogin?.replace(/"/g, '');
        console.log("tokenLogin", tokenLogin);

        if (tokenLogin && imageUploadLst.length > 0) {
            dispatch(changeAvatarRequest({ avatar: imageUploadLst[0] }));
            // window.location.reload();
        }

    };

    return (
        <div className='change-pawword-main'>
            <h3 className='change-password-title'>Đổi ảnh đại diện</h3>
            <Form
                className='change-password-form'
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Ảnh đại diện cũ"
                    className='change-avatar-img-item'
                >
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}

                        src={`https://api.banvebank.com.vn/users/avatar/${userId}`} alt='avatar' className='change-avatar-img' />
                </Form.Item>

                <Form.Item
                    label="Ảnh đại diện mới"
                    name="avatar"
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}
                >
                    <Upload
                        multiple={false}
                        onRemove={(file) => {
                            let tmplst = imageUploadLst;
                            tmplst.filter((value: any, index: any, arr: any) => {
                                if (value.name === file.name) {
                                    // Removes the value from the original array
                                    arr.splice(index, 1);
                                    return true;
                                }
                                return false;
                            });

                            setImageUploadLst(tmplst);
                            return true;
                        }}
                        listType="picture-card"
                        showUploadList={{
                            showRemoveIcon: true,
                        }}
                        onChange={(file) => {
                            handleChangeFileLst(file);
                            console.log(imageUploadLst);
                        }}
                        accept=".png, .jpeg, .jpg"
                        beforeUpload={(file) => {
                            let tmplst = imageUploadLst;
                            tmplst.push(file);
                            setImageUploadLst(tmplst);
                            return false;
                        }}
                    >
                        {imageUploadLst.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>

                <motion.div className='change-passowrd-btn-item'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                >
                    <Button className='change-password-btn' type="primary" htmlType="submit">Đổi ảnh đại diện</Button>
                </motion.div>
            </Form>
        </div >
    )
};

export default ChangeAvatar;