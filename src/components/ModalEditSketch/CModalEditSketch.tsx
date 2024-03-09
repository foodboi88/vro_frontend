import { Form, Input, Modal, Radio, Upload, UploadFile, UploadProps, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { IUploadSketchRequest } from "../../common/sketch.interface";
import { TEXT_FIELD, TEXT_INPUT } from "../../enum/common.enum";
import { editSketchRequest, getAllFilterCriteriasRequest, getDetailSketchRequest, putImageProductRequest, putNewImageProductRequest } from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./style.cmodaleditsketch.scss";
import axios from "axios";
import Utils from "../../common/utils";
interface MyProps{
    open: boolean;
    data?: IUploadSketchRequest;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

type LayoutType = Parameters<typeof Form>[0]['layout'];

const uploadButton = (
    <div>
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

const CModalEditSketch = (props: MyProps) => {
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
    const [imageUploadLst, setImageUploadLst] = useState([]); // Biến lưu giá trị ảnh bản vẽ đã upload
    const { styleList, architectureList, detailSketch } = useSelectorRoot((state) => state.sketch); // Lst cac ban ve        
    const dispatch = useDispatchRoot();
    const [form] = Form.useForm();
    const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 6 }, wrapperCol: { span: 18 } } : null;
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight,]);
    const [fileList, setFileList] = useState<any[]>([]);

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
        console.log('CModalEditSketch', props?.data?.id);

        if (props.data) {
            dispatch(getDetailSketchRequest(props.data.id))
        }
    }, [props.data])

    useEffect(() => {
        console.log(detailSketch);
        if (detailSketch) {
            setFileList(detailSketch?.images?.map((item: any, index: any) => {
                return {
                    // change to type UploadFile for filelist
                    uid: item.id,
                    name: item.id,
                    status: 'done',
                    url: item.filePath,
                    isOld: true,
                }
            }))
        }
    }, [detailSketch])

    useEffect(() => {
        console.log(fileList);

        const newImage = fileList.filter((item) => !item.isOld);

        newImage.forEach((item) => {
            console.log(item.originFileObj);

        });
    }, [fileList]);

    const handleUploadSketch = async () => {
        console.log(form.getFieldsValue())
        const bodyrequest = {...form.getFieldsValue(),id: props?.data?.id}
        dispatch(editSketchRequest(bodyrequest));


        // Lấy ra 2 mảng ảnh mới và ảnh cũ
        const oldImage = fileList.filter((item) => item.isOld);
        const newImage = fileList.filter((item) => !item.isOld);

        console.log(oldImage);
        console.log(newImage);


        if (oldImage.length > 0) {
            const req = {
                imageIds: oldImage.map((item) => item.uid),
            }

            console.log(req);

            const token = Utils.getValueLocalStorage("token");


            await axios.put(`https://api.banvebank.com.vn/product-images/${props?.data?.id}`, req, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then((res) => {
                console.log(res);
            }
            ).catch((err) => {
                console.log(err);
            })

            // dispatch(putImageProductRequest(req));
        }
        if (oldImage.length <= 0) {
            const req = {
                imageIds: ['all'],
            }
            const token = Utils.getValueLocalStorage("token");
            await axios.put(`https://api.banvebank.com.vn/product-images/${props?.data?.id}`, req, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then((res) => {
                console.log(res);
            }
            ).catch((err) => {
                console.log(err);
            })
        }

        if (newImage.length > 0) {

            const images = newImage.map((item) => item.originFileObj);
            const req = {
                id: props?.data?.id,
                imageUploadLst: images
            }

            console.log(req);

            dispatch(putNewImageProductRequest(req));
        }

        props.setOpenModalEdit(false)
    };

    const handleChangeFileLst: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        console.log(newFileList);

        setFileList(newFileList);
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
            title="Chỉnh sửa bản vẽ"
            style={{ height: windowSize[1] - 100, top: 20 }}
        >
            <div className="main-upload">
                <div className="upload-area">
                    
                    <Form 
                        initialValues={props.data}
                        form={form} 
                        className="form"
                        {...formItemLayout}
                        layout={formLayout}
                        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}

                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                        >
                                <Input
                                    className="search-input"
                                placeholder="Nhập tiêu đề"
                                    maxLength={TEXT_INPUT.MAX_LENGTH}
                                />
                        </Form.Item>

                        <Form.Item
                            label="Danh mục"
                            name="productTypeOfArchitecture"
                        >
                            <Radio.Group
                                className="lst-category"
                                options={architectureList}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phong cách"
                            name="productDesignStyles"
                        >
                            <Radio.Group
                                className="lst-category"
                                options={styleList}
                            />
                        </Form.Item>

                        {/* Form item cho upload file list ảnh */}

                        <Form.Item
                            label="Ảnh"
                            name="images"
                        >
                            <Upload
                                // action={'localhost:3000/upload'}
                                className="upload-list-edit-sketch"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleChangeFileLst}
                            // customRequest={handleUpload}
                            // onRemove={(file) => {
                            //     console.log(file);
                            //     const tmp = fileList.filter((item) => item.uid !== file.uid);
                            //     setFileList(tmp);
                            // }}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>

                        </Form.Item>

                        <Form.Item
                        label="Mô tả chi tiết"
                            name="content"
                        >
                            <TextArea
                                rows={4}
                                placeholder="Nhập mô tả"
                                maxLength={TEXT_FIELD.MAX_LENGTH}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default CModalEditSketch;
