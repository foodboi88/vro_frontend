import {
    Button,
    Checkbox,
    Form,
    Input,
    List,
    Modal,
    Select,
    SelectProps,
    Steps,
    Upload,
} from "antd";
import VirtualList from "rc-virtual-list";
import React, { useEffect, useState } from "react";
import {
    FolderOutlined,
    PictureOutlined,
    PlusOutlined,
    ProfileOutlined,
} from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import TextArea from "antd/lib/input/TextArea";
import { motion } from "framer-motion";
import SearchIcon from "../../images/Search_Icon.png";
import "./styles.uploadsketch.scss";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useDispatchRoot } from "../../redux/store";
// import { uploadSketchRequest } from "../../redux/controller";

const options: SelectProps["options"] = [];

const TypeList = [
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 2,
        title: "Biệt thự 1 tầng",
    },
    {
        id: 3,
        title: "Biệt thự 2 tầng",
    },
    {
        id: 4,
        title: "Biệt thự trên 3 tầng",
    },
    {
        id: 5,
        title: "Nhà phố 1 tầng",
    },
    {
        id: 6,
        title: "Nhà phố 2 tầng",
    },
    {
        id: 7,
        title: "Nhà phố trên 3 tầng",
    },
    {
        id: 8,
        title: "Nhà ống",
    },
    {
        id: 9,
        title: "Nhà xưởng",
    },
    {
        id: 10,
        title: "Nhà hàng, khách sạn",
    },
    {
        id: 11,
        title: "Nhà trọ, phòng trọ",
    },
    {
        id: 12,
        title: "Nhà ở",
    },
];

for (let i = 0; i < TypeList.length; i++) {
    if (TypeList[i]) {
        options.push({
            label: TypeList[i].title,
            value: TypeList[i].id.toString(36),
        });
    }
}

const ruleList = [
    "Mọi thông tin của thành viên đăng tải trên diễn đàn VRO Group phải chính xác",
    "Mọi file đăng bán phải đảm bảo mở được, mô tả đầy đủ thông tin và đúng như hình ảnh đính kèm",
    "Nội dung file nén đã được kiếm tra, đảm bảo không chứa tệp tin không khả dụng, độc hại, virus hoặc bất cứ liên kết khác",
    "Phải đảm bảo file download có chứa đầy đủ các file đã mô tả trong tiêu đề và mô tả chi tiết",
    "Tât cả bản vẽ bị báo cáo vi phạm bản quyền nếu được ban quản trị xác nhận là đúng, bản vẽ sẽ bị xóa bỏ",
    "Bản vẽ đã đăng trên VRO Group là thành viên đã đồng ý cho phép các thành viên download và sử dụng",
];

const optionsTools = [
    // Call API chu khong de cung ntn
    { label: "Autocad", value: "Autocad" },
    { label: "3D max", value: "3D max" },
    { label: "Revit", value: "Revit" },
    { label: "Sketchup", value: "Sketchup" },
    { label: "Khác", value: "Khác" },
];
const optionsCategorys = [
    // Call API chu khong de cung ntn
    { label: "Kiến trúc", value: "Kiến trúc" },
    { label: "Kết cấu", value: "Kết cấu" },
    { label: "Điện", value: "Điện" },
    { label: "Nước", value: "Nước" },
    { label: "PCCC", value: "PCCC" },
    { label: "Phối cảnh", value: "Phối cảnh" },
    { label: "Dự toán", value: "Dự toán" },
    { label: "Tài liệu", value: "Tài liệu" },
    { label: "Khác", value: "Khác" },
];
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const UploadSketch = () => {
    const [current, setCurrent] = useState(0); // Biến kiểm tra bước hiện tại
    const [searchType, setSearchType] = useState(""); // Biến lưu giá trị tìm kiếm loại bản vẽ
    const [selectedType, setSelectedType] = useState<number>(); // Biến lưu giá trị loại bản vẽ
    const [selectTitle, setSelectTitle] = useState(""); // Biến lưu giá trị tiêu đề bản vẽ
    const [selectTag, setSelectTag] = useState(""); // Biến lưu giá trị tag bản vẽ
    const [imageUploadLst, setImageUpload] = useState<UploadFile[]>([]); // Biến lưu giá trị ảnh bản vẽ đã upload
    const [fileUploadLst, setFileUploadList] = useState<RcFile[]>([]); // Biến lưu giá trị file bản vẽ đã upload
    const [selectPrice, setSelectPrice] = useState(""); // Biến lưu giá trị giá bản vẽ
    const [note, setNote] = useState(""); // Biến lưu giá trị ghi chú bản vẽ
    const [selectStyle, setSelectStyle] = useState(1); // Biến lưu giá trị kiểu bản vẽ
    const [selectTool, setSelectTool] = useState<CheckboxValueType[]>([]); // Biến lưu giá trị công cụ vẽ bản vẽ
    const [selectCategory, setSelectCategory] = useState<CheckboxValueType[]>(
        []
    ); // Biến lưu giá trị danh mục bản vẽ
    const [isCheckedRules, setIsCheckedRules] = useState(false); // Biến lưu giá trị quy tắc bản vẽ
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const dispatch = useDispatchRoot();

    const handleCancelPreview = () => setPreviewOpen(false); // Hàm xử lý khi click hủy xem ảnh

    const handlePreview = async (file: UploadFile) => {
        // Hàm xử lý khi click xem ảnh
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
        );
    };

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    const handleChangeFileLst: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        // Hàm xử lý khi thay đổi file upload
        setImageUpload(newFileList);
        console.log(newFileList);
    };

    const uploadButton = // Hàm xử lý khi click upload ảnh
        (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
        );

    const handleChangeMultivalueKey = (val: React.SetStateAction<string>) => {
        // Hàm xử lý khi thay đổi giá trị select
        setSelectTag(val);
    };

    const filteredData = TypeList.filter((item) =>
        item.title.toLowerCase().includes(searchType.toLowerCase())
    ); // Hàm xử lý khi tìm kiếm loại bản vẽ

    const handleSearchType = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        // Hàm xử lý khi thay đổi giá trị tìm kiếm loại bản vẽ
        setSearchType(e.target.value);
    };

    const handleClickType = (item: { id: number; title: string }) => {
        // Hàm xử lý khi click chọn loại bản vẽ
        setSelectedType(item.id);
        console.log(item);
    };

    const handleClickNextBtn = () => {
        // Hàm xử lý khi click nút tiếp theo
        setCurrent(current + 1);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const handleClickBackBtn = () => {
        // Hàm xử lý khi click nút quay lại
        setCurrent(current - 1);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const handleClickBtnStyle = (val: React.SetStateAction<number>) => {
        // Hàm xử lý khi click chọn kiểu bản vẽ
        setSelectStyle(val);
    };

    const handleUploadSketch = () => {
        const bodyrequest = {
            // searchType: searchType,
            // selectedType: selectedType,
            title: selectTitle,
            // selectedTag: selectTag,
            imageUploadLst: imageUploadLst,
            fileUploadLst: fileUploadLst,
            size: 0,
            price: selectPrice as unknown as number,
            content: note,
            productDesignStyles: selectStyle,
            productDesignTools: selectTool,
            productTypeOfArchitecture: selectCategory,
        };

        console.log(bodyrequest);

        // dispatch(uploadSketchRequest(bodyrequest));
    };
    return (
        <div className="main-upload">
            <div className="upload-area">
                <Steps
                    responsive={false}
                    direction="horizontal"
                    className="upload-step"
                    current={current}
                    items={
                        windowSize[0] >= 700
                            ? [
                                  {
                                      title: "Danh mục bản vẽ",
                                      icon: <FolderOutlined />,
                                  },
                                  {
                                      title: "Mô tả bản vẽ",
                                      icon: <ProfileOutlined />,
                                  },
                                  {
                                      title: "Thông tin bản vẽ",
                                      icon: <PictureOutlined />,
                                  },
                              ]
                            : [
                                  {
                                      // title: 'Danh mục bản vẽ',
                                      icon: <FolderOutlined />,
                                  },
                                  {
                                      // title: 'Mô tả bản vẽ',
                                      icon: <ProfileOutlined />,
                                  },
                                  {
                                      // title: 'Thông tin bản vẽ',
                                      icon: <PictureOutlined />,
                                  },
                              ]
                    }
                />
                <Form className="form">
                    <div className="sketch-content-area">
                        {current === 0 && (
                            <div className="content-area">
                                <div className="sketch-content">
                                    <div className="title">Danh mục bản vẽ</div>
                                    <div className="description">
                                        Vui lòng nhập các thông tin chung
                                    </div>
                                    <Form.Item>
                                        <div className={`header-content-input`}>
                                            <Input
                                                className="search-input"
                                                placeholder="Tìm kiếm danh mục bản vẽ"
                                                onChange={handleSearchType}
                                            />
                                            <img
                                                src={SearchIcon}
                                                className="icon-search"
                                            ></img>
                                        </div>
                                        <List>
                                            <VirtualList
                                                data={filteredData}
                                                height={300}
                                                itemHeight={47}
                                                itemKey="email"
                                            >
                                                {(item: any) => (
                                                    <List.Item
                                                        className={`${
                                                            selectedType ===
                                                            item.id
                                                                ? "selected-item"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            handleClickType(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <List.Item.Meta
                                                            title={item.title}
                                                        />
                                                    </List.Item>
                                                )}
                                            </VirtualList>
                                        </List>
                                    </Form.Item>
                                </div>
                                <motion.div className="btn-submit-upload">
                                    {selectedType ? (
                                        <Button
                                            onClick={() => handleClickNextBtn()}
                                        >
                                            Tiếp tục
                                        </Button>
                                    ) : (
                                        <Button disabled={true}>
                                            Tiếp tục
                                        </Button>
                                    )}
                                </motion.div>
                            </div>
                        )}
                        {current === 1 && (
                            <div className="content-area">
                                <div className="sketch-content">
                                    <div className="title">Mô tả bản vẽ</div>
                                    <div className="description">
                                        Vui lòng nhập các thông tin chung
                                    </div>
                                    <Form.Item>
                                        <div className="title-input">
                                            Tiêu đề <strong>*</strong>
                                        </div>
                                        <div className={`header-content-input`}>
                                            <Input
                                                className="search-input"
                                                placeholder="Nhập tiêu đề"
                                                onChange={(e) =>
                                                    setSelectTitle(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="title-input">
                                            Từ khóa <strong>*</strong>
                                        </div>
                                        <Select
                                            mode="tags"
                                            placeholder="Nhập từ khóa"
                                            onChange={handleChangeMultivalueKey}
                                            options={options}
                                        />
                                    </Form.Item>
                                    <div className="image">
                                        <Form.Item
                                            className="thumbnail"
                                            valuePropName="imageList"
                                        >
                                            <div className="title-input">
                                                Hình ảnh <strong>*</strong>
                                            </div>
                                            <Upload
                                                action={
                                                    "https://localhost:3000/"
                                                }
                                                multiple
                                                listType="picture-card"
                                                showUploadList={{
                                                    showRemoveIcon: true,
                                                }}
                                                fileList={imageUploadLst}
                                                onPreview={handlePreview}
                                                onChange={handleChangeFileLst}
                                                accept=".png, .jpeg, .jpg"
                                                beforeUpload={(file) => {
                                                    console.log(file);
                                                    return false;
                                                }}
                                                progress={{
                                                    strokeWidth: 3,
                                                    strokeColor: {
                                                        "0%": "#a9eab3",
                                                        "100%": "#27CA40",
                                                    },
                                                    style: { top: 12 },
                                                }}
                                            >
                                                {imageUploadLst.length >= 8
                                                    ? null
                                                    : uploadButton}
                                            </Upload>
                                            <Modal
                                                open={previewOpen}
                                                title={previewTitle}
                                                footer={null}
                                                onCancel={handleCancelPreview}
                                            >
                                                <img
                                                    alt="example"
                                                    style={{ width: "100%" }}
                                                    src={previewImage}
                                                />
                                            </Modal>
                                        </Form.Item>
                                        <Form.Item
                                            className="image-list"
                                            valuePropName="fileList"
                                        >
                                            <div className="title-input">
                                                Tải bản vẽ chi tiết{" "}
                                                <strong>*</strong>
                                            </div>
                                            <Upload.Dragger
                                                multiple
                                                listType="picture"
                                                action={
                                                    "https://localhost:3000/"
                                                }
                                                showUploadList={{
                                                    showRemoveIcon: true,
                                                }}
                                                accept=".png, .jpeg, .jpg, .pdf, .zip, .rar, .7z, .doc"
                                                beforeUpload={(file) => {
                                                    let tmplst = fileUploadLst;
                                                    tmplst.push(file);
                                                    setFileUploadList(tmplst);
                                                    return false;
                                                }}
                                                progress={{
                                                    strokeWidth: 3,
                                                    strokeColor: {
                                                        "0%": "#a9eab3",
                                                        "100%": "#27CA40",
                                                    },
                                                    style: { top: 12 },
                                                }}
                                            >
                                                Click hoặc kéo file bản vẽ vào
                                                đây
                                                <br />
                                            </Upload.Dragger>
                                        </Form.Item>
                                    </div>
                                    <Form.Item>
                                        <div className="title-input">
                                            Phí download (VNĐ){" "}
                                            <strong>*</strong>
                                        </div>
                                        <div className={`header-content-input`}>
                                            <Input
                                                type="number"
                                                className="search-input"
                                                placeholder="Nhập phí download"
                                                onChange={(e) =>
                                                    setSelectPrice(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </Form.Item>

                                    <Form.Item>
                                        <div className="title-input">
                                            Mô tả chi tiết <strong>*</strong>
                                        </div>
                                        <div className={`header-content-input`}>
                                            <TextArea
                                                rows={4}
                                                placeholder="Nhập mô tả"
                                                onChange={(e) =>
                                                    setNote(e.target.value)
                                                }
                                            />
                                        </div>
                                    </Form.Item>
                                </div>
                                <motion.div className="btn-submit-upload">
                                    <Button
                                        className="btn-back"
                                        onClick={() => handleClickBackBtn()}
                                    >
                                        Quay lại
                                    </Button>
                                    {selectTitle &&
                                    selectTag &&
                                    imageUploadLst &&
                                    fileUploadLst &&
                                    selectPrice &&
                                    note ? (
                                        <Button
                                            onClick={() => handleClickNextBtn()}
                                        >
                                            Tiếp tục
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleClickNextBtn()}
                                            disabled
                                        >
                                            Tiếp tục
                                        </Button>
                                    )}
                                </motion.div>
                            </div>
                        )}
                        {current === 2 && (
                            <div className="content-area">
                                <div className="sketch-content">
                                    <div className="title">
                                        Thông tin bản vẽ
                                    </div>
                                    <div className="description">
                                        Vui lòng nhập các thông tin chung
                                    </div>
                                    <Form.Item>
                                        <div className="title-input">
                                            Phong cách <strong>*</strong>
                                        </div>
                                        <div className="button-group">
                                            <Button
                                                className={
                                                    selectStyle === 1
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleClickBtnStyle(1)
                                                }
                                            >
                                                Hiện đại
                                            </Button>
                                            <Button
                                                className={
                                                    selectStyle === 2
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleClickBtnStyle(2)
                                                }
                                            >
                                                Tân cổ điển
                                            </Button>
                                            <Button
                                                className={
                                                    selectStyle === 3
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleClickBtnStyle(3)
                                                }
                                            >
                                                Chưa xác định
                                            </Button>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="title-input">
                                            Công cụ <strong>*</strong>
                                        </div>
                                        <div className="tool-list">
                                            <Checkbox.Group
                                                className="lst-tool"
                                                options={optionsTools}
                                                onChange={(e) =>
                                                    setSelectTool(e)
                                                }
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="title-input">
                                            Hạng mục <strong>*</strong>
                                        </div>
                                        <div className="tool-list">
                                            <Checkbox.Group
                                                className="lst-category"
                                                options={optionsCategorys}
                                                onChange={(e) =>
                                                    setSelectCategory(e)
                                                }
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="title-input">
                                            Quy định chung
                                        </div>
                                        <div className="rule-list">
                                            {ruleList.map((item) => (
                                                <div>{`- ${item}`}</div>
                                            ))}
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <Checkbox
                                            onChange={(e) =>
                                                setIsCheckedRules(
                                                    e.target.checked
                                                )
                                            }
                                        >
                                            Tôi đã đọc và đồng ý với quy định
                                            chung của VRO Group
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                                <motion.div className="btn-submit-upload">
                                    <Button
                                        className="btn-back"
                                        onClick={() => handleClickBackBtn()}
                                    >
                                        Quay lại
                                    </Button>
                                    {selectStyle &&
                                    selectTool &&
                                    selectCategory &&
                                    isCheckedRules ? (
                                        <Button
                                            onClick={() => handleUploadSketch()}
                                        >
                                            Đăng bài
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleUploadSketch()}
                                            disabled
                                        >
                                            Đăng bài
                                        </Button>
                                    )}
                                </motion.div>
                            </div>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UploadSketch;
