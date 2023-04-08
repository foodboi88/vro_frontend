import React from "react";
import {
    Variants,
    motion,
    useTransform,
    useViewportScroll,
} from "framer-motion";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { EyeOutlined } from "@ant-design/icons";
import BietThu from "../../images/homepage/bietthu1.png";
import { useNavigate } from "react-router-dom";
import "./styles.productcard.scss";
interface props {
    imageUrl?: string;
    title: string;
    view: number;
    price: number;
    type?: string;
}

const CProductCard = (props: props) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/detail-sketch");
    };
    return (
        <Card
            className="card"
            hoverable
            cover={<img alt="example" src={props.imageUrl} />}
            onClick={handleNavigate}
        >
            <div className="title-and-price">
                <Meta
                    title={
                        <div className="home-card-title">
                            <div className="h-c-t-title">{props.title}</div>
                            <div className="h-c-t-view-point">
                                <EyeOutlined />
                                <div className="number-of-view">
                                    {props.view}
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
            <div className="home-card-description">{props.type}</div>
            {props.price === 0 ? (
                <div className="home-card-price free">Miễn Phí</div>
            ) : (
                <div className="home-card-price">{props.price}</div>
            )}
        </Card>
    );
};

export default CProductCard;
