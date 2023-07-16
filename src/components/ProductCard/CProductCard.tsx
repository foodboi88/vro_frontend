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
import Utils from "../../common/utils";
import ImageNotFound from "../../images/Image_not_available.png";
interface props {
    imageUrl?: string;
    title: string;
    view: number;
    price: number;
    type?: string;
}

const CProductCard = (props: props) => {
    const navigate = useNavigate();

    return (
        <Card
            className="card"
            hoverable
            cover={<img className="image-card" alt="example" src={props.imageUrl ? props.imageUrl : ImageNotFound} />}
        >
            <div className="title-and-price">
                <Meta
                    title={
                        <div className="home-card-title">
                            <div className="h-c-t-title">{props.title}</div>
                            <div className="h-c-t-view-point">
                                <EyeOutlined />
                                <div className="number-of-view">
                                    {Math.round(props.view)}
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
                <div className="home-card-price">{Utils.formatMoney(props.price)}</div>
            )}
        </Card>
    );
};

export default CProductCard;
