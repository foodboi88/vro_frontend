
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import { useNavigate } from "react-router-dom";
import "./styles.stylecard.scss";
import Utils from "../../common/utils";
import ImageNotFound from "../../images/Image_not_available.png";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { dispatch } from "rxjs/internal/observable/pairs";
import { advancedSearchingRequest } from "../../redux/controller";
interface props {
    imageUrl?: string;
    name: string;
    id: string
}

interface DATA_TRANFER {
    target: string;
    value: string;
}


const CStyleCard = (props: props) => {
    const { cloneToolList } = useSelectorRoot(
        (state) => state.sketch
    ); // Lst cac ban ve
    const navigate = useNavigate();
    const dispatch = useDispatchRoot();

    const handleClick = () => {
        console.log(props.id);
        const bodyrequest = {
            style: props.id
        };

        dispatch(advancedSearchingRequest(bodyrequest));
        navigate('/searching')
    };
    
    return (
        <div
            style={{backgroundImage: props.imageUrl}}
            onClick={() => {handleClick()}}
            
        >   
            <div>{props.name}</div>
        </div>
    );
};

export default CStyleCard;
