import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useNavigate } from "react-router-dom";
import ImageNotFound from "../../images/Image_not_available.png";
import { useSelectorRoot } from "../../redux/store";
import "./styles.productcard.scss";
interface props {
    imageUrl?: string;
    title: string;
    view: number;
    price: number;
    type?: string;
    // idTool?: string;
}

const CProductCard = (props: props) => {
    const { cloneToolList } = useSelectorRoot(
        (state) => state.sketch
    ); // Lst cac ban ve
    const navigate = useNavigate();

    // const findTool = () => {
    //     let toolName = '';
    //     cloneToolList.forEach(item => {
    //         if (props.idTool === item.id) {
    //             toolName = item.name
    //         }
    //     })
    //     return toolName
    // }

    // const [toolName, setToolName] = useState(findTool)

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
                            <div >
                                {/* <div className="h-c-t-file-type">
                                    {toolName}
                                </div> */}
                                <div className="h-c-t-title">

                                    {props.title}
                                </div>
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
            <div className="home-card-description">{props.type}</div>
            {/* {  
                props.price === 0 ? <div className="home-card-price free">Miễn Phí</div> : 
                props.price === -1 ? <></> :
                <div className="home-card-price">{Utils.formatMoney(props.price) + ' VND'}</div>
            } */}
        </Card>
    );
};

export default CProductCard;
