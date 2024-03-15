import { Button, Form, Input, Modal, Radio, Upload, UploadFile, UploadProps, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { IUploadSketchRequest } from "../../common/sketch.interface";
import { TEXT_FIELD, TEXT_INPUT } from "../../enum/common.enum";
import { editSketchRequest, getAllFilterCriteriasRequest, getDetailSketchRequest, putImageProductRequest, putNewImageProductRequest } from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./style.cmodaleditsketch.scss";
import axios from "axios";
import Utils from "../../common/utils";
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UploadOutlined } from "@ant-design/icons";


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

interface DraggableUploadListItemProps {
    originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    file: UploadFile<any>;
}

const DraggableUploadListItem = ({ originNode, file }: DraggableUploadListItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: file.uid,
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'move',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            // prevent preview event when drag end
            className={isDragging ? 'is-dragging' : ''}
            {...attributes}
            {...listeners}
        >
            {/* hide error tooltip when dragging */}
            {file.status === 'error' && isDragging ? originNode.props.children : originNode}
        </div>
    );
};

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

        console.log(fileList);


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

    const sensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
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
            width={1000}
        >
            <div className="main-upload">
                <div className="upload-area">
                    
                    <Form 
                        initialValues={props.data}
                        form={form} 
                        className="form"
                        {...formItemLayout}
                        layout={formLayout}
                        // style={{ maxWidth: formLayout === 'inline' ? 'none' : 1000 }}
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

                            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                                <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                                    <Upload
                                        // action={'localhost:3000/upload'}
                                        className="upload-list-edit-sketch"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleChangeFileLst}
                                        itemRender={(originNode, file) => (
                                            <DraggableUploadListItem originNode={originNode} file={file} />
                                        )}
                                    // customRequest={handleUpload}
                                    // onRemove={(file) => {
                                    //     console.log(file);
                                    //     const tmp = fileList.filter((item) => item.uid !== file.uid);
                                    //     setFileList(tmp);
                                    // }}
                                    >
                                        Tải ảnh lên
                                    </Upload>
                                    {/* <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        fileList={fileList}
                                        onChange={onChange}
                                        itemRender={(originNode, file) => (
                                            <DraggableUploadListItem originNode={originNode} file={file} />
                                        )}
                                    >
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload> */}
                                </SortableContext>
                            </DndContext>
                            {/* <Upload
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
                            </Upload> */}

                        </Form.Item>

                        <Form.Item
                        label="Mô tả chi tiết"
                            name="content"
                        >
                            <TextArea
                                rows={10}
                                placeholder="Nhập mô tả"
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default CModalEditSketch;
