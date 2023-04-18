import React, { useEffect, useState } from "react";
import "./styles.authorpage.scss";
import CFilter from "../../components/Filter/CFilter";
import CAuthorIntroduction from "../../components/AuthorIntroduction/CAuthorIntroduction";
import CArrangeBar from "../../components/ArrangeBar/CArrangeBar";
import { Col, MenuProps, Row } from "antd";
import { Menu } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import {
    getAuthorIntroductionByIdRequest,
    getSketchListByAuthorIdRequest,
} from "../../redux/controller";
import CProductCard from "../../components/ProductCard/CProductCard";

const items: MenuProps["items"] = [
    {
        label: "Tất cả bản vẽ",
        key: "1",
        icon: <WalletOutlined />,
    },
    {
        label: "Bản vẽ thịnh hành",
        key: "2",
        icon: <WalletOutlined />,
    },
    {
        label: "Bản vẽ nhiều lượt tải",
        key: "3",
        icon: <WalletOutlined />,
    },
    {
        label: "Bản vẽ đánh giá cao",
        key: "4",
        icon: <WalletOutlined />,
    },
];

const AuthorPage = () => {
    const navigate = useNavigate();

    const [current, setCurrent] = useState("mail");
    const [spanCol, setSpanCol] = useState<number>(6);

    const { authorIntroduction, filteredSketchs } = useSelectorRoot(
        (state) => state.sketch
    ); // Lấy ra dữ liệu detail sketch và danh sách comment từ redux
    const dispatch = useDispatchRoot();
    const { authorId } = useParams();

    useEffect(() => {
        if (authorId) {
            dispatch(getAuthorIntroductionByIdRequest(authorId));
            dispatch(getSketchListByAuthorIdRequest(authorId));
        }
    }, []);

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    const goToDetailPageHandle = (id: string) => {
        navigate(`/detail-sketch/${id}`);
    };
    return (
        <div className="main-author-page">
            <CFilter />
            <div className="page-content">
                {authorIntroduction && (
                    <CAuthorIntroduction
                        createdAt={authorIntroduction?.createdAt}
                        address={authorIntroduction.address}
                        name={authorIntroduction.name}
                        phone={authorIntroduction.phone}
                        totalProduct={authorIntroduction.totalProduct}
                        totalRating={authorIntroduction.totalRating}
                    />
                )}
                <div className="horizontal-navbar">
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                    />
                </div>
                <CArrangeBar />
                <div className="sketch-list">
                    <Row className="detail-list" gutter={[16, 24]}>
                        {filteredSketchs &&
                            filteredSketchs.map((card) => (
                                <Col
                                    onClick={() => {
                                        goToDetailPageHandle(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        // imageUrl={card.images[0]}
                                        imageUrl={""}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                        // type={card.}
                                    />
                                </Col>
                            ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default AuthorPage;
