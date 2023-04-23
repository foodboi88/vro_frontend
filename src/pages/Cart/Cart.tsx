import React, { useEffect, useState } from "react";
import "./styles.cart.scss";
import { IDetailSketch } from "../../common/sketch.interface";
import IconDetail1 from "../../images/detail/icon-detail-1.png";
import IconDetail2 from "../../images/detail/icon-detail-2.png";
import IconDetail3 from "../../images/detail/icon-detail-3.png";
import IconDetail4 from "../../images/detail/icon-detail-4.png";
import IconDetail5 from "../../images/detail/icon-detail-5.png";
import IconDetail6 from "../../images/detail/icon-detail-6.png";
import CartImage1 from "../../images/cart/cart-image-1.png";
import CartImage2 from "../../images/cart/cart-image-2.png";
import CartImage3 from "../../images/cart/cart-image-3.png";
import { Button, Col, Modal, Row, Select, Table } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    CaretDownOutlined,
} from "@ant-design/icons";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";

interface DataType {
    key: React.Key;
    sketch: IDetailSketch;
}
const infoUser = [
    {
        key: "1",
        label: "Họ và tên",
        value: "Nguyễn Văn A",
    },
    {
        key: "2",
        label: "Email",
        value: "Ngocbpt248328@gmail.com",
    },
    {
        key: "3",
        label: "Số điện thoại",
        value: "0969 999 999",
    },
];
const infoCart = [
    {
        key: "1",
        label: "Tạm tính (0 sản phẩm)",
        value: "3.000.000VNĐ",
    },
    {
        key: "2",
        label: "Thuế VAT (8%)",
        value: "240.000VNĐ",
    },
];
const { Option } = Select;

const Cart = () => {
    const { sketchsInCart } = useSelectorRoot((state) => state.sketch);
    const dispatch = useDispatchRoot();

    const dataSketch = [
        {
            key: "1",
            sketch: {
                images: [
                    {
                        filePath: CartImage1,
                    },
                ],
                info: {
                    title: "Thiết kế nhà gác lửng hiện đại",
                    fileSize: 68,
                    size: {
                        width: "4m",
                        height: "15,5m",
                        area: "62m2",
                    },
                    newPrice: "2.500.000VNĐ",
                    oldPrice: "3.000.000VNĐ",
                },
                designStyles: [
                    {
                        name: "Hiện đại",
                    },
                ],
                designTools: [
                    {
                        name: "File Revit",
                    },
                ],
                typeOfArchitectures: [
                    {
                        name: "Kiến trúc",
                    },
                    {
                        name: "Phối cảnh",
                    },
                ],
            },
        },
        {
            key: "2",
            sketch: {
                images: [
                    {
                        filePath: CartImage2,
                    },
                ],
                info: {
                    title: "Thiết kế nhà gác lửng hiện đại",
                    fileSize: 68,
                    size: {
                        width: "4m",
                        height: "15,5m",
                        area: "62m2",
                    },
                    newPrice: "MIỄN PHÍ",
                    oldPrice: "599.000VNĐ",
                },
                designStyles: [
                    {
                        name: "Hiện đại",
                    },
                ],
                designTools: [
                    {
                        name: "File Revit",
                    },
                ],
                typeOfArchitectures: [
                    {
                        name: "Kiến trúc",
                    },
                    {
                        name: "Phối cảnh",
                    },
                ],
            },
        },
        {
            key: "3",
            sketch: {
                images: [
                    {
                        filePath: CartImage3,
                    },
                ],
                info: {
                    title: "Thiết kế nhà gác lửng hiện đại",
                    fileSize: 68,
                    size: {
                        width: "4m",
                        height: "15,5m",
                        area: "62m2",
                    },
                    newPrice: "500.000VNĐ",
                    oldPrice: "799.000VNĐ",
                },
                designStyles: [
                    {
                        name: "Hiện đại",
                    },
                ],
                designTools: [
                    {
                        name: "File Revit",
                    },
                ],
                typeOfArchitectures: [
                    {
                        name: "Kiến trúc",
                    },
                    {
                        name: "Phối cảnh",
                    },
                ],
            },
        },
    ];
    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: `Tất cả (${dataSketch.length} sản phẩm)`,
            dataIndex: "sketch",
            key: "sketch",
            render: (sketch: IDetailSketch) => (
                <div className="sketch-cart-info">
                    <div className="sketch-cart-info-img">
                        <img src={sketch.images[0].filePath} alt="" />
                    </div>
                    <div className="sketch-cart-content">
                        <div className="sketch-cart-content-title">
                            {sketch.info.title}
                        </div>
                        <div className="sketch-cart-content-info">
                            <div className="content">
                                <img src={IconDetail4} alt="" />
                                <div className="text">
                                    {/* Dung lượng file: {info.fileSize} MB */}
                                    Dung lượng file: {sketch.info.fileSize} MB
                                </div>
                            </div>
                            <div className="content">
                                <img src={IconDetail2} alt="" />
                                <div className="text">
                                    Phong cách:
                                    {sketch.designStyles.map((style, index) =>
                                        index ===
                                        sketch.designStyles.length - 1 ? (
                                            <span key={index}>
                                                {" "}
                                                {style.name}
                                            </span>
                                        ) : (
                                            <span key={index}>
                                                {" "}
                                                {style.name},
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="content">
                                <img src={IconDetail5} alt="" />
                                <div className="text">
                                    {/* Kích thước: {info.width} x {info.height} cm */}
                                    Kích thước: Rộng {sketch.info.size?.width},
                                    Dài {sketch.info.size?.height}, DT{" "}
                                    {sketch.info.size?.area}
                                </div>
                            </div>
                            <div className="content">
                                <img src={IconDetail3} alt="" />
                                <div className="text">
                                    Công cụ:
                                    {sketch.designTools.map((tool, index) =>
                                        index ===
                                        sketch.designTools.length - 1 ? (
                                            <span key={index}>
                                                {" "}
                                                {tool.name}
                                            </span>
                                        ) : (
                                            <span key={index}>
                                                {" "}
                                                {tool.name},
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="content">
                                <img src={IconDetail6} alt="" />
                                <div className="text">
                                    Hạng mục:{" "}
                                    {sketch.typeOfArchitectures.map(
                                        (type, index) =>
                                            index ===
                                            sketch.typeOfArchitectures.length -
                                                1 ? (
                                                <span key={index}>
                                                    {" "}
                                                    {type.name}
                                                </span>
                                            ) : (
                                                <span key={index}>
                                                    {" "}
                                                    {type.name},
                                                </span>
                                            )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "5",
            title: (
                <div className="sketch-cart-action-title">
                    <DeleteOutlined /> Xóa tất cả
                </div>
            ),
            render: (record: any) => {
                return (
                    <div className="sketch-cart-action">
                        <div
                            className={
                                record.sketch.info.newPrice === "MIỄN PHÍ"
                                    ? "sketch-cart-action-new-price free"
                                    : "sketch-cart-action-new-price"
                            }
                        >
                            {record.sketch.info.newPrice}
                        </div>
                        <div className="sketch-cart-action-old-price">
                            {record.sketch.info.oldPrice}
                        </div>
                        <div
                            className="sketch-cart-action-delete"
                            onClick={() => {
                                onDeleteStudent(record);
                            }}
                        >
                            <DeleteOutlined />
                            Xóa
                        </div>
                    </div>
                );
            },
        },
    ];
    const [tmpData, setTmpData] = useState<any>(dataSketch);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };
    const onDeleteStudent = (record: any) => {
        Modal.confirm({
            title: "Bạn có muốn xóa sản phẩm này trong giỏ hàng?",
            okText: "Có",
            okType: "danger",
            onOk: () => {
                setTmpData((pre: any) => {
                    return pre.filter(
                        (item: { key: any }) => item.key !== record.id
                    );
                });
            },
        });
    };
    return (
        <div className="main-cart">
            <div className="title">Giỏ hàng</div>
            <div className="content-cart">
                <div className="left-content-cart">
                    <Table
                        className="table-source"
                        columns={columns}
                        rowSelection={{ ...rowSelection }}
                        dataSource={tmpData}
                        pagination={false}
                    />
                </div>
                <div className="right-content-cart">
                    <div className="right-content-cart-info-user">
                        <div className="title">
                            <div className="title-text">
                                Thông tin khách hàng
                            </div>
                            <div className="title-edit">
                                <EditOutlined />
                                Chỉnh sửa
                            </div>
                        </div>
                        {infoUser &&
                            infoUser.map((item, index) => (
                                <div className="info-user">
                                    <div className="label-info-user">
                                        {item.label}
                                    </div>
                                    <div className="value-info-user">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="right-content-cart-info-cart">
                        <div className="title">
                            <div className="title-text">
                                Thông tin khách hàng
                            </div>
                            <div className="title-edit">
                                <EditOutlined />
                                Chỉnh sửa
                            </div>
                        </div>
                        {infoCart &&
                            infoCart.map((item, index) => (
                                <div className="info-cart">
                                    <div className="label-info-user">
                                        {item.label}
                                    </div>
                                    <div className="value-info-user">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        <div className="discount">
                            <Select
                                className="select-discount"
                                suffixIcon={<CaretDownOutlined />}
                                placeholder="Chọn mã giảm giá"
                            >
                                <Option value="1">
                                    Giảm 10% thành viên mới
                                </Option>
                                <Option value="2">
                                    Mã giảm 5% tối đa 50.000VNĐ
                                </Option>
                                <Option value="3">
                                    Mã giảm 3% tối đa 50.000VNĐ
                                </Option>
                            </Select>

                            <Button>Áp dụng</Button>
                        </div>

                        <div className="total-price">
                            <div className="total-price-title">Tổng tiền</div>
                            <div className="total-price-value">
                                2.940.000 VNĐ
                            </div>
                        </div>
                    </div>

                    <Button className="to-payment">Đi tới thanh toán</Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
