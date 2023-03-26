import {
    Form,
    Input,
    List,
    Select,
    SelectProps,
    Upload,
    message,
    Row,
    Col,
    notification,
    Button,
    Radio,
    Checkbox,
} from "antd";
import React, { useState } from "react";
import VirtualList from "rc-virtual-list";
import type { UploadProps } from "antd";

import Step1 from "../../images/upload-sketch/Step1.png";
import Step2 from "../../images/upload-sketch/Step2.png";
import Step3 from "../../images/upload-sketch/Step3.png";

import "./styles.uploadsketch.scss";
import { InboxOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { RcFile } from "antd/lib/upload";
import FormItem from "antd/es/form/FormItem";

const { Dragger } = Upload;
const { Search } = Input;

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

const TypeList = [
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
];

const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

const toolOptions = ["Autocad", "Revit", "Sketchup", "3D MAX", "Khác"];

const categoryOptions = ["Apple", "Pear", "Orange"];

const styleList = ["Hiện đại", "Tân cổ điển", "Khác"];

const ruleList = [
    "Mọi thông tin của thành viên đăng tải trên diễn đàn VRO Group phải chính xác",
    "Mọi file đăng bán phải đảm bảo mở được, mô tả đầy đủ thông tin và đúng như hình ảnh đính kèm",
    "Nội dung file nén đã được kiếm tra, đảm bảo không chứa tệp tin không khả dụng, độc hại, virus hoặc bất cứ liên kết khác",
    "Phải đảm bảo file download có chứa đầy đủ các file đã mô tả trong tiêu đề và mô tả chi tiết",
    "Tât cả bản vẽ bị báo cáo vi phạm bản quyền nếu được ban quản trị xác nhận là đúng, bản vẽ sẽ bị xóa bỏ",
    "Bản vẽ đã đăng trên VRO Group là thành viên đã đồng ý cho phép các thành viên download và sử dụng",
];

const UploadSketch = () => {
    const [step, setStep] = useState<string>("type");
    const [currentAvatar, setCurrentAvatar] = useState<File>();
    const [avatarUrl, setAvatarUrl] = useState<string>("");

    const onScroll = () => {};

    const selectStepHandle = (value: string) => {
        setStep(value);
    };

    const onSearch = () => {};

    const handleChangeMultivalueKey = () => {};

    const onSelectTool = () => {};

    const onSelectCategory = () => {};

    const beforeUploadAvatar = (file: any) => {
        console.log(file);
        const isJpgOrPng = file.type === "image/jpeg";
        if (!isJpgOrPng) {
            notification.open({
                message: "Notification Title",
                description:
                    "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        }
        const isLt2M = file.size! / 1024 / 1024 < 2;
        if (!isLt2M) {
            notification.open({
                message: "Notification Title",
                description:
                    "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        }

        setAvatarUrl(URL.createObjectURL(file));
        return false;
    };

    return (
        <div className="main-upload">
            <div className="upload-area">
                <div className="upload-step">
                    <div
                        className="step1"
                        onClick={() => selectStepHandle("type")}
                    >
                        <img src={Step1} />
                        <div className="text">Danh mục bản vẽ</div>
                    </div>
                    <MinusOutlined className="connector-icon" />
                    <div
                        className="step2"
                        onClick={() => selectStepHandle("description")}
                    >
                        <img src={Step2} />
                        <div className="text">Mô tả bản vẽ</div>
                    </div>
                    <MinusOutlined className="connector-icon" />
                    <div
                        className="step3"
                        onClick={() => selectStepHandle("information")}
                    >
                        <img src={Step3} />
                        <div className="text">Thông tin bản vẽ</div>
                    </div>
                </div>
                <Form
                    className="form"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <div className="sketch-content-area">
                        {step === "type" && (
                            <div className="type-of-sketch">
                                <div className="title">Danh mục bản vẽ</div>
                                <div className="description">
                                    Vui lòng nhập các thông tin chung
                                </div>
                                <Form.Item>
                                    <Search
                                        placeholder="input search text"
                                        onSearch={onSearch}
                                    />
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
                                                        title={
                                                            <a href="https://ant.design">
                                                                {item.title}
                                                            </a>
                                                        }
                                                    />
                                                    <div>Content</div>
                                                </List.Item>
                                            )}
                                        </VirtualList>
                                    </List>
                                </Form.Item>
                            </div>
                        )}
                        {step === "description" && (
                            <div className="description-of-sketch">
                                <div className="title">Mô tả bản vẽ</div>
                                <div className="description">
                                    Vui lòng nhập các thông tin chung
                                </div>
                                <Form.Item>
                                    <div>Tiêu đề</div>
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <div>Từ khóa</div>
                                    <Select
                                        mode="multiple"
                                        style={{ width: "100%" }}
                                        placeholder="Please select"
                                        defaultValue={["a10", "c12"]}
                                        onChange={handleChangeMultivalueKey}
                                        options={options}
                                    />
                                </Form.Item>
                                <div className="image">
                                    <Form.Item
                                        className="thumbnail"
                                        valuePropName="fileList"
                                    >
                                        <div>Ảnh đại diện</div>
                                        <Upload
                                            action="/upload.do"
                                            listType="picture-card"
                                            name="avatar"
                                            showUploadList={false}
                                            multiple={false}
                                            beforeUpload={beforeUploadAvatar}
                                        >
                                            {avatarUrl ? (
                                                <img
                                                    src={avatarUrl}
                                                    alt="avatar"
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                />
                                            ) : (
                                                <div>
                                                    <PlusOutlined />
                                                    <div
                                                        style={{
                                                            marginTop: 8,
                                                        }}
                                                    >
                                                        Upload
                                                    </div>
                                                </div>
                                            )}
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item
                                        className="image-list"
                                        valuePropName="fileList"
                                    >
                                        <div>Các ảnh chi tiết</div>
                                        <Upload
                                            action="/upload.do"
                                            listType="picture-card"
                                        >
                                            <div>
                                                <PlusOutlined />
                                                <div
                                                    style={{
                                                        marginTop: 8,
                                                    }}
                                                >
                                                    Upload
                                                </div>
                                            </div>
                                        </Upload>
                                    </Form.Item>
                                </div>
                                <Form.Item>
                                    <Dragger {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click hoặc kéo file bản vẽ vào đây
                                        </p>
                                        <p className="ant-upload-hint">
                                            Lưu ý zip file trước khi upload
                                        </p>
                                    </Dragger>
                                </Form.Item>
                                <Form.Item>
                                    <div>Phí download</div>
                                    <Input />
                                </Form.Item>

                                <Form.Item>
                                    <div>Mô tả chi tiết</div>
                                    <TextArea rows={4} />
                                </Form.Item>
                            </div>
                        )}
                        {step === "information" && (
                            <div className="information-of-sketch">
                                <div className="title">Thông tin bản vẽ</div>
                                <div className="description">
                                    Vui lòng nhập các thông tin chung
                                </div>
                                <div className="style">
                                    <Form.Item>
                                        <div>Phong cách</div>
                                        <div className="button-group">
                                            {styleList.map((item, index) => (
                                                <Button
                                                    className={
                                                        index === 0
                                                            ? "end-left-button"
                                                            : index ===
                                                              styleList.length -
                                                                  1
                                                            ? "end-right-button"
                                                            : ""
                                                    }
                                                >
                                                    {item}
                                                </Button>
                                            ))}
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div>Công cụ</div>
                                        <div className="tool-list">
                                            <Radio.Group
                                                options={toolOptions}
                                                onChange={onSelectTool}
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div>Công cụ</div>
                                        <div className="tool-list">
                                            <Checkbox.Group
                                                style={{ width: "100%" }}
                                                onChange={onSelectCategory}
                                            >
                                                <Row>
                                                    <Col span={8}>
                                                        <Checkbox value="A">
                                                            A
                                                        </Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox value="B">
                                                            B
                                                        </Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox value="C">
                                                            C
                                                        </Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox value="D">
                                                            D
                                                        </Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox value="E">
                                                            E
                                                        </Checkbox>
                                                    </Col>
                                                </Row>
                                            </Checkbox.Group>
                                        </div>
                                    </Form.Item>
                                    <div className="rule">
                                        <div>Quy định chung</div>
                                        <div className="rule-list">
                                            {ruleList.map((item) => (
                                                <div>{`- ${item}`}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="commit">
                                        <Form.Item>
                                            <Checkbox>
                                                Tôi đã đọc và đồng ý với quy
                                                định chung của VRO Group
                                            </Checkbox>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {step === "information" && (
                        <div className="confirm-button-group">
                            <Form.Item>
                                <Button className="btn">Quay lại</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button className="btn">Đăng bài</Button>
                            </Form.Item>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default UploadSketch;
