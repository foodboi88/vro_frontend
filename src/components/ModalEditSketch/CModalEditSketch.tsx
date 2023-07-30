import { PlusOutlined, ProfileOutlined, PictureOutlined } from "@ant-design/icons";
import { SelectProps, UploadFile, UploadProps, Steps, Form, Input, Checkbox, Radio, Button, Upload, Modal } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import TextArea from "antd/lib/input/TextArea";
import { RadioChangeEventTarget } from "antd/lib/radio";
import { RcFile } from "antd/lib/upload";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TEXT_INPUT, TEXT_FIELD } from "../../enum/common.enum";
import { editSketchRequest, getAllFilterCriteriasRequest, uploadSketchRequest } from "../../redux/controller";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import { IUploadSketchRequest } from "../../common/sketch.interface";



interface MyProps{
    open: boolean;
    data?: IUploadSketchRequest;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

const CModalEditSketch = (props: MyProps) => {
    const [searchType, setSearchType] = useState(""); // Biến lưu giá trị tìm kiếm loại bản vẽ
    const [selectTitle, setSelectTitle] = useState(props.data? props.data.title : ''); // Biến lưu giá trị tiêu đề bản vẽ
    const [imageUploadLst, setImageUpload] = useState<UploadFile[]>([]); // Biến lưu giá trị ảnh bản vẽ đã upload
    const [fileUploadLst, setFileUploadList] = useState<RcFile[]>([]); // Biến lưu giá trị file bản vẽ đã upload
    const [selectPrice, setSelectPrice] = useState(props.data? props.data.price : ''); // Biến lưu giá trị giá bản vẽ
    const [note, setNote] = useState(props.data? props.data.note : ''); // Biến lưu giá trị ghi chú bản vẽ
    const [selectTool, setSelectTool] = useState<CheckboxValueType[]>([props.data? props.data.productDesignTools as CheckboxValueType : '']); // Biến lưu giá trị công cụ vẽ bản vẽ
    const [selectCategory, setSelectCategory] = useState(
        [props.data? props.data.productTypeOfArchitecture  : '']
    ); // Biến lưu giá trị danh mục bản vẽ

    const { checkProductsFile, toolList, architectureList, styleList } = useSelectorRoot((state) => state.sketch); // Lst cac ban ve        
    const dispatch = useDispatchRoot();




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

    useEffect(() => {
        dispatch(getAllFilterCriteriasRequest())
        console.log(props.data)
    }, [])


    const handleUploadSketch = () => {
        const bodyrequest = {
            title: selectTitle,
            size: "40m*40m",
            price: selectPrice,
            content: note,
            productDesignStyles: "64230fdaedf9dd11e488c249", // Set default value
            productDesignTools: selectTool,
            productTypeOfArchitecture: selectCategory,
        };

        console.log(bodyrequest);

        

        // const bodyrequestTest = {
        //     imageUploadLst: imageUploadLst,
        //     fileUploadLst: fileUploadLst,
        //     id: "6423f410c55e590e7080e5fa",
        // };

        dispatch(editSketchRequest(bodyrequest));

        props.setOpenModalEdit(false)


        // dispatch(uploadFileSketchRequest(bodyrequestTest));
        // dispatch(uploadImageSketchRequest(bodyrequestTest));
    };


    return (
        <Modal
            open={props.open}
            onOk={handleUploadSketch}
            okText={'Cập nhật'}
            onCancel={()=>{
                props.setOpenModalEdit(false)
            }}
            cancelText={'Hủy'}
        >
            <div className="main-upload">
                <div className="upload-area">
                    
                    <Form className="form">
                        <div className="sketch-content-area">
                            <div className="content-area">
                                <div className="sketch-content">
                                    <div className="title">Chỉnh sửa thông tin bản vẽ</div>
                                    <div className="description">
                                        Vui lòng nhập để sửa các thông tin chung
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
                                                maxLength={TEXT_INPUT.MAX_LENGTH}
                                            />
                                        </div>
                                    </Form.Item>
                                    
                                    <Form.Item>
                                        <div className="title-input">
                                            Công cụ <strong>*</strong>
                                        </div>
                                        <div className="tool-list">
                                            <Checkbox.Group
                                                className="lst-tool"
                                                options={toolList}
                                                onChange={(e) =>
                                                    setSelectTool(e)
                                                }
                                            />
                                        </div>
                                    </Form.Item>

                                    <Form.Item>
                                        <div className="title-input">
                                            Kiến trúc <strong>*</strong>
                                        </div>
                                        <div className="tool-list">
                                            <Radio.Group
                                                className="lst-category"
                                                options={architectureList}
                                                onChange={(e) =>
                                                    
                                                    {
                                                        const selectValue =[e.target.value]
                                                        setSelectCategory(selectValue)

                                                    }
                                                }
                                            />
                                        </div>
                                    </Form.Item>
                                    
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
                                                min={0}
                                                onChange={(e) =>
                                                    setSelectPrice(e.target.value)
                                                }
                                                maxLength={TEXT_INPUT.MAX_LENGTH}

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
                                                maxLength={TEXT_FIELD.MAX_LENGTH}

                                            />
                                        </div>
                                    </Form.Item>

                                </div>
                                
                            </div>
                            
                        </div>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default CModalEditSketch;
