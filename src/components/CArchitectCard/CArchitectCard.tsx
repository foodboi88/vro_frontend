
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import { useNavigate } from "react-router-dom";
import "./styles.architectcard.scss";
import Utils from "../../common/utils";
import ImageNotFound from "../../images/Image_not_available.png";
import { useSelectorRoot } from "../../redux/store";
interface props {
    imageUrl?: string;
    name: string;
    email: string;
}

const CArchitectCard = (props: props) => {
    const { cloneToolList } = useSelectorRoot(
        (state) => state.sketch
    ); // Lst cac ban ve
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
                                <div className="h-c-t-title">

                                    {props.name}
                                </div>
                            <div className="h-c-t-view-point">
                                {/* <EyeOutlined />
                                <div className="number-of-view">
                                    {Math.round(props.view)}
                                </div> */}
                            </div>
                        </div>
                    }
                />
            </div>
            <div className="home-card-price">{Utils.formatMoney(props.email)}</div>
        </Card>
    );
};

export default CArchitectCard;
